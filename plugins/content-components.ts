import ImageWithCaption from "~/components/content/ImageWithCaption.vue";
import GithubProject from "~/components/content/GithubProject.vue";


export default defineNuxtPlugin((nuxtApp) => {
  if (!nuxtApp.vueApp._context.components["ImageWithCaption"]) {
    nuxtApp.vueApp.component("ImageWithCaption", ImageWithCaption);
  }

if (!nuxtApp.vueApp._context.components["GithubProject"]) {
    nuxtApp.vueApp.component("GithubProject", GithubProject);
}
});
