/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "utfs.io" },
      { protocol: "https", hostname: "oaidalleapiprodscus.blob.core.windows.net" },
    ]
  },
  serverExternalPackages: ["@uploadthing/react", "uploadthing"],
}

module.exports = nextConfig
