/**
 * ==========================================================
 * CORTXAI
 * Agent Factory
 * ==========================================================
 */

const AgentRegistry = require("./AgentRegistry");

class AgentFactory {
  static get(agentName) {
    const agent = AgentRegistry.get(agentName);

    if (!agent) {
      throw new Error(`Agent '${agentName}' is not registered.`);
    }

    return agent;
  }

  static execute(agentName, payload = {}) {
    const agent = this.get(agentName);

    return agent.execute(payload);
  }
}

module.exports = AgentFactory;