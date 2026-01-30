---
title: GitHub Release Workflow
keywords:
  - GitHub
  - Workflow
---

# GitHub Release Workflow

___

<Authors
authors={["ncenka"]}
size="medium"
showTitle={true}
showDescription={true}
/>

## Workflow definition

Create a file `.github/workflows/main.yml` in your repository or alternatively go to "Actions" tab, on the left click "New workflow", then above the search bar click on "set up a workflow yourself" link.

After completing one of the above steps, add the following content into the file:

```yaml
name: Create Release with 7z Archive

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version tag'
        required: true
        default: 'auto-release'
      description:
        description: 'Release description'
        required: false
        default: 'Automatic release - if you reading this that means its better to NOT download this version.'

jobs:
  release:
    name: Create Release
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Prepare build structure
        run: |
          mkdir -p build_temp
          rsync -av \
            --exclude '.git' \
            --exclude '.github' \
            --exclude '.gitattributes' \
            --exclude 'README.md' \
            --exclude 'version' \
            ./* build_temp/
      
          echo "? files to build:"
          ls -la build_temp/

      - name: Create 7z archive
        uses: edgarrc/action-7z@v1
        with:
          args: 7z a -t7z -mx=9 <your_cool_mod_name>-${{ github.event.inputs.version }}.7z ./build_temp/gamedata -r

      - name: Clean up
        run: rm -rf fomod

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: ${{ github.event.inputs.version }}
          name: Release ${{ github.event.inputs.version }}
          body: |
            ${{ github.event.inputs.description }}
          files: <your_cool_mod_name>-${{ github.event.inputs.version }}.7z
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Initial setup

Replace `<your_cool_mod_name>` with the actual name of your mod in the workflow file.

Edit `rsync` command in the "Prepare build structure" step to exclude any additional files or directories that should not be included in the release archive.

Commit and push the changes to your repository.

## Usage

To create a new release, go to the "Actions" tab in your GitHub repository, select the "Create Release with 7z Archive" workflow, and click on the "Run workflow" button.

Fill in the version tag and release description (optional), then click on the "Run workflow" button to start the release process.

The workflow will create a 7z archive of your mod and create a new GitHub release with the specified version tag and description, attaching the archive to the release.
