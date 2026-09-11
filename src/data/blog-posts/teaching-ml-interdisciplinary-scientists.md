---
title: Teaching Machine Learning to Interdisciplinary Scientists
slug: teaching-ml-interdisciplinary-scientists
publishDate: 2026-09-07
description: The PINC program's design rules, seen from inside the machine learning course they built.
tags: ["teaching", "machine learning"]
draft: true
---

In 2022, a group of San Francisco State faculty published "Ten simple rules for designing and running a computing minor for bio/chem students" in PLOS Computational Biology. It is the PINC program written down: the university's computing minor for biology, biochemistry, and chemistry students. It is an experience report, not an experiment. That is the rare kind of paper that ages well, because it documents decisions rather than results.

The decision it documents is stark. At SFSU, almost no biology, biochemistry, or chemistry student completed a computer science minor. Not because the students could not learn to code. Because nothing in the curriculum was built for them. PINC was the counterproposal: a fifteen-unit minor designed around science students, their schedules, and their problems, with three learning objectives running through it: computational skills applied to real problems, functional knowledge of machine learning, and the ability to synthesize both around questions that matter in their own fields.

Most of the paper's authors still run the program. Four years after publication, I teach its machine learning course. CSC 411 exists to do for machine learning what PINC did for computing: build the path for students the standard curriculum does not reach, and reach them before they decide the path isn't theirs.

## The audience is the design

The paper's first rules are about who the program is for. Narrow the audience. Welcome students with no coding experience. Give them a tangible incentive. Those three decisions do most of the work before a single lecture exists, because they tell you what you are allowed to assume. In CSC 411 I can assume almost nothing: no linear algebra, no calculus, no prior machine learning coursework. The course meets students at matrix multiplication and builds upward from there.

That constraint is not a burden, it is the design. A training loop, an MLP layer, an attention head. Each one is derived from scratch, implemented by hand, and then composed into a transformer encoder, the architecture behind modern language models. By the end of the semester the student has built a small version of the thing that runs ChatGPT, and can say what each piece does to their data and where information is lost along the way.

The paper's third rule, the tangible incentive, scales down to a course nicely. Students run a portfolio project on a dataset of their own choosing, with checkpoints across the term and a written self-analysis at the end. They leave with an artifact that is theirs, not just a grade.

## Derive before you delegate

The rule that lives in my syllabus but not in the paper is the one I was hired to embody: machine learning has to be built before it is used. These students will spend their careers alongside models they did not write. The difference between literacy and consumption is knowing what sits under the abstraction. So the course hands them the math as it is needed, in the order it is needed, and only after each operation has been built by hand do the libraries arrive to make it fast and ergonomic. A full deep learning stack can fit in a few hundred lines of pure Python, and the course leans on that fact constantly.

There are no exams. The unit of work is the weekly notebook. Each lab notebook has three zones: the week's teaching, pair exercises that are the day's real work, and a small graded check. Only the check is scored, and the notebook says so plainly. This is a small act of design with an outsized effect: students spend their effort on the material instead of trying to guess what is graded.

## The literacy that outlives the semester

Students also read papers. Real machine learning literature, chosen to match the level of model they have just built, discussed in class. This is the objective that matters most to me. A biologist will meet these models again in the literature of their own field, as tools and as claims. The ability to read a model's description critically, to ask what it actually did to the data, is the skill that will still be there in ten years.

The program's support structure is its own kind of pedagogy. Office hours, TA discussion sections, a course Discord, recordings posted and destroyed at the end of the term, no textbook to buy, a generative AI policy that treats models as tutors rather than solution engines: use them to learn, cite what you use, and be responsible for what you submit. The paper calls this being compassionate and flexible, and it is a design choice, not a mood. I was an instructional assistant for the program's protein modeling course before I taught this one, and I have watched students who described themselves as terrified of coding finish the term with working protein models and a different sense of what they were capable of. The paper's authors wrote that rule from experience. It is the rule I have seen do the most actual work.

## Past bio/chem

PINC's wager is that interdisciplinary students are not a feeder pipeline for computer science. They are where machine learning gets its next questions. The scientists who learn to build these models bring problems to the table that a CS classroom does not produce: what a protein looks like, what a binding site does, what a diagnosis costs when it is wrong. That is the case for every discipline, not just the life sciences. Every field has its PINC crowd: people who are told, loudly and early, that computing is not for them. The barrier is curriculum design, not aptitude. The rules are written down now. The interesting work is applying them everywhere else.
