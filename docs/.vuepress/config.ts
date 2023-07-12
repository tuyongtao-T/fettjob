/*
 * @Author: tuyongtao1
 * @Date: 2023-07-06 14:44:24
 * @LastEditors: tuyongtao1
 * @LastEditTime: 2023-07-10 16:39:12
 * @Description:
 */

import { defineConfig } from "vuepress/config"

export default defineConfig({
  base: "/fettjob/",
  dest: "dist",
  title: "fettjob前端",
  description: "前端,vue,javascript,",
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "guide", link: "/guide/" },
      {
        text: "三剑客",
        items: [
          {
            text: "javaScript",
            items: [
              { text: "JS高程", link: "/base/js/高级程序设计/" },
              { text: "阮一峰JS", link: "/base/js/阮一峰JS/" },
              { text: "阮一峰ES", link: "/base/js/阮一峰ES/" },
            ],
          },
          {
            text: "html",
            items: [
              { text: "菜鸟HTML", link: "/base/html/菜鸟HTML/" },
              { text: "阮一峰HTML", link: "/base/html/阮一峰HTML/" },
            ],
          },
          { text: "css", link: "/base/css/" },
        ],
      },
      {
        text: "前端工程化",
        items: [
          { text: "gulp", link: "/cli/gulp/" },
          { text: "代码格式化", link: "/cli/代码格式化/" },
        ],
      },
      { text: "google", link: "https://google.com" },
    ],
    // 侧边栏
    sidebar: "auto",
    lastUpdated: "Last Updated",
    smoothScroll: true,
    sidebarDepth: 2,
  },
  markdown: {
    lineNumbers: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": "path/to/some/dir",
      },
    },
  },
})
