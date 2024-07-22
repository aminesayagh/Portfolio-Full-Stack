import { NextApiRequest, NextApiResponse } from "next";

const HandlerRobots = (_: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *
        Disallow: /api/
        Allow: /
        Sitemap: https://masayagh.com/sitemap.xml
    `);
  res.end();
};

export default HandlerRobots;
