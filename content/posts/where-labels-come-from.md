---
title: 'Where do the labels come from?'
slug: 'where-labels-come-from'
date: '2026-11-09'
description: 'A student asked how I could trust labels I generated myself. The honest answer is that a label is already a model.'
tags: ['machine learning', 'teaching', 'data quality']
garden: 'doc-cel-d3608c958bf3'
draft: true
---
I wanted an extremely small case of sequence learning to show a group of life science students I teach. I picked CG pairs: a simple, well-known, and well-studied feature of DNA sequences.

I generated a synthetic dataset of random DNA sequences, half labeled as having a CpG island and half not, and trained a small network to tell them apart. Easy. Here's the generation code:

```python
BASES = "ACGT"

# 0 no island, 1 island

def make_genes(n, min_len, max_len, seed):
    g = torch.Generator().manual_seed(seed)
    genes, labels = [], []
    for _ in range(n):
        label = int(torch.rand(1, generator=g) < 0.5)  # half islands, half not
        length = int(torch.randint(min_len, max_len + 1, (1,), generator=g))
        gene = ""
        while len(gene) < length:
            letter = BASES[int(torch.randint(0, 4, (1,), generator=g))]
            # no-island sequences mostly refuse to put a G right after a C
            if label == 0 and gene.endswith("C") and letter == "G" and torch.rand(1, generator=g) < 0.8:
                continue
            gene += letter
        genes.append(gene)
        labels.append(label)
    return genes, torch.tensor(labels)
```

A student asked me *why* I could be sure my true labels were true, if they came from a synthetic dataset.

I thought his concern was that we were somehow training on the labels directly. It wasn't. He raised it again after class, and his question was closer to: wait, what function *already* exists that lets us record CpG islands this way?

## A label is already a model

In biology, features like CpG islands are *real*, *empirical* effects that scientists have recorded a rate from. So the human understanding of CpG islands is *already* a model, derived from observation of how often CpG pairs show up in DNA, and that observation changes over time.

The model is roughly: CpG pairs are *more likely* in certain regions of the genome, and those regions are associated with certain biological functions. It isn't perfect. There are exceptions and variation in the data. But because other scientists have studied it carefully, it's reasonably accurate within the bounds they set.

My generator just wrote that model down in Python. The network learned my version of it, and my version is a copy of theirs.

That is true of synthetic data, but it isn't special to synthetic data. Someone, or some procedure, decided what counts. A model can only be as right as that decision, and when we say a model "works" we have usually checked that it agrees with whoever made the labels.

## The question worth keeping

Most computer science students have been trained away from questions like this, quite practically, because their programming education used languages designed to reach ends. They learn to reason about the relationships between objects, not about whether and how the objects exist in the first place.

<!-- V: the next paragraph is Claude's bridge from your draft to data work. Rewrite it in your words or cut it. -->
I think the student's question is the important one. It's the first thing I want to know about any dataset I'm handed: where the labels came from, what they were valid inside of, and what it would look like if the labeler were wrong in a consistent way rather than a random one.
