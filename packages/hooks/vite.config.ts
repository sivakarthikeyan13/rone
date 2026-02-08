import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import dts from "vite-plugin-dts";
import { peerDependencies, types, name } from "./package.json";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies), "react/jsx-runtime"],
      output: [
        {
          dir: resolve(__dirname, "dist/esm"),
          format: "es",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].mjs",
          exports: "named"
        },
        {
          dir: resolve(__dirname, "dist/cjs"),
          format: "cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].cjs",
          exports: "named"
        }
      ]
    },
    sourcemap: true
  },
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.build.json",
      outDir: `${dirname(types)}`,
      insertTypesEntry: true
    })
  ]
});
