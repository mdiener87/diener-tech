<template>
  <main>
    <section class="section-space bg-gray-50 dark:bg-gray-950/40">
      <UContainer
        ><NuxtLink to="/about" class="text-link text-sm"
          >← About Michael</NuxtLink
        >
        <p class="eyebrow mt-8 mb-4">Career / Engineering & leadership</p>
        <h1 class="editorial-title text-4xl sm:text-6xl">
          From building interfaces<br />to building AI systems.
        </h1>
        <p
          class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mt-6 leading-relaxed"
        >
          A decade of software, consulting, integrations, and cloud engineering.
          Now, a new team and a broader mandate at TaxCloud.
        </p></UContainer
      >
    </section>
    <section class="section-space">
      <UContainer class="grid lg:grid-cols-[1.2fr_.8fr] gap-10 lg:gap-20">
        <div>
          <p class="eyebrow mb-3">Current chapter / TaxCloud</p>
          <h2 class="editorial-title text-3xl sm:text-4xl">
            Senior AI Engineer
          </h2>
          <p
            class="text-gray-600 dark:text-gray-300 text-lg mt-5 leading-relaxed"
          >
            I’m starting a new team focused on tackling business problems with
            agentic AI. The mandate spans understanding the workflow, building
            the system, and figuring out whether it actually helps.
          </p>
          <p class="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
            My earlier work on TaxCloud’s integrations team covered Azure, Go
            services, Databricks and Spark pipelines, Terraform, and
            observability. That foundation carries into the new role.
          </p>
          <NuxtLink
            to="/blog/starting-an-ai-engineering-team"
            class="text-link inline-block mt-6"
            >Read about the new role →</NuxtLink
          >
        </div>
        <aside class="border-l-2 border-blue-300 dark:border-blue-700 pl-6">
          <p class="eyebrow mb-5">How I approach the work</p>
          <ul class="space-y-6">
            <li v-for="principle in principles" :key="principle.title">
              <h3 class="font-semibold">{{ principle.title }}</h3>
              <p
                class="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed"
              >
                {{ principle.text }}
              </p>
            </li>
          </ul>
        </aside>
      </UContainer>
    </section>
    <section
      class="section-space border-t border-gray-200 dark:border-gray-800"
    >
      <UContainer class="max-w-5xl"
        ><p class="eyebrow mb-3">The path here</p>
        <h2 class="editorial-title text-3xl mb-9">Experience</h2>
        <ol class="divide-y divide-gray-200 dark:divide-gray-800">
          <li
            v-for="job in experience"
            :key="job.role + job.company"
            class="py-7 grid sm:grid-cols-[160px_1fr] gap-3 sm:gap-8"
          >
            <p class="text-sm font-mono text-gray-500 dark:text-gray-400">
              {{ job.dates }}
            </p>
            <div>
              <h3 class="text-xl font-semibold">{{ job.role }}</h3>
              <p class="text-primary mt-1 font-medium">{{ job.company }}</p>
              <p class="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
                {{ job.description }}
              </p>
            </div>
          </li>
        </ol></UContainer
      >
    </section>
    <section class="section-space bg-gray-50 dark:bg-gray-950/40">
      <UContainer class="grid md:grid-cols-2 gap-10"
        ><div>
          <p class="eyebrow mb-3">Recognition</p>
          <h2 class="text-2xl font-semibold mb-4">
            Work that made a difference
          </h2>
          <ul class="space-y-3 text-gray-600 dark:text-gray-300">
            <li>Sopheon Outstanding Implementations — Merck & 3M projects</li>
            <li>
              Sopheon Outstanding Contribution — JavaScript component library
            </li>
          </ul>
        </div>
        <div>
          <p class="eyebrow mb-3">Education</p>
          <h2 class="text-2xl font-semibold mb-4">Colorado State University</h2>
          <p class="text-gray-600 dark:text-gray-300">
            BA in Political Science
          </p>
        </div></UContainer
      >
    </section>
  </main>
</template>
<script setup lang="ts">
const principles = [
  {
    title: "Start with the business problem.",
    text: "Understand the people, the workflow, and what a useful outcome would look like before choosing the tools.",
  },
  {
    title: "Build for the whole system.",
    text: "Interfaces, data, integrations, and operations all matter when an AI capability becomes part of someone’s work.",
  },
  {
    title: "Make room for evidence.",
    text: "Evaluate behavior, investigate failures, and keep a person in the loop where judgment matters.",
  },
];
const experience = [
  {
    dates: "2026–Present",
    role: "Senior AI Engineer",
    company: "TaxCloud",
    description:
      "Promoted from Senior Software Engineer to start a new AI engineering team. Building on integrations work across Azure, Go, Databricks, Spark, Terraform, DataDog, and ETL systems.",
  },
  {
    dates: "2022–2026",
    role: "Senior Software Engineer",
    company: "HeadSpin",
    description:
      "Architected scalable frontend solutions and built a custom Vue component library. Led feature work across the development lifecycle with rigorous test coverage.",
  },
  {
    dates: "2021–2022",
    role: "Software Engineer",
    company: "Sopheon",
    description:
      "Built full-stack features for a multi-tenant cloud application, improved UX and GDPR compliance, and created a REST API connecting a new web application to the core product.",
  },
  {
    dates: "2017–2021",
    role: "Senior Technical Consultant",
    company: "Sopheon",
    description:
      "Lead engineer for enterprise clients including Lockheed Martin and P&G. Built a reusable JavaScript component library and custom C# and SQL integrations.",
  },
];
useSeo().setPageMeta({
  title: "Career — Senior AI Engineer at TaxCloud",
  description:
    "Michael Diener’s path through software engineering, enterprise consulting, cloud integrations, and building a new AI engineering team at TaxCloud.",
  type: "profile",
});
</script>
