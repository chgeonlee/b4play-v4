/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "wallpaperaccess.com",
      "s3.ap-northeast-2.amazonaws.com",
      "media.b4play.io",
      "images-4.gog-statics.com",
      "d2x8kymwjom7h7.cloudfront.net",
      "i.ytimg.com",
      "cdn.gametoc.co.kr",
      "static.news.zumst.com",
      "image.ajunews.com",
      "t4.ftcdn.net",
      "t3.ftcdn.net",
      "mblogthumb-phinf.pstatic.net",
      "d3q33rbmdkxzj.cloudfront.net",      
      "i.pinimg.com",
      "images.wallpapersden.com",
      "encrypted-tbn0.gstatic.com",      
    ],
  },
  compiler: {
    styledComponents: true,
  },
  swcMinify: true
  
};

module.exports = nextConfig;
