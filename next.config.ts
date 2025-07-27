import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  redirects: async () => [
    {
      source: "/linkedin",
      destination: "https://www.linkedin.com/in/wpurnomo",
      permanent: false,
    },
    {
      source: "/github",
      destination: "https://github.com/winstonpurnomo",
      permanent: false,
    },
  ],
};

export default withBotId(nextConfig);
