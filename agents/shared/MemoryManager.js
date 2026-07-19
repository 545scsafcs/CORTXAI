/**
 * ==========================================================
 * CORTXAI
 * Memory Manager
 * ==========================================================
 */

class MemoryManager {
  constructor() {
    this.memory = new Map();
  }

  set(key, value) {
    this.memory.set(key, value);
  }

  get(key) {
    return this.memory.get(key);
  }

  has(key) {
    return this.memory.has(key);
  }

  delete(key) {
    this.memory.delete(key);
  }

  clear() {
    this.memory.clear();
  }

  getAll() {
    return Object.fromEntries(this.memory);
  }
}

module.exports = new MemoryManager();