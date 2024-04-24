// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      title: "stream sample",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        {
          hid: "description",
          name: "description",
          content: "Test technique upfluence",
        },
      ],
    },
  },
  modules: ["dayjs-nuxt", "@vueuse/nuxt"],
  dayjs: {
    locales: ["en"],
    defaultLocale: "en",
    defaultTimezone: "Europe/Paris",
    plugins: ["timezone", "isoWeek"],
  },
  vite: {
    optimizeDeps: {
      include: ["mermaid"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/assets/styles/variables.scss";
          @import "@/assets/styles/design-system.scss";
          `,
        },
      },
    },
  },
});
