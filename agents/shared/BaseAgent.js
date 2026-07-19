/**
 * ==========================================================
 * CORTXAI
 * Base Agent Class
 * Founder : Vineet Yadav
 * ==========================================================
 */

class BaseAgent {
  constructor(config = {}) {
    this.name = config.name || "Unknown Agent";
    this.description = config.description || "";
    this.tools = config.tools || {};
    this.memory = config.memory || null;
    this.prompt = config.prompt || "";
  }

  /**
   * Main entry point
   */
  async execute(request = {}) {
    try {
      await this.beforeExecute(request);

      const validated = await this.validate(request);

      const plan = await this.plan(validated);

      const result = await this.run(plan);

      await this.afterExecute(result);

      return {
        success: true,
        agent: this.name,
        data: result,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Validation
   */
  async validate(request) {
    return request;
  }

  /**
   * Planning
   */
  async plan(request) {
    return request;
  }

  /**
   * Agent Logic
   * Must be overridden
   */
  async run() {
    throw new Error(`${this.name}: run() not implemented.`);
  }

  /**
   * Before execution
   */
  async beforeExecute() {}

  /**
   * After execution
   */
  async afterExecute() {}

  /**
   * Execute Tool
   */
  async useTool(toolName, payload = {}) {
    const tool = this.tools[toolName];

    if (!tool) {
      throw new Error(`Tool '${toolName}' not found.`);
    }

    return await tool(payload);
  }

  /**
   * Memory Read
   */
  async remember(key) {
    if (!this.memory) return null;

    return this.memory.get(key);
  }

  /**
   * Memory Write
   */
  async memorize(key, value) {
    if (!this.memory) return;

    return this.memory.set(key, value);
  }

  /**
   * Error Handler
   */
  handleError(error) {
    console.error(`[${this.name}]`, error.message);

    return {
      success: false,
      agent: this.name,
      error: error.message,
    };
  }
}

export default BaseAgent;