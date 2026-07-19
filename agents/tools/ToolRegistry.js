/**
 * ==========================================================
 * CORTXAI
 * Tool Registry
 * ==========================================================
 */

class ToolRegistry {

    constructor() {
        this.tools = new Map();
    }

    register(name, tool) {
        this.tools.set(name.toLowerCase(), tool);
    }

    get(name) {
        return this.tools.get(name.toLowerCase());
    }

    has(name) {
        return this.tools.has(name.toLowerCase());
    }

    getAll() {
        return [...this.tools.keys()];
    }

}

module.exports = new ToolRegistry();