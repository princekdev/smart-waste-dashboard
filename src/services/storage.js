/**
 * Thin wrapper around window.localStorage.
 *
 * Centralizing storage access here means the rest of the app never calls
 * localStorage directly — if persistence ever needs to move to a real
 * backend (e.g. swap to API calls), only this file changes.
 */

const PREFIX = "cleangrid:";

function isStorageAvailable() {
  try {
    const testKey = `${PREFIX}__test__`;
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

const available = isStorageAvailable();
const memoryFallback = new Map();

export const storage = {
  get(key, fallback = null) {
    const fullKey = `${PREFIX}${key}`;
    if (!available) {
      return memoryFallback.has(fullKey) ? memoryFallback.get(fullKey) : fallback;
    }
    try {
      const raw = window.localStorage.getItem(fullKey);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    const fullKey = `${PREFIX}${key}`;
    if (!available) {
      memoryFallback.set(fullKey, value);
      return;
    }
    try {
      window.localStorage.setItem(fullKey, JSON.stringify(value));
    } catch {
      memoryFallback.set(fullKey, value);
    }
  },

  remove(key) {
    const fullKey = `${PREFIX}${key}`;
    if (available) {
      try {
        window.localStorage.removeItem(fullKey);
      } catch {
        /* noop */
      }
    }
    memoryFallback.delete(fullKey);
  },
};
