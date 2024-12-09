<template>
  <div>
    <NuxtLayout :name="layout as LayoutKey || 'default'">
      <ContentRenderer v-if="page" :key="(page as any)._id" :value="page" class="text-black">
        <template #empty="{ value }">
          <DocumentDrivenEmpty :value="value" />
        </template>
      </ContentRenderer>
      <DocumentDrivenNotFound v-else />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import {
  useRuntimeConfig,
  useContent,
  useContentHead,
  useRequestEvent,
} from "#imports";
import type { LayoutKey } from "#build/types/layouts";

const { contentHead } = useRuntimeConfig().public.content;
const { page, layout } = useContent();

// Page not found, set correct status code on SSR
if (!(page as any).value && import.meta.server) {
  const event = useRequestEvent();
  if (event) {
    event.node.res.statusCode = 404;
  }
}

if (contentHead) {
  useContentHead(page);
}
</script>
