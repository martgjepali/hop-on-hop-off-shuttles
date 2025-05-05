/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "https://kmgshuttles.al",
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: "*", allow: "/" },
      ],
    },
    exclude: ["/admin", "/dashboard"],
  };
  