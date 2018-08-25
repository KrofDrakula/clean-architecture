# Clean Architecture - analyzer

This module contains the basic tools required to generate a report of the metrics involved in evaluating source files, adapted for use in JavaScript and TypeScript projects.

Source files are considered the atomic parts of a code base and represent the default boundary. By grouping source files into components (an analog of NPM packages) we can then determine the relationships between these components by analysing the metrics of their constituent files and dependencies.

## Defining a component

Any file contained within an NPM package is automatically grouped by that package name. For source files, we need a way to mark files as belonging to a particular package by either convention or explicit declaration.

**TBD -- still a work in progress**

## Instability

_Originally described on page 122 in the book._

The measure of instability relates to how many dependencies a source file imports vs. the number of files dependent on the file being analysed. We define three metrics:

- _Fan-in_ (`FI`): the number of incoming dependencies in the range `[0, Inf)`
- _Fan-out_ (`FO`): the number of outgoing dependencies in the range `[0, Inf)`
- _Instability_ (`I`): a number in the range `[0,1]`

Instability is calculated from the other two metrics by the following relation:

```
I = FO / (FI + FO)
```

When a file has a combined sum of `FI + FO == 0`, the `I` metric is undefined.

Each unique imported module in a JS/TS file increments the `FI` parameter. Take this example file:

```js
import spectrum, { red, blue } from './colors';
import * as fs from 'fs';

const getRandom = () => spectrum.get(red + Math.random() * (blue - red));

export default getRandom;
```

This file would have a value for `FI` equal to **2** (one for each module/file imported).

Any file referencing this file would increment this file's `FO` value by one.

If the file is grouped into a component, then that component's `FI` and `FO` counts only increase if they reference files or modules outside of the component.
