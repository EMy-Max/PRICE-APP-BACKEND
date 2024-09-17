/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {hostname: "res.cloudinary.com", protocol: "https"}
    ]
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
        ]
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ['jsonwebtoken'],
  },
};

export default nextConfig;





// /** @type {import('next').NextConfig} */
// const nextConfig ={
//   images: {
//     remotePatterns: [
//       {hostname:"res.cloudinary.com",protocol:"https"}
//     ]
 
//   },
//     async headers() {
//       return [
//         {
//           source: "/api/:path*",
//           headers: [
//             { key: "Access-Control-Allow-Credentials", value: "true" },
//             { key: "Access-Control-Allow-Origin", value: "*" },
//             { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
//             { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization" },
//           ]
//         }
//       ]
//     }
//   };

// export default nextConfig



// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


// // /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   async headers() {
//     return [
//       {
//         source: '/api/:path*',
//         headers: [
//           { key: 'Access-Control-Allow-Credentials', value: 'true' },
//           { key: 'Access-Control-Allow-Origin', value: '*' },
//           { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
//           { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
//         ],
//       },
//     ];
//   },
//   async middleware(req) {
//     if (req.nextUrl.pathname.startsWith('/api/')) {
//       return {
//         headers: {
//           'Access-Control-Allow-Credentials': 'true',
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
//           'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
//         },
//       };
//     }
//   },
// };

// module.exports = nextConfig;