// Persistent shared storage shim for local/dev environments
// In Claude.ai artifacts, window.storage is provided natively.
// Outside that environment (local dev, GitHub Pages), this localStorage shim is used.

const SHARED_PREFIX = 'shared:';

if (typeof window !== 'undefined' && !window.storage) {
  window.storage = {
    async get(key, shared = false) {
      const k = shared ? SHARED_PREFIX + key : key;
      const value = localStorage.getItem(k);
      if (value === null) throw new Error('Key not found: ' + k);
      return { key, value, shared };
    },
    async set(key, value, shared = false) {
      const k = shared ? SHARED_PREFIX + key : key;
      localStorage.setItem(k, value);
      return { key, value, shared };
    },
    async delete(key, shared = false) {
      const k = shared ? SHARED_PREFIX + key : key;
      localStorage.removeItem(k);
      return { key, deleted: true, shared };
    },
    async list(prefix = '', shared = false) {
      const fullPrefix = shared ? SHARED_PREFIX + prefix : prefix;
      const keys = Object.keys(localStorage)
        .filter(k => k.startsWith(fullPrefix))
        .map(k => shared ? k.replace(SHARED_PREFIX, '') : k);
      return { keys, prefix, shared };
    }
  };
}
