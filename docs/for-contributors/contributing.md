---
title: Contributing
description: Comprehensive guide for contributors on how to contribute to the project using different methods
draft: false
---

# Contributing

___

## Forward

For all of these methods you will need a github account. It's free and Microsoft has only barely begun to enshittify it.

Simple changes like correcting word choice, or adding a couple sentences to an existing guide can be done via the first method with no real knowledge of github or markdown. Changing formatting and adding links or images will require a familiarity with markdown, or a markdown editor. There are extensions for google docs that can export to markdown. [StackEdit](https://stackedit.io/) is an online markdown editor that will let you format text using normal word processor tools and dispaly both the raw markdown and the final file side by side and can be a nice way to learn markdown. Lastly the github web editor can be toggled back and forth between editing the raw mark down and previewing the final formatting, but lacks a spell check.

The book has advanced styling that can only be previewed using the third contribution method, anything you preview in a markdown editor or the web github editor will not look exactly like it will in the book.

The [Book Style Sheet](book-style-sheet.md) article includes some basic markdown tips and the [Book Structure](book-structure.md) article will tell you where you should put new files.

## Method 1: Simple editing via GitHub

This is the fastest way to make minor edits directly through the GitHub interface. This method is ideal for quick fixes.

You'll need:
    - [GitHub](https://github.com/) account

1. Go to the page you want to edit.
2. At the bottom of the page, click on the pencil icon (Edit this page).
3. Make your changes in the editor that opens.
4. At the bottom of the page, fill in the “Commit changes” field (the name of your change) and click “Propose changes.”
    - This will automatically create a fork (copy) of the repository under your account and open a Pull Request with your changes.

## Method 2: Adding new articles via the GitHub web interface

If you want to add completely new articles using only the web interface (for example, if you cannot or do not want to install additional software) and you don't mind not being able to see the exact appearance of the page until you merge it, then this method is for you.

However, keep in mind that GitHub's web editor does not allow you to save drafts without creating commits, which can clutter up your history.

You'll need:
    - [GitHub](https://github.com/) account

First you will need to fork the book, if you have already submitted simple changes via the first method this will already have been done. Otherwise you can follow these steps:

1. Fork the repository:
    - Go to the [main repository](https://github.com/TheParaziT/anomaly-modding-book).
    - Click the “Fork” button in the upper right corner.
    - Create a fork under your account.

2. Create or upload a file:
    - In your fork, navigate to the `docs` folder (or another folder, depending on the project structure).
    - Нажмите кнопку "Add file" -> "Create new file" или "Upload files".
    - Create a file with the *.md extension.

3. Create a Pull Request:
    - After saving the files, go to the “Pull requests” tab in your fork.
    - Click “New Pull Request,” select the main repository and your fork branch for comparison.
    - Describe your changes and create a PR.

## Method 3: Local development (Recommended)

This is the intended way to work with the project. It allows you to take full advantage of all the features of Docusaurus, including immediate preview of changes on a local server.

You'll need:
    - [Node.js](https://nodejs.org/)
    - [Git](https://gitforwindows.org/)
    - [GitHub](https://github.com/) account
    - (Optional) [VSCode](https://code.visualstudio.com/) or [VSCodium](https://vscodium.com/)

### Forking and cloning a repository

Contributing to this book follows the standard "Pull Request" workflow. That basically means that you will have your own copy of the book, and you will ask us to pull your changes into the main repository.

1. Make a fork
2. Clone the repository to your computer:
    - You can clone the repository in VSCode or via Git.

#### Clonning via Git

- Open a terminal (PowerShell, Git Bash, etc.) in the folder where you want to clone the project.
- Copy the URL of your fork (the “Code” button).
- Execute the command:

```bash
git clone https://github.com/YOUR_USERNAME/anomaly-modding-book.git
cd anomaly-modding-book
```

### Installing dependencies and running

1. Install project dependencies: In the root of the cloned repository, run the command. This will install all necessary packages, including Docusaurus.

    ```bash
    npm install
    ```

2. Start the local server for development:

    ```bash
    npm start
    ```

    - This command will start a local server, open a browser at http://localhost:3000, and automatically reload the page when any changes are saved to the files.

### Making changes

1. Create a new article:

    - New *.md files are usually placed in the `docs/` folder in the folder you need.

### Commit and push changes

1. Prepare changes: Use the “Source Control” tab in VSCode or the terminal to add the changed files.

#### Via Git

1. Create a commit:

    ```bash
    git commit -m "feat: add a new article about something awesome"
    ```

2. Push your changes to your GitHub fork:

    ```bash
    git push origin main
    ```

### Creating a Pull Request

Once your changes are in your fork on GitHub:

1. Go to the [main repository](https://github.com/TheParaziT/anomaly-modding-book) page.
2. Open the “Pull requests” tab.
3. Click “New pull request.”
4. Click “compare across forks” and select your fork branch for comparison.
5. Click “Create pull request” and describe your changes.
6. You're awesome! Your changes will be reviewed and accepted shortly.
