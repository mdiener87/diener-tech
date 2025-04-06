import BlogImage from "~/components/content/BlogImage.vue";
import GithubProject from "~/components/content/GithubProject.vue";


export default defineNuxtPlugin((nuxtApp) => {
  if (!nuxtApp.vueApp._context.components["BlogImage"]) {
    nuxtApp.vueApp.component("BlogImage", BlogImage);
  }

if (!nuxtApp.vueApp._context.components["GithubProject"]) {
    nuxtApp.vueApp.component("GithubProject", GithubProject);
}
});
