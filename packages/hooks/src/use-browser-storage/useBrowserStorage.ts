import { useCallback, useEffect, useState, useMemo } from "react";

type StorageType = "localStorage" | "sessionStorage";

type BrowserStorageOptions<T> = {
  type?: StorageType | StorageType[];
  key: string;
  defaultValue?: T;
  /** Determines whether the value must be synced between browser tabs, `true` by default */
  sync?: boolean;
  /** Function to serialize the value before storing it */
  serialize?: (value: T) => string;
  /** Function to deserialize the value when retrieving it */
  deserialize?: (value: string | undefined) => T;
};

function serializeJSON<T>(value: T): string {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw new Error("useBrowserStorage: Failed to serialize the value.");
  }
}

function deserializeJSON(value: string | undefined) {
  try {
    return value && JSON.parse(value);
  } catch (error) {
    return value;
  }
}

function createStorageHandler(type: StorageType) {
  const getItem = (key: string): string | null => {
    try {
      return window[type].getItem(key);
    } catch {
      console.warn(`useBrowserStorage: Failed to access ${type}. Returning null.`);
      return null;
    }
  };

  const setItem = (key: string, value: string) => {
    try {
      window[type].setItem(key, value);
    } catch {
      console.warn(`useBrowserStorage: Failed to access ${type}. Unable to set item.`);
    }
  };
  const removeItem = (key: string) => {
    try {
      window[type].removeItem(key);
    } catch {
      console.warn(`useBrowserStorage: Failed to access ${type}. Unable to remove item.`);
    }
  };
  return { getItem, setItem, removeItem };
}

type StorageHandler = ReturnType<typeof createStorageHandler>;

function readValuesFromStorage<T>(
  key: string,
  handlers: StorageHandler[],
  defaultValue: T | undefined,
  deserialize: (value: string | undefined) => T
): T {
  for (const handler of handlers) {
    const storedValue = handler.getItem(key);
    if (storedValue !== null) {
      return deserialize(storedValue);
    }
  }
  return defaultValue as T;
}

function useBrowserStorage<T>({
  type = "localStorage",
  key,
  defaultValue,
  sync = true,
  deserialize = deserializeJSON,
  serialize = serializeJSON
}: BrowserStorageOptions<T>) {
  const types = Array.isArray(type) ? type : [type];

  const handlers = useMemo(() => types.map(createStorageHandler), [types]);

  const getStorageValue = useCallback(
    (): T => readValuesFromStorage(key, handlers, defaultValue, deserialize),
    [key, handlers, defaultValue, deserialize]
  );

  const [value, setValue] = useState<T | undefined>(() => getStorageValue());

  const setStorageValue = useCallback(
    (val: T | ((prevState?: T) => T)) => {
      if (val instanceof Function) {
        setValue((current) => {
          const result = val(current);
          handlers.forEach((handler) => handler.setItem(key, serialize(result)));
          return result;
        });
      } else {
        handlers.forEach((handler) => handler.setItem(key, serialize(val)));
        setValue(val);
      }
    },
    [key, handlers, serialize]
  );

  const removeStorageValue = useCallback(() => {
    handlers.forEach((handler) => handler.removeItem(key));
    setValue(undefined);
  }, [key, handlers]);

  useEffect(() => {
    if (!sync) return;

    const handleStorageChange = (event: StorageEvent) => {
      if (
        types.includes(
          event.storageArea === window.localStorage ? "localStorage" : "sessionStorage"
        ) &&
        event.key === key
      ) {
        setValue(deserialize(event.newValue ?? undefined));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, types, deserialize, sync]);

  useEffect(() => {
    if (defaultValue !== undefined && value === undefined) {
      setStorageValue(defaultValue);
    }
  }, [defaultValue, value, setStorageValue]);

  return [value, setStorageValue, removeStorageValue] as [
    T,
    (val: T | ((prevState?: T) => T)) => void,
    () => void
  ];
}

function readBrowserStorageValue<T>({
  type = "localStorage",
  key,
  defaultValue,
  deserialize = deserializeJSON
}: Omit<BrowserStorageOptions<T>, "sync" | "serialize">): T {
  const types = Array.isArray(type) ? type : [type];
  const handlers = types.map(createStorageHandler);
  return readValuesFromStorage(key, handlers, defaultValue, deserialize);
}

export { useBrowserStorage, readBrowserStorageValue };
