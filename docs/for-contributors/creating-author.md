---
description: Guide for creating and managing author profiles in the documentation
---

# Creating Author

___

## About

Docusaurus provides a convenient author management system for your blog. This system allows you to reuse author information in different articles, ensuring consistency and saving time.

## How to edit

Open the `authors.yml` file in the `blog` directory and edit it.

[List of all available data in the official Docusaurus documentation](https://docusaurus.io/docs/blog#global-authors).

### Custom data

The following custom data is also available.

- moddb
- discord
- telegram
- vk
- website
- youtube

## Using authors in documentation and blogs

### Blog

In the front matter of your blog's Markdown files, you can reference authors as follows:

```yml
---
authors: [johndoe, janesmith]
---
```

### Docs

For docs pages, the format changes:

```html
<Authors
  authors={["johndoe", "janesmith"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>
```
