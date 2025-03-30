import ImageWithCaption from "~/components/content/ImageWithCaption.vue";

export default defineNuxtPlugin((nuxtApp) => {
  if (!nuxtApp.vueApp._context.components["ImageWithCaption"]) {
    nuxtApp.vueApp.component("ImageWithCaption", ImageWithCaption);
  }
});
