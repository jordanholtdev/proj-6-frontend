#!/bin/bash

# Get the latest tag from the specified branch
branch=$1
latest_tag=$(git describe --tags --abbrev=0 $(git rev-list --tags --max-count=1 --skip=1 "$branch"))

# Extract the major, minor and patch versions from the tag
major=$(echo $latest_tag | cut -d. -f1)
minor=$(echo $latest_tag | cut -d. -f2)
patch=$(echo $latest_tag | cut -d. -f3)

# Determine the next version based on the versioning strategy
# If the strategy is "major", increment the major version
# If the strategy is "minor", increment the minor version
# If the strategy is "patch", increment the patch version
# If the strategy is "auto", increment the patch version
# If the strategy is "none", do not increment the version
if [ "$VERSIONING_STRATEGY" == "major" ]; then
  major=$((major + 1))
  minor=0
  patch=0
elif [ "$VERSIONING_STRATEGY" == "minor" ]; then
  minor=$((minor + 1))
  patch=0
elif [ "$VERSIONING_STRATEGY" == "patch" ]; then
  patch=$((patch + 1))
elif [ "$VERSIONING_STRATEGY" == "auto" ]; then
  patch=$((patch + 1))
elif [ "$VERSIONING_STRATEGY" == "none" ]; then
  patch=$patch
else
  echo "Invalid versioning strategy. Must be one of: major, minor, patch, auto, none"
  exit 1
fi

# Set the next version
next_version="$major.$minor.$patch"

echo "$next_version"
