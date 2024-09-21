/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'rerollcdn.com'
            },
            {
                hostname: 'static.zerochan.net'
            }
        ]
    }
};

export default nextConfig;
