#!/bin/bash

# Merge the dev branch into the main branch
git checkout main
git merge dev

# Create an annotated tag on the main branch
version=$(git describe --tags --abbrev=0)
next_version=$(./calculate_next_version.sh "$version")
git tag -a "$next_version" -m "$(git log --pretty=format:'- %s' "$version"...HEAD --no-merges)"

# Push the tag to the remote repository
git push origin "$next_version"

# Create a release using the GitHub CLI
gh release create "$next_version" --title "$next_version" --generate-notes

