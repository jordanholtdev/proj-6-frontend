#!/bin/bash

# Merge the dev branch the feature branch into the dev branch
git checkout dev
git merge "$1"

# Create an annotated tag on the dev branch
version=$(git describe --tags --abbrev=0)
next_version=$(./calculate_next_version.sh "$version")
git tag -a "$next_version-dev" -m "$(git log --pretty=format:'- %s' "$version"...HEAD --no-merges)"

# Push the tag to the remote repository
git push origin "$next_version-dev"

# Create a release using the GitHub CLI
gh release create "$next_version-dev" --title "$next_version-dev" --generate-notes

