/**
 * ==========================================================
 * CORTXAI
 * Agent Registry
 * ==========================================================
 */

class AgentRegistry {
  constructor() {
    this.agents = new Map();
  }

  register(name, agent) {
    this.agents.set(name.toLowerCase(), agent);
  }

  get(name) {
    return this.agents.get(name.toLowerCase());
  }

  has(name) {
    return this.agents.has(name.toLowerCase());
  }

  remove(name) {
    this.agents.delete(name.toLowerCase());
  }

  getAll() {
    return [...this.agents.keys()];
  }
}

module.exports = new AgentRegistry();