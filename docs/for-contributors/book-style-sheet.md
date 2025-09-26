---
description: Guidelines for writing and formatting articles consistently across the documentation
---

# Book Style Sheet

___

## About

This guide describes the consistent standards for writing and formatting articles for our documentation on Docusaurus. Following these rules ensures the integrity, maintainability, and professional appearance of the entire project. The content of articles is entirely at your discretion and will not be corrected (except for syntax corrections, errors, additions, and minor edits), but we recommend following these guidelines:

## Glossary and terminology

Objective: To create a glossary of specific terms unique to the S.T.A.L.K.E.R. universe.

- What to include:
  - Terms for which there is no or little information available in open sources.
  - Terms that are critical to understanding the context of a mod or project.
- What not to include: Commonly used words and concepts that are easy to find in standard dictionaries or wikis.

## Formatting and syntax

1. Structure and headings

    - First-level heading (H1): Used only once at the beginning of the document as its title. Docusaurus automatically uses the file name as H1, so it is often not written in the file itself. `Title Case` format.
      - Example: `# This Is a Title`
    - Second and subsequent level headings (H2, H3, ...): `Sentence case` format.
      - Example: `## This is a subheading`, `### This is a sub-subheading`
    - Separator: After the first-level heading (page title), use triple underscores `___` to visually separate metadata from content.

2. Naming files and folders

    - Format: `kebab-case`.
    - Example:
      - `anomaly-compass.md`
      - `guides/quick-start-guide.md`
      - `api/actor-proxy-class.md`

3. Links

    - Always use relative paths in Markdown format instead of absolute HTTP links.

4. Code blocks and file formats

    - Specify the language: Always specify the code language for syntax highlighting.
    - File formats: When mentioning file extensions, use *. at the beginning.

5. Admonitions

    - Docusaurus provides convenient and stylish blocks for highlighting information.

6. Blank line

    - All files must end with a single blank line character. This is standard for Unix systems and the requirements of many linters.

## Tools

To maintain a consistent style, use the Markdownlint extension.

- Disabled rules:
  - MD033 (no-inline-html)
  - MD013 (line-length)
  - MD010 (no-hard-tabs)
