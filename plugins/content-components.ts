import type { Component } from "vue";

const contentComponents = import.meta.glob<{
  default: Component;
}>("~/components/content/*.vue", {
  eager: true,
});

export default defineNuxtPlugin((nuxtApp) => {
  Object.entries(contentComponents).forEach(([path, module]) => {
    const component = module?.default;
    if (!component) {
      return;
    }

    const componentName = path
      .split("/")
      .pop()
      ?.replace(/\.vue$/, "");

    if (!componentName) {
      return;
    }

    const kebabName = componentName
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();

    const names = new Set<string>([
      componentName,
      kebabName,
      componentName.toLowerCase(),
    ]);

    names.forEach((name) => {
      if (!nuxtApp.vueApp._context.components[name]) {
        nuxtApp.vueApp.component(name, component);
      }
    });
  });
});
