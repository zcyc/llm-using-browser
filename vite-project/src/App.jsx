// ScreenshotViewer.jsx
import React, { useState, useEffect } from "react";

export default function ScreenshotViewer() {
	const [url, setUrl] = useState(null);

	// 定时获取最新截图
	useEffect(() => {
		const fetchLatestScreenshot = async () => {
			try {
				const response = await fetch(
					"http://127.0.0.1:3000/api/latest-screenshot",
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				if (!data.url) {
					throw new Error("Invalid data format");
				}
				setUrl(data.url);
			} catch (error) {
				console.error("Error fetching latest screenshot:", error);
			}
		};

		const interval = setInterval(fetchLatestScreenshot, 2000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="screenshot-container">
			<h1>AI 正在浏览网站：https://www.baidu.com/s?wd=当前时间</h1>
			{url && (
				<img
					key={url}
					src={url}
					alt="截图"
				/>
			)}
		</div>
	);
}
