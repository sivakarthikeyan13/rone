/**
 * Documentation generator for @ronekit/hooks.
 *
 * Usage:
 *   npm run docs             — regenerate all docs in place
 *   npm run docs -- --check  — verify docs are up-to-date; exits non-zero if stale
 */

import {
  Project,
  FunctionDeclaration,
  VariableStatement,
  InterfaceDeclaration,
  SourceFile,
  Node
} from "ts-morph";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname, relative } from "path";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const CHECK = process.argv.includes("--check");
const ROOT = resolve(import.meta.dirname, "..");
const PKG_HOOKS = resolve(ROOT, "packages/hooks");
const HOOKS_SRC = resolve(PKG_HOOKS, "src");
const ROOT_README = resolve(ROOT, "README.md");
const PKG_README = resolve(PKG_HOOKS, "README.md");

const CATEGORY_ORDER = ["State", "UI / DOM", "Browser API", "Lifecycle", "Sensors"];

// Markers
const API_START = "<!-- API:START -->";
const API_END = "<!-- API:END -->";
const HOOKS_START = "<!-- HOOKS:START -->";
const HOOKS_END = "<!-- HOOKS:END -->";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function inject(content: string, start: string, end: string, block: string): string {
  const si = content.indexOf(start);
  const ei = content.indexOf(end);
  if (si === -1 || ei === -1 || si >= ei) return content;
  return content.slice(0, si + start.length) + "\n" + block + "\n" + content.slice(ei);
}

function parseFrontmatter(content: string): Record<string, string> {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim();
    if (key) data[key] = val;
  }
  return data;
}

function getJsDocSummary(node: Node): string {
  const jsDocs = (node as FunctionDeclaration).getJsDocs?.() ?? [];
  if (!jsDocs.length) return "";
  const desc = jsDocs[0].getDescription().trim();
  // Take first line / sentence only
  return desc.split("\n")[0].trim();
}

function escapeMarkdownPipe(s: string): string {
  return s.replace(/\|/g, "\\|");
}

// ---------------------------------------------------------------------------
// Type rendering helpers
// ---------------------------------------------------------------------------

function renderInterfaceTable(iface: InterfaceDeclaration): string {
  const props = iface.getProperties();
  if (!props.length) return "";

  const rows = props.map((p) => {
    // Property JSDoc description
    const docs = p.getJsDocs();
    const desc = docs.length ? docs[0].getDescription().trim().split("\n")[0] : "—";
    const name = `\`${p.getName()}\`${p.hasQuestionToken() ? "?" : ""}`;
    const type = escapeMarkdownPipe(p.getTypeNode()?.getText() ?? p.getType().getText());
    return `| ${name} | \`${type}\` | ${escapeMarkdownPipe(desc)} |`;
  });

  return [
    `**\`${iface.getName()}\`**\n`,
    "| Property | Type | Description |",
    "|----------|------|-------------|",
    ...rows
  ].join("\n");
}

/**
 * Find exported interface / type alias in a source file by name.
 * Returns a rendered markdown table string, or null if not found / not renderable.
 */
function renderExportedType(name: string, sourceFile: SourceFile): string | null {
  // Strip generics from name for lookup
  const baseName = name.replace(/<.*>/, "").trim();

  const iface = sourceFile.getInterface(baseName);
  if (iface && iface.isExported()) {
    return renderInterfaceTable(iface);
  }

  const alias = sourceFile.getTypeAlias(baseName);
  if (alias && alias.isExported()) {
    const typeText = alias.getTypeNode()?.getText() ?? "";
    if (typeText.startsWith("[")) {
      return `**\`${alias.getName()}\`** — \`${escapeMarkdownPipe(typeText)}\``;
    }
    return null;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Signature extraction
// ---------------------------------------------------------------------------

interface HookSignature {
  functionText: string; // "function useFoo<T>(param: Type): ReturnType"
  params: Array<{ name: string; type: string; optional: boolean }>;
  returnTypeText: string;
  /** type names referenced by params or return (exported from the file) */
  referencedTypeNames: string[];
}

function extractFunctionSignature(decl: FunctionDeclaration): HookSignature {
  const name = decl.getName() ?? "unknown";
  const typeParams = decl.getTypeParameters();
  const typeParamStr = typeParams.length
    ? `<${typeParams.map((tp) => tp.getText()).join(", ")}>`
    : "";

  const params = decl.getParameters().map((p) => ({
    name: p.getName(),
    type: p.getTypeNode()?.getText() ?? p.getType().getText(),
    optional: p.isOptional()
  }));

  const returnTypeText = decl.getReturnTypeNode()?.getText() ?? decl.getReturnType().getText();

  // Build a clean one-line signature
  const paramStr = params.map((p) => `${p.name}${p.optional ? "?" : ""}: ${p.type}`).join(", ");
  const functionText = `function ${name}${typeParamStr}(${paramStr}): ${returnTypeText}`;

  // Collect type names that are referenced (for expanding their tables)
  const referencedTypeNames: string[] = [];
  for (const p of params) {
    const base = p.type
      .replace(/[?[\]|&<>]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    referencedTypeNames.push(...base);
  }
  const retBase = returnTypeText
    .replace(/[?[\]|&<>]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  referencedTypeNames.push(...retBase);

  return {
    functionText,
    params,
    returnTypeText,
    referencedTypeNames: [...new Set(referencedTypeNames)]
  };
}

function extractVariableSignature(stmt: VariableStatement): HookSignature {
  const decl = stmt.getDeclarations()[0];
  const name = decl?.getName() ?? "unknown";
  const type = decl?.getTypeNode()?.getText() ?? decl?.getType().getText() ?? "unknown";
  return {
    functionText: `const ${name}: ${type}`,
    params: [],
    returnTypeText: type,
    referencedTypeNames: []
  };
}

// ---------------------------------------------------------------------------
// API block renderer
// ---------------------------------------------------------------------------

function renderApiBlock(sig: HookSignature, sourceFile: SourceFile): string {
  const lines: string[] = [];

  lines.push("## API\n");
  lines.push("```ts");
  lines.push(sig.functionText);
  lines.push("```");

  // Parameters table
  if (sig.params.length > 0) {
    lines.push("\n### Parameters\n");
    lines.push("| Name | Type | Required |");
    lines.push("|------|------|----------|");
    for (const p of sig.params) {
      lines.push(
        `| \`${p.name}\` | \`${escapeMarkdownPipe(p.type)}\` | ${p.optional ? "No" : "Yes"} |`
      );
    }
  }

  // Return type
  lines.push(`\n### Returns\n`);
  lines.push(`\`${escapeMarkdownPipe(sig.returnTypeText)}\``);

  // Expand referenced types that are exported from the same file
  const expandedTypes = new Set<string>();
  for (const typeName of sig.referencedTypeNames) {
    if (expandedTypes.has(typeName)) continue;
    // Skip primitive / built-in names
    if (
      /^(string|number|boolean|void|null|undefined|unknown|any|never|object|T|K|V|HTMLElement|Element|Node|Event|FileList|File|DocumentVisibilityState|OrientationType|ResizeObserverOptions|AddEventListenerOptions|DOMRectReadOnly)$/.test(
        typeName
      )
    )
      continue;
    const rendered = renderExportedType(typeName, sourceFile);
    if (rendered) {
      lines.push(`\n${rendered}`);
      expandedTypes.add(typeName);
    }
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Hook info collector
// ---------------------------------------------------------------------------

interface HookInfo {
  name: string;
  summary: string;
  category: string;
  docPath: string; // absolute path to the hook's .md file
  docRelFromRoot: string; // relative to repo ROOT — for root README links
  docRelFromPkg: string; // relative to PKG_HOOKS  — for package README links
  apiBlock: string;
  warnings: string[];
}

function collectHookInfo(project: Project): HookInfo[] {
  const indexPath = resolve(HOOKS_SRC, "index.ts");
  const indexFile = project.getSourceFileOrThrow(indexPath);

  const infos: HookInfo[] = [];

  for (const exportDecl of indexFile.getExportDeclarations()) {
    const sourceFile = exportDecl.getModuleSpecifierSourceFile();
    if (!sourceFile) continue;

    for (const named of exportDecl.getNamedExports()) {
      const name = named.getName();
      if (!name.startsWith("use")) continue;

      const warnings: string[] = [];

      // Resolve the hook's declaration in its source file
      let sig: HookSignature | null = null;
      let summary = "";

      // Try function declaration first
      const funcDecl = sourceFile.getFunction(name);
      if (funcDecl) {
        summary = getJsDocSummary(funcDecl);
        sig = extractFunctionSignature(funcDecl);
      } else {
        // Try variable (e.g. useIsomorphicEffect)
        const varDecl = sourceFile.getVariableDeclaration(name);
        if (varDecl) {
          const stmt = varDecl.getVariableStatement();
          if (stmt) {
            summary = getJsDocSummary(stmt);
            sig = extractVariableSignature(stmt);
          }
        }
      }

      if (!summary) {
        warnings.push(`⚠ ${name}: missing JSDoc summary`);
      }

      if (!sig) {
        warnings.push(`⚠ ${name}: could not extract signature`);
        sig = {
          functionText: `// ${name}`,
          params: [],
          returnTypeText: "unknown",
          referencedTypeNames: []
        };
      }

      // Find the .md file (colocated with the source file)
      const srcDir = dirname(sourceFile.getFilePath());
      const docPath = resolve(srcDir, `${name}.md`);

      if (!existsSync(docPath)) {
        warnings.push(`⚠ ${name}: missing doc file ${docPath}`);
      }

      // Parse frontmatter to get category
      let category = "Utilities";
      if (existsSync(docPath)) {
        const fm = parseFrontmatter(readFileSync(docPath, "utf8"));
        category = fm.category ?? "Utilities";
      }

      const apiBlock = renderApiBlock(sig, sourceFile);
      const docRelFromRoot = existsSync(docPath) ? relative(ROOT, docPath).replace(/\\/g, "/") : "";
      const docRelFromPkg = existsSync(docPath)
        ? relative(PKG_HOOKS, docPath).replace(/\\/g, "/")
        : "";

      infos.push({
        name,
        summary,
        category,
        docPath,
        docRelFromRoot,
        docRelFromPkg,
        apiBlock,
        warnings
      });
    }
  }

  return infos;
}

// ---------------------------------------------------------------------------
// File writers (check-mode aware)
// ---------------------------------------------------------------------------

let driftDetected = false;

function writeOrCheck(filePath: string, newContent: string, label: string): void {
  const existing = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
  if (existing === newContent) return;

  if (CHECK) {
    console.error(`\n✗ Stale: ${label}`);
    console.error("  Run `npm run docs` to regenerate.\n");
    driftDetected = true;
  } else {
    writeFileSync(filePath, newContent, "utf8");
    console.log(`✓ Updated: ${label}`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log(CHECK ? "Checking documentation…" : "Generating documentation…\n");

// Set up ts-morph project
const project = new Project({
  tsConfigFilePath: resolve(PKG_HOOKS, "tsconfig.json"),
  skipAddingFilesFromTsConfig: false
});

const hookInfos = collectHookInfo(project);

// Print warnings
for (const info of hookInfos) {
  for (const w of info.warnings) {
    console.warn(w);
  }
}

// --- 1. Inject API blocks into each hook's .md ---
for (const info of hookInfos) {
  if (!existsSync(info.docPath)) continue;

  const original = readFileSync(info.docPath, "utf8");
  const updated = inject(original, API_START, API_END, info.apiBlock);
  writeOrCheck(info.docPath, updated, `${info.name}.md`);
}

// --- 2. Build categorized index ---
const byCategory: Record<string, HookInfo[]> = {};
for (const info of hookInfos) {
  if (!byCategory[info.category]) byCategory[info.category] = [];
  byCategory[info.category].push(info);
}

type LinkField = "docRelFromRoot" | "docRelFromPkg";

function buildIndex(linkField: LinkField): string {
  const lines: string[] = [];

  const renderCategory = (cat: string, hooks: HookInfo[]) => {
    lines.push(`### ${cat}\n`);
    lines.push("| Hook | Description |");
    lines.push("|------|-------------|");
    for (const h of hooks.sort((a, b) => a.name.localeCompare(b.name))) {
      const href = h[linkField];
      const link = href ? `[${h.name}](${href})` : h.name;
      lines.push(`| ${link} | ${escapeMarkdownPipe(h.summary || "—")} |`);
    }
    lines.push("");
  };

  for (const cat of CATEGORY_ORDER) {
    const hooks = byCategory[cat];
    if (!hooks?.length) continue;
    renderCategory(cat, hooks);
  }
  // Anything not in a known category
  for (const [cat, hooks] of Object.entries(byCategory)) {
    if (CATEGORY_ORDER.includes(cat)) continue;
    renderCategory(cat, hooks);
  }
  return lines.join("\n");
}

// Root README: links relative to repo root
const rootIndex = buildIndex("docRelFromRoot");
if (existsSync(ROOT_README)) {
  const rootReadme = readFileSync(ROOT_README, "utf8");
  writeOrCheck(ROOT_README, inject(rootReadme, HOOKS_START, HOOKS_END, rootIndex), "README.md");
}

// Package README: links relative to packages/hooks/
const pkgIndex = buildIndex("docRelFromPkg");
if (existsSync(PKG_README)) {
  const pkgReadme = readFileSync(PKG_README, "utf8");
  writeOrCheck(
    PKG_README,
    inject(pkgReadme, HOOKS_START, HOOKS_END, pkgIndex),
    "packages/hooks/README.md"
  );
}

// --- 3. Exit ---
if (CHECK && driftDetected) {
  process.exit(1);
} else if (!CHECK) {
  console.log(`\nDone — ${hookInfos.length} hooks processed.`);
}
