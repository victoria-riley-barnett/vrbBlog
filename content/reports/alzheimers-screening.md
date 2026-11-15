---
title: 'Screening for Alzheimer’s with a random forest'
description: 'A recall-optimized random forest screen: what the class cutoff buys, and what the importance ranking is really measuring.'
project: 'alzheimers-screening'
source: 'https://github.com/victoria-riley-barnett/r-alzheimers-rf/blob/main/report.md'
---
Random forest screen for Alzheimer's on 2,149 public synthetic records, 35 features, 1,389 negative and 760 positive. Accuracy was never the constraint, since a missed case costs a diagnosis, so the positive class gets a lower cutoff: 0.7/0.3 instead of 0.5/0.5.

```r
final_model <- randomForest(
  x = x_train, y = y_train,
  ntree = 3000, mtry = 10,
  cutoff = c(0.7, 0.3),   # lower the bar for the positive class
  importance = TRUE
)

TP <- oob_conf["Actual 1", "Predicted 1"]
FP <- oob_conf["Actual 0", "Predicted 1"]
FN <- oob_conf["Actual 1", "Predicted 0"]

precision_val <- TP / (TP + FP)
recall_val <- TP / (TP + FN)
f1_val <- 2 * (precision_val * recall_val) / (precision_val + recall_val)
```

<svg class="post-chart" viewBox="0 0 600 212" role="img" aria-labelledby="chart-metrics">
  <title id="chart-metrics">Accuracy, recall, precision and F1 at the 0.5/0.5 and 0.7/0.3 class cutoffs</title>
  <g class="chart-grid">
    <line x1="150.0" y1="22" x2="150.0" y2="196" />
    <line x1="365.0" y1="22" x2="365.0" y2="196" />
    <line x1="580.0" y1="22" x2="580.0" y2="196" />
  </g>
  <g class="chart-text">
    <rect class="bar-baseline" x="360" y="4" width="9" height="9" />
    <text x="374" y="12">0.5 / 0.5</text>
    <rect class="bar-optimized" x="464" y="4" width="9" height="9" />
    <text x="478" y="12">0.7 / 0.3</text>
  </g>
  <g class="chart-text">
    <text x="140" y="51" text-anchor="end">Accuracy</text>
    <rect class="bar-baseline" x="150" y="30" width="330.7" height="12" />
    <text class="chart-value" x="486.7" y="39.5">95.38</text>
    <rect class="bar-optimized" x="150" y="46" width="316.7" height="12" />
    <text class="chart-value" x="472.7" y="55.5">94.73</text>
  </g>
  <g class="chart-text">
    <text x="140" y="95" text-anchor="end">Recall</text>
    <rect class="bar-baseline" x="150" y="74" width="285.1" height="12" />
    <text class="chart-value" x="441.1" y="83.5">93.26</text>
    <rect class="bar-optimized" x="150" y="90" width="384.6" height="12" />
    <text class="chart-value" x="540.6" y="99.5">97.89</text>
  </g>
  <g class="chart-text">
    <text x="140" y="139" text-anchor="end">Precision</text>
    <rect class="bar-baseline" x="150" y="118" width="293.0" height="12" />
    <text class="chart-value" x="449.0" y="127.5">93.63</text>
    <rect class="bar-optimized" x="150" y="134" width="181.0" height="12" />
    <text class="chart-value" x="337.0" y="143.5">88.42</text>
  </g>
  <g class="chart-text">
    <text x="140" y="183" text-anchor="end">F1</text>
    <rect class="bar-baseline" x="150" y="162" width="289.0" height="12" />
    <text class="chart-value" x="445.0" y="171.5">93.44</text>
    <rect class="bar-optimized" x="150" y="178" width="277.8" height="12" />
    <text class="chart-value" x="433.8" y="187.5">92.92</text>
  </g>
  <g class="chart-text">
    <text x="150.0" y="207" text-anchor="middle">80</text>
    <text x="365.0" y="207" text-anchor="middle">90</text>
    <text x="580.0" y="207" text-anchor="middle">100</text>
  </g>
</svg>

Missed cases fall from 51 to 16. That costs 0.65 points of accuracy and 5.21 of precision; F1 moves 0.52, and false positives rise from 48 to 97.

<svg class="post-chart" viewBox="0 0 600 208" role="img" aria-labelledby="chart-importance">
  <title id="chart-importance">Mean decrease in accuracy by feature for the recall-optimized model</title>
  <g class="chart-grid">
    <line x1="150.0" y1="8" x2="150.0" y2="184" />
    <line x1="362.1" y1="8" x2="362.1" y2="184" />
    <line x1="580.0" y1="8" x2="580.0" y2="184" />
  </g>
  <g class="chart-text">
    <text x="140" y="27.5" text-anchor="end">Functional Assessment</text>
    <rect class="bar-optimized" x="150" y="18" width="427.5" height="11" />
    <text class="chart-value" x="583.5" y="27.5">362.91</text>
  </g>
  <g class="chart-text">
    <text x="140" y="52.5" text-anchor="end">ADL</text>
    <rect class="bar-optimized" x="150" y="43" width="394.5" height="11" />
    <text class="chart-value" x="550.5" y="52.5">334.87</text>
  </g>
  <g class="chart-text">
    <text x="140" y="77.5" text-anchor="end">MMSE</text>
    <rect class="bar-optimized" x="150" y="68" width="314.9" height="11" />
    <text class="chart-value" x="470.9" y="77.5">267.28</text>
  </g>
  <g class="chart-text">
    <text x="140" y="102.5" text-anchor="end">Memory Complaints</text>
    <rect class="bar-optimized" x="150" y="93" width="314.2" height="11" />
    <text class="chart-value" x="470.2" y="102.5">266.71</text>
  </g>
  <g class="chart-text">
    <text x="140" y="127.5" text-anchor="end">Behavioral Problems</text>
    <rect class="bar-optimized" x="150" y="118" width="231.2" height="11" />
    <text class="chart-value" x="387.2" y="127.5">196.24</text>
  </g>
  <g class="chart-text">
    <text x="140" y="152.5" text-anchor="end">Age</text>
    <rect class="bar-optimized" x="150" y="143" width="5.1" height="11" />
    <text class="chart-value" x="161.1" y="152.5">4.35</text>
  </g>
  <g class="chart-text">
    <text x="140" y="177.5" text-anchor="end">Education</text>
    <rect class="bar-optimized" x="150" y="168" width="4.5" height="11" />
    <text class="chart-value" x="160.5" y="177.5">3.85</text>
  </g>
  <g class="chart-text">
    <text x="150.0" y="200" text-anchor="middle">0</text>
    <text x="362.1" y="200" text-anchor="middle">180</text>
    <text x="580.0" y="200" text-anchor="middle">365</text>
  </g>
</svg>

The four strongest features are the instrument scores the diagnosis is already derived from. Age and education sit 83 times below the top of the list, so nothing was learned from demographics.
