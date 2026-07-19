/**
 * ==========================================================
 * CORTXAI
 * Tool Factory
 * ==========================================================
 */

const ToolRegistry = require("./ToolRegistry");

class ToolFactory {

    static get(toolName){

        const tool = ToolRegistry.get(toolName);

        if(!tool){
            throw new Error(`Tool '${toolName}' not found.`);
        }

        return tool;

    }

    static async execute(toolName,payload={}){

        const tool = this.get(toolName);

        return await tool.execute(payload);

    }

}

module.exports = ToolFactory;