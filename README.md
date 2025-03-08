# llm-using-browser
Does a large language model really need a browser to read web content?

The [MCP servers](https://github.com/modelcontextprotocol/servers) for the [CDP](https://chromedevtools.github.io/devtools-protocol/) already exists, like: [Puppeteer](https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer), [Playwright](https://github.com/executeautomation/mcp-playwright). So i only implement page control and display.

# Server

1. /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --headless
2. pnpm install
3. copy url in step 2 to screenshot_service.js
4. node screenshot_service.js
5. node server.js

# Client
1. cd vite-project
2. pnpm install
3. pnpm run dev

# Video
https://github.com/user-attachments/assets/da6c49a0-33af-4d5a-9208-be27829b4308

