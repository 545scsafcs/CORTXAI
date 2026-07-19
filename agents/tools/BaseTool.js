/**
 * ==========================================================
 * CORTXAI
 * Base Tool
 * Founder : Vineet Yadav
 * ==========================================================
 */

class BaseTool {
  constructor(config = {}) {
    this.name = config.name || "Unknown Tool";
    this.description = config.description || "";
  }

  async execute() {
    throw new Error(`${this.name}: execute() not implemented.`);
  }
}

module.exports = BaseTool;