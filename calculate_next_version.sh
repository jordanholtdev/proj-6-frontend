#!/bin/bash

# Get the latest tag from the specified branch
branch=$1
latest_tag=$(git tag --list "${branch}-*" | sort -V | tail -n1)

# Extract the major, minor and patch versions from the tag
# Extract the major, minor, and patch versions from the tag
if [[ -n "$latest_tag" ]]; then
  tag_parts=(${latest_tag//-/ })
  version_part=${tag_parts[1]}
  version_parts=(${version_part//./ })
  major=${version_parts[0]}
  minor=${version_parts[1]}
  patch=${version_parts[2]}
else
  major=0
  minor=0
  patch=0
fi

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
next_version="${branch}-${major}.${minor}.${patch}"

echo $next_version
