<template>
  <div class="grid lg:grid-cols-2 gap-7">
    <article class="work-feature group">
      <NuxtLink
        to="/products/vectorxr"
        class="block bg-slate-100 dark:bg-slate-800 p-5 sm:p-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
        aria-label="Explore VectorXR"
      >
        <NuxtImg
          src="/images/vectorxr/screenshots/depth.webp"
          alt="VectorXR depth settings with stereo depth and convergence controls"
          width="1000"
          height="770"
          sizes="sm:90vw lg:45vw"
          class="w-full aspect-[1.6] object-cover object-top rounded-md shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </NuxtLink>
      <div class="pt-5">
        <p class="eyebrow mb-2">01 / Open source product · Beta</p>
        <h3 class="text-2xl font-bold tracking-tight">
          <NuxtLink to="/products/vectorxr">VectorXR</NuxtLink>
        </h3>
        <p
          class="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
        >
          Your VR experience, tuned per game. A Windows app for depth, head
          rotation, rendering, and OpenXR layer management.
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-3">
          Published by DienerTech LLC · Windows / OpenXR
        </p>
        <NuxtLink
          to="/products/vectorxr"
          class="text-link inline-flex items-center gap-2 mt-4"
          >Explore VectorXR <UIcon name="i-heroicons-arrow-up-right"
        /></NuxtLink>
      </div>
    </article>
    <article class="work-feature group">
      <NuxtLink
        to="/work/sparknet"
        class="block bg-slate-950 p-5 sm:p-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
        aria-label="Explore SparkNet"
      >
        <div class="aspect-[1.6] flex flex-col justify-between text-white">
          <div
            class="flex items-center justify-between text-xs font-mono text-blue-200"
          >
            <span>SPARKNET / TRAINING LOG</span
            ><UIcon name="i-heroicons-bolt" class="w-5 h-5" />
          </div>
          <div>
            <p class="text-3xl sm:text-5xl font-semibold tracking-tight">
              Small models.<br /><span class="text-blue-300">Big lessons.</span>
            </p>
          </div>
          <p class="font-mono text-xs sm:text-sm text-slate-300">
            70M → 400M / Pretraining → SFT → Evaluation
          </p>
        </div>
      </NuxtLink>
      <div class="pt-5">
        <p class="eyebrow mb-2">02 / Independent AI experiments</p>
        <h3 class="text-2xl font-bold tracking-tight">
          <NuxtLink to="/work/sparknet">SparkNet</NuxtLink>
        </h3>
        <p
          class="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
        >
          Training language models to understand them. An ongoing exploration of
          datasets, fine-tuning, inference, and what evaluations actually
          measure.
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-3">
          Python / PyTorch · Built and documented in the home lab
        </p>
        <NuxtLink
          to="/work/sparknet"
          class="text-link inline-flex items-center gap-2 mt-4"
          >Follow the experiments <UIcon name="i-heroicons-arrow-up-right"
        /></NuxtLink>
      </div>
    </article>
  </div>
</template>
