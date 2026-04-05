Benchmark run: 2026-01-04T19:36:50.999696
Device: cuda
Tasks: hellaswag, piqa, arc_easy, arc_challenge, mmlu, truthfulqa_mc2, winogrande
Batch size: 8
Limit: full dataset

=== SparkNet 70M v5 (checkpoints/sparknet-70m-v5) ===
hellaswag: acc,none: 0.2620, acc_norm,none: 0.2625, acc_norm_stderr,none: 0.0044, acc_stderr,none: 0.0044, alias: hellaswag
piqa: acc,none: 0.5707, acc_norm,none: 0.5598, acc_norm_stderr,none: 0.0116, acc_stderr,none: 0.0115, alias: piqa
arc_easy: acc,none: 0.3506, acc_norm,none: 0.3325, acc_norm_stderr,none: 0.0097, acc_stderr,none: 0.0098, alias: arc_easy
arc_challenge: acc,none: 0.1749, acc_norm,none: 0.2090, acc_norm_stderr,none: 0.0119, acc_stderr,none: 0.0111, alias: arc_challenge
mmlu: acc,none: 0.2297, acc_stderr,none: 0.0035, alias: mmlu
truthfulqa_mc2: acc,none: 0.4665, acc_stderr,none: 0.0157, alias: truthfulqa_mc2
winogrande: acc,none: 0.5130, acc_stderr,none: 0.0140, alias: winogrande

=== SparkNet 400M v1 6b (checkpoints/sparknet-400m-v1) ===
hellaswag: acc,none: 0.2868, acc_norm,none: 0.2993, acc_norm_stderr,none: 0.0046, acc_stderr,none: 0.0045, alias: hellaswag
piqa: acc,none: 0.6143, acc_norm,none: 0.6137, acc_norm_stderr,none: 0.0114, acc_stderr,none: 0.0114, alias: piqa
arc_easy: acc,none: 0.4398, acc_norm,none: 0.3986, acc_norm_stderr,none: 0.0100, acc_stderr,none: 0.0102, alias: arc_easy
arc_challenge: acc,none: 0.1954, acc_norm,none: 0.2261, acc_norm_stderr,none: 0.0122, acc_stderr,none: 0.0116, alias: arc_challenge
mmlu: acc,none: 0.2293, acc_stderr,none: 0.0035, alias: mmlu
truthfulqa_mc2: acc,none: 0.4208, acc_stderr,none: 0.0151, alias: truthfulqa_mc2
winogrande: acc,none: 0.5201, acc_stderr,none: 0.0140, alias: winogrande

=== SparkNet 400M v1 10b (checkpoints/sparknet-400m-v1-expanded) ===
hellaswag: acc,none: 0.2868, acc_norm,none: 0.2993, acc_norm_stderr,none: 0.0046, acc_stderr,none: 0.0045, alias: hellaswag
piqa: acc,none: 0.6143, acc_norm,none: 0.6137, acc_norm_stderr,none: 0.0114, acc_stderr,none: 0.0114, alias: piqa
arc_easy: acc,none: 0.4398, acc_norm,none: 0.3986, acc_norm_stderr,none: 0.0100, acc_stderr,none: 0.0102, alias: arc_easy
arc_challenge: acc,none: 0.1954, acc_norm,none: 0.2261, acc_norm_stderr,none: 0.0122, acc_stderr,none: 0.0116, alias: arc_challenge
mmlu: acc,none: 0.2293, acc_stderr,none: 0.0035, alias: mmlu
truthfulqa_mc2: acc,none: 0.4208, acc_stderr,none: 0.0151, alias: truthfulqa_mc2
winogrande: acc,none: 0.5201, acc_stderr,none: 0.0140, alias: winogrande

=== GPT-2 (gpt2) ===
hellaswag: acc,none: 0.2896, acc_norm,none: 0.3108, acc_norm_stderr,none: 0.0046, acc_stderr,none: 0.0045, alias: hellaswag
piqa: acc,none: 0.6295, acc_norm,none: 0.6251, acc_norm_stderr,none: 0.0113, acc_stderr,none: 0.0113, alias: piqa
arc_easy: acc,none: 0.4360, acc_norm,none: 0.3977, acc_norm_stderr,none: 0.0100, acc_stderr,none: 0.0102, alias: arc_easy
arc_challenge: acc,none: 0.1920, acc_norm,none: 0.2278, acc_norm_stderr,none: 0.0123, acc_stderr,none: 0.0115, alias: arc_challenge
mmlu: acc,none: 0.2293, acc_stderr,none: 0.0035, alias: mmlu
truthfulqa_mc2: acc,none: 0.4071, acc_stderr,none: 0.0149, alias: truthfulqa_mc2
winogrande: acc,none: 0.5225, acc_stderr,none: 0.0140, alias: winogrande

=== CodeLion GPT-2 70M (codelion/gpt-2-70m) ===
hellaswag: acc,none: 0.2631, acc_norm,none: 0.2683, acc_norm_stderr,none: 0.0044, acc_stderr,none: 0.0044, alias: hellaswag
piqa: acc,none: 0.5849, acc_norm,none: 0.5691, acc_norm_stderr,none: 0.0116, acc_stderr,none: 0.0115, alias: piqa
arc_easy: acc,none: 0.3847, acc_norm,none: 0.3527, acc_norm_stderr,none: 0.0098, acc_stderr,none: 0.0100, alias: arc_easy
arc_challenge: acc,none: 0.1775, acc_norm,none: 0.2167, acc_norm_stderr,none: 0.0120, acc_stderr,none: 0.0112, alias: arc_challenge
mmlu: acc,none: 0.2297, acc_stderr,none: 0.0035, alias: mmlu
truthfulqa_mc2: acc,none: 0.4691, acc_stderr,none: 0.0158, alias: truthfulqa_mc2
winogrande: acc,none: 0.5012, acc_stderr,none: 0.0141, alias: winogrande