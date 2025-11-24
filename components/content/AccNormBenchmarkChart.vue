<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <header class="mb-1 flex flex-col gap-1">
      <p class="mt-0 mb-0 text-sm font-semibold uppercase tracking-wide text-sky-500 dark:text-sky-400">
        Benchmark Spotlight
      </p>
      <div>
        <h3 class="mt-0 text-2xl font-bold text-slate-900 dark:text-white flex w-full justify-center">
          Normalized Accuracy Across Benchmark Tasks
        </h3>
      </div>
    </header>

    <div class="relative">
      <div ref="chartRef" class="h-[340px] w-full"></div>
      <div
        ref="tooltipRef"
        class="pointer-events-none absolute z-10 hidden w-52 rounded-xl border border-slate-200 bg-white/95 p-2.5 text-[11px] shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-800/90"
      ></div>
      <div class="pointer-events-none absolute right-0 top-0 rounded-lg border border-slate-200/70 bg-white/90 px-3 py-2 text-xs shadow dark:border-slate-700/70 dark:bg-slate-900/80">
        <p class="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
          Models
        </p>
        <ul class="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
          <li
            v-for="model in models"
            :key="model.key"
            class="flex items-center gap-2"
          >
            <span
              class="inline-block h-2.5 w-2.5 rounded-sm"
              :style="{ backgroundColor: model.color }"
              :aria-label="`${model.label} color key`"
            ></span>
            <span class="font-medium">{{ model.label }}</span>
          </li>
        </ul>
      </div>
    </div>

    <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">
      Bars show acc_norm scores (higher is better). Hover to see the underlying stderr and quick context for each benchmark.
    </p>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import { scaleBand, scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

type ModelKey = 'sparknet' | 'gpt2' | 'codelion';

interface BenchmarkDatum {
  id: string;
  label: string;
  description: string;
  values: Record<ModelKey, { score: number; stderr: number }>;
}

const models: Array<{ key: ModelKey; label: string; color: string }> = [
  { key: 'sparknet', label: 'SparkNet 70M v5', color: '#0284c7' }, // sky-600
  { key: 'codelion', label: 'CodeLion GPT-2 70M', color: '#f97316' }, // orange-500
  { key: 'gpt2', label: 'GPT-2', color: '#7c3aed' }, // violet-600
];

const dataset: BenchmarkDatum[] = [
  {
    id: 'hellaswag',
    label: 'HellaSwag',
    description: 'Commonsense reasoning over everyday scenarios.',
    values: {
      sparknet: { score: 0.2625, stderr: 0.0044 },
      gpt2: { score: 0.3108, stderr: 0.0046 },
      codelion: { score: 0.2683, stderr: 0.0044 }
    }
  },
  {
    id: 'piqa',
    label: 'PIQA',
    description: 'Physical commonsense completion.',
    values: {
      sparknet: { score: 0.5598, stderr: 0.0116 },
      gpt2: { score: 0.6251, stderr: 0.0113 },
      codelion: { score: 0.5691, stderr: 0.0116 }
    }
  },
  {
    id: 'arc_easy',
    label: 'ARC (Easy)',
    description: 'Grade-school science QA (easy split).',
    values: {
      sparknet: { score: 0.3325, stderr: 0.0097 },
      gpt2: { score: 0.3977, stderr: 0.0100 },
      codelion: { score: 0.3527, stderr: 0.0098 }
    }
  },
  {
    id: 'arc_challenge',
    label: 'ARC (Challenge)',
    description: 'Grade-school science QA (challenge split).',
    values: {
      sparknet: { score: 0.209, stderr: 0.0119 },
      gpt2: { score: 0.2278, stderr: 0.0123 },
      codelion: { score: 0.2167, stderr: 0.0120 }
    }
  }
];

const chartRef = ref<HTMLDivElement | null>(null);
const tooltipRef = ref<HTMLDivElement | null>(null);
let resizeObserver: ResizeObserver | null = null;

const drawChart = () => {
  if (!chartRef.value) {
    return;
  }

  const margin = { top: 12, right: 12, bottom: 48, left: 52 };
  const outerHeight = 340;

  const containerWidth = chartRef.value.clientWidth || 600;
  const width = Math.max(containerWidth - margin.left - margin.right, 200);
  const height = outerHeight - margin.top - margin.bottom;

  select(chartRef.value).selectAll('*').remove();

  const svg = select(chartRef.value)
    .append('svg')
    .attr('width', '100%')
    .attr('height', outerHeight)
    .attr('viewBox', `0 0 ${containerWidth} ${outerHeight}`);

  const plot = svg
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = scaleBand<string>()
    .domain(dataset.map((d) => d.id))
    .range([0, width])
    .paddingInner(0.3);

  const xSub = scaleBand<ModelKey>()
    .domain(models.map((m) => m.key))
    .range([0, x.bandwidth()])
    .padding(0.08);

  const yMax = max(dataset, (d) => max(models, (m) => d.values[m.key].score)) ?? 0.7;
  const y = scaleLinear().domain([0, Math.min(1, yMax + 0.05)]).range([height, 0]);

  const axisBottomGroup = plot
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(
      axisBottom(x).tickFormat((value) => {
        const match = dataset.find((d) => d.id === value);
        return match ? match.label : value;
      })
    );

  axisBottomGroup
    .selectAll('text')
    .attr('class', 'text-xs font-medium fill-slate-600 dark:fill-slate-200')
    .call((text) => text.each(function () {
      const el = select(this);
      const lines = el.text().split(' ');
      if (lines.length > 1) {
        el.text('');
        lines.forEach((line, i) => {
          el.append('tspan').text(line).attr('x', 0).attr('dy', i ? '1.1em' : 0).attr('y', '1.5em');
        });
      }
    }));

  plot
    .append('g')
    .call(axisLeft(y).ticks(6).tickFormat((d) => d.toFixed(2)))
    .selectAll('text')
    .attr('class', 'text-xs font-medium fill-slate-600 dark:fill-slate-200');

  plot
    .append('text')
    .attr('class', 'text-sm font-semibold fill-slate-700 dark:fill-slate-100')
    .attr('transform', 'rotate(-90)')
    .attr('x', -height / 2)
    .attr('y', -margin.left + 8)
    .attr('text-anchor', 'middle')
    .text('Normalized Accuracy (acc_norm)');

  const testGroups = plot
    .selectAll('.test-group')
    .data(dataset)
    .join('g')
    .attr('class', 'test-group')
    .attr('transform', (d) => `translate(${x(d.id) ?? 0},0)`);

  testGroups
    .selectAll('rect')
    .data((d) =>
      models.map((model) => ({
        ...model,
        testId: d.id,
        testLabel: d.label,
        description: d.description,
        score: d.values[model.key].score,
        stderr: d.values[model.key].stderr
      }))
    )
    .join('rect')
    .attr('x', (d) => xSub(d.key) ?? 0)
    .attr('y', (d) => y(d.score))
    .attr('width', xSub.bandwidth())
    .attr('height', (d) => height - y(d.score))
    .attr('rx', 4)
    .attr('fill', (d) => d.color)
    .attr('opacity', 0.9)
    .on('mouseenter', (event, d) => {
      select(event.currentTarget).attr('opacity', 1);
      showTooltip(event, d);
    })
    .on('mouseleave', (event) => {
      select(event.currentTarget).attr('opacity', 0.9);
      hideTooltip();
    });

  plot
    .append('text')
    .attr('x', width / 2)
    .attr('y', height + margin.bottom - 14)
    .attr('text-anchor', 'middle')
    .attr('class', 'text-[13px] font-semibold fill-slate-700 dark:fill-slate-100')
    .text('Benchmark Task');
};

const showTooltip = (
  event: MouseEvent,
  payload: {
    label: string;
    testLabel: string;
    description: string;
    score: number;
    stderr: number;
  }
) => {
  if (!tooltipRef.value || !chartRef.value) {
    return;
  }

  tooltipRef.value.innerHTML = `
    <p class="text-[13px] font-semibold text-slate-900 dark:text-white">${payload.label}</p>
    <p class="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-300">${payload.testLabel}</p>
    <p class="mt-1 text-[13px] text-slate-900 dark:text-slate-100"><span class="font-semibold">acc_norm:</span> ${(payload.score * 100).toFixed(1)}%</p>
    <p class="text-[11px] text-slate-500 dark:text-slate-400">stderr ± ${(payload.stderr * 100).toFixed(2)}%</p>
    <p class="mt-1 text-[11px] leading-snug text-slate-500 dark:text-slate-400">${payload.description}</p>
  `;

  const bounds = chartRef.value.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top - 12;

  tooltipRef.value.style.left = `${x}px`;
  tooltipRef.value.style.top = `${y}px`;
  tooltipRef.value.style.transform = 'translate(-50%, -100%)';
  tooltipRef.value.classList.remove('hidden');
};

const hideTooltip = () => {
  tooltipRef.value?.classList.add('hidden');
};

onMounted(() => {
  drawChart();

  if (chartRef.value && 'ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => drawChart());
    resizeObserver.observe(chartRef.value);
  } else {
    window.addEventListener('resize', drawChart);
  }
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  window.removeEventListener('resize', drawChart);
});
</script>
