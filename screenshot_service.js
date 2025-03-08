// screenshot_service.js
import { chromium } from "playwright";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
	// 连接 Lightpanda CDP
	const browser = await chromium.connectOverCDP(
		"ws://127.0.0.1:9222/devtools/browser/39e5b325-dacb-426a-8eb6-136098bfa6a3",
	);
	const page = await browser.newPage();

	// 访问目标页面
  const url = "https://www.baidu.com/s?wd=%E5%BD%93%E5%89%8D%E6%97%B6%E9%97%B4";
  await page.goto(url);

  // 确保页面已经完全加载
  await page.waitForSelector("body");

  // 获取页面的总高度和视口高度
  const { scrollHeight, clientHeight } = await page.evaluate(() => ({
    scrollHeight: document.body.scrollHeight,
    clientHeight: window.innerHeight,
  }));

  let scrollPosition = 0;

  const takeScreenshot = async () => {
    const timestamp = new Date().toISOString().replace(/:/g, "-");
    const screenshotPath = join(
      __dirname,
      "vite-project/public/screenshots",
      `${timestamp}.png`,
    );

    // 截取当前视口
    await page.screenshot({
      path: screenshotPath,
      fullPage: false,
      type: "png",
    });

    console.log(`截图已保存：${screenshotPath}`);

    // 滚动一个视口高度
    scrollPosition += clientHeight;

    // 如果滚动到底部，则重置滚动位置
    if (scrollPosition >= scrollHeight) {
      scrollPosition = 0;
    }

    // 滚动到指定位置
    await page.evaluate((scrollPosition) => {
      window.scrollTo(0, scrollPosition);
    }, scrollPosition);

    // 等待滚动完成
    await page.waitForTimeout(2000);
  };

  // 每3秒截图一次
  setInterval(takeScreenshot, 3000);
})();
