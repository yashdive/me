---
title: How to write a note
date: 2026-11-17
draft: true
---

This is a template. It's marked `draft: true`, so it only shows up when you run `npm run dev`, never on the live site. Copy this file, rename it (the file name becomes the link, e.g. `attention.md` → `#notes/attention`), and delete these lines.

## Writing

Just type. A blank line starts a new paragraph. Use `##` for a section heading, `**bold**` for **bold**, `*italics*` for *italics*, and `[a link](https://example.com)` for [a link](https://example.com).

> A line starting with `>` becomes a quote.

- Dashes make a list
- like this

## Drawings

Put the image in `public/notes-images/`, then add it like this:

```
![What the drawing shows](/notes-images/my-drawing.jpg)
```

Whatever is in the brackets is what screen readers say, so describe the drawing.

## Publishing

Remove the `draft: true` line, commit, and push. It goes live on the next deploy.
