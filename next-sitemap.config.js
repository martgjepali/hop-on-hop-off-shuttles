import fetch from 'node-fetch';

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://www.kmgshuttles.al",
  generateRobotsTxt: true,
  trailingSlash: false,
  outDir: "./public",
  exclude: ["/admin", "/dashboard"],

  additionalPaths: async () => {
    const res = await fetch("https://api.kmgshuttles.al/lines/");
    const data = await res.json();

    console.log("🔎 API RESPONSE from /lines:", data);

    if (!Array.isArray(data)) {
      throw new Error("Expected an array from /lines endpoint");
    }

    const dynamicPaths = data.map((line) => ({
      loc: `/lines/${line.LineID}`,
      lastmod: new Date().toISOString(),
    }));

    const staticPaths = [
      { loc: "/", lastmod: new Date().toISOString() },
      { loc: "/lines", lastmod: new Date().toISOString() },
      { loc: "/fleet", lastmod: new Date().toISOString() },
      { loc: "/contact", lastmod: new Date().toISOString() },
      { loc: "/reservation", lastmod: new Date().toISOString() },
    ];

    return [...staticPaths, ...dynamicPaths];
  },
};

export default config;
