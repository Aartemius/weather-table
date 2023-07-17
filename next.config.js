/** @type {import('next').NextConfig} */
// const nextConfig = {
//   assetPrefix: process.env.NODE_ENV === 'production' ? '/weather-table' : '',
//   basePath: process.env.NODE_ENV === 'production' ? '/weather-table' : '',
//   trailingSlash: true,
//   async generateBuildId() {
//     return 'build';
//   },
//   async generateStaticParams() {
//     return [
//       {
//         route: '/posts/[slug]',
//         params: {
//           slug: 'example-slug',
//         },
//       },
//     ];
//   },
//   exportPathMap: async function () {
//     return {
//       '/': { page: '/' },
//     };
//   },
// }

module.exports = {
  // ...
  async generateBuildId() {
    // Add any custom logic if needed
    return 'build';
  },
  output: 'export',
};
