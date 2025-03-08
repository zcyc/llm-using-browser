# llm-using-browser
Does a large language model really need a browser to read web content?

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