class CacheService {
  constructor(ttl = 60000) {
    this.cache = new Map();
    this.ttl = ttl;
  }

  get(key) {
    const item = this.cache.get(key);

    if (item && item.expiry > Date.now()) {
      return item.value;
    }

    if (item) {
      this.cache.delete(key);
    }

    return null;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + this.ttl
    });
  }

  clear() {
    this.cache.clear();
  }
}

const cacheService = new CacheService();

export default cacheService;