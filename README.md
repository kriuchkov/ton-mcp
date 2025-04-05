# ton-mcp

This repository contains the Ton MCP (Model Context Protocol) Server. This MCP Server allows you to interact with your Ton wallet and perform various operations such as sending transactions, checking balances, and more.

# What is MCP (Model Context Protocol)? 
You can read more about the Model Context Protocol here: https://modelcontextprotocol.io

But in a nutshell
> The Model Context Protocol (MCP) is an open protocol that enables seamless integration between LLM applications and external data sources and tools. Whether you’re building an AI-powered IDE, enhancing a chat interface, or creating custom AI workflows, MCP provides a standardized way to connect LLMs with the context they need.


## Configuration

Add a server entry to your configuration file:

```

"mcpServers": { 
  "ton-mcp": { 
    "command": "bun", 
    "args": ["run",  "start"], 
    "env": { 
      "LOG_LEVEL": "3" 
    } 
  } 
}
```
