import { defineConfig } from 'vitepress'
import typedocSidebar from '../sdk/typedoc-sidebar.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Token Batch SDK",
  description: "SDK for sending ETH and ERC20 tokens in a single Batch transaction",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/sdk/' }
    ],

    sidebar: [
      {
        text: 'Docs',
        items: typedocSidebar
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aditya172926/token_batch_sdk' }
    ]
  }
})
