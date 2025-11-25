---
title: Recall Over Accuracy for Alzheimer's Screening
slug: alzheimers-screening-recall-optimization
publishDate: 2025-07-07
description: Sometimes the right technical choice isn't technical at all.
tags: ["machine learning", "projects"]
---

I worked on an Alzheimer's screening project following the standard data science playbook—build the model, optimize F1, try to beat out the literature. But somewhere about halfway into building that model, it became clear that the textbook approach was missing something essential.

The problem revealed itself in the consequences: missing an Alzheimer's diagnosis means someone might not get treatment until it's too late, while a false positive just means more testing is incumbent on the clinic. The technical question of which error matters more turned out to have an intractable and very human answer.

## Why Random Forest Made Sense Here

We settled on Random Forest in R not because it was novel, but because it aligned with what medical screening actually requires:

- It handles the messy reality of clinical data without demanding perfection
- Probability outputs let us show confidence levels rather than binary decisions
- Feature importance gave us a way to validate against clinical knowledge
- Cheap and easy to use
- It was a great way for DS beginners to get some R exposure

The real work happened in tuning. While most optimization chases balanced metrics, we deliberately set our `cutoff` parameter to favor sensitivity. We tested dozens of configurations, but the question was always the same: "Does this help us catch more true cases?" rather than "Does this improve our overall score?"

## The Ethics Embedded in Technical Choices

What this project taught me is that machine learning ethics isn't a separate consideration—it's built into every parameter decision. Engineering is, at its core, inseparable from business logic, which is in turn inseparable from the human consideration. When we prioritized recall, we were making a deliberate choice about which kind of error we could live with. 

But this comes with its own can of worms: how many people can the clinic screen? How many do they screen now, and how many more can they support? Because as data science tools make us better at identification, they alone do not change the question of capacity.

The model's feature importance reinforced this approach. Clinical assessments dominated the predictions while demographic factors remained minimal. This wasn't just good performance—it was responsible design that reduced potential bias.

## Building Tools That Actually Help

The lesson that stayed with me is that technical excellence and ethical consideration aren't competing priorities—they're different dimensions of the same problem. Our recall-first approach wasn't a compromise on technical grounds; it was the most technically sound way to address the actual problem.

If I were to revisit this work, I'd explore interpretability tools like [SHAP](https://shap.readthedocs.io/en/latest/) to give clinicians more insight into the predictions. Because the goal isn't just accurate models—it's building tools that doctors can trust and understand.

**What We Achieved:**
| Metric | Value | Why It Matters |
|--------|-------|----------------|
| Recall | 97.89% | Only 2% of Alzheimer's cases missed |
| False Negatives | 16 cases | Down from 51 in balanced approach |
| Accuracy | 94.73% | Outperforms literature (Li et al.: 90-91%) |
| Precision | 88.42% | 88% of flagged cases are true Alzheimer's |
| F1 Score | 92.92% | Balanced performance between recall and precision |

This project reinforced my sense that the most meaningful machine learning work happens where technical decisions intersect with real human impact. The metrics matter, but only in service of the problem we're actually trying to solve.

*Code and full analysis available in the [GitHub repo](https://github.com/victoria-riley-barnett/r-alzheimers-rf).*
