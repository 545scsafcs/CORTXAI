/**
 * ==========================================================
 * CORTXAI
 * Tool Executor
 * ==========================================================
 */

class ToolExecutor {
  constructor() {
    this.tools = new Map();
  }

  register(name, tool) {
    this.tools.set(name, tool);
  }

  has(name) {
    return this.tools.has(name);
  }

  async execute(name, payload = {}) {
    if (!this.tools.has(name)) {
      throw new Error(`Tool '${name}' not found.`);
    }

    return await this.tools.get(name)(payload);
  }

  getAll() {
    return [...this.tools.keys()];
  }
}

module.exports = new ToolExecutor();