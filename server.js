// server.js
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/screenshots', express.static(path.join(__dirname, 'vite-project/public/screenshots')));

app.get('/api/latest-screenshot', (_, res) => {
  // 获取最新截图文件逻辑
  const files = fs.readdirSync('./vite-project/public/screenshots')
    .filter(f => f.endsWith('.png'))
    .sort()
    .reverse();

  res.json({
    url: `/screenshots/${files[0]}`
  });
});

app.listen(3000);