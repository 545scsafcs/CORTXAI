/**
 * ==========================================================
 * CORTXAI
 * Prompt Manager
 * ==========================================================
 */

class PromptManager {
  constructor() {
    this.prompts = new Map();
  }

  register(agentName, prompt) {
    this.prompts.set(agentName.toLowerCase(), prompt);
  }

  get(agentName) {
    return this.prompts.get(agentName.toLowerCase());
  }

  has(agentName) {
    return this.prompts.has(agentName.toLowerCase());
  }

  getAll() {
    return [...this.prompts.keys()];
  }
}

module.exports = new PromptManager();