import BlogImage from "~/components/content/BlogImage.vue";
import GithubProject from "~/components/content/GithubProject.vue";
import BlogCollapsible from "~/components/content/BlogCollapsible.vue";
import Collapsible from "~/components/content/Collapsible.vue";

export default defineNuxtPlugin((nuxtApp) => {
  if (!nuxtApp.vueApp._context.components["BlogImage"]) {
    nuxtApp.vueApp.component("BlogImage", BlogImage);
  }

if (!nuxtApp.vueApp._context.components["GithubProject"]) {
    nuxtApp.vueApp.component("GithubProject", GithubProject);
}

if (!nuxtApp.vueApp._context.components["BlogCollapsible"]) {
  nuxtApp.vueApp.component("BlogCollapsible", BlogCollapsible);
}

if (!nuxtApp.vueApp._context.components["Collapsible"]) {
  nuxtApp.vueApp.component("Collapsible", Collapsible);
}
});
