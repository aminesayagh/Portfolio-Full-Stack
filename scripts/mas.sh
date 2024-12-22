#!/bin/bash

echo "🚀 Generating Next.js project documentation..."

IGNORE_FILES="node_modules|dist|.next|package-lock.json|pnpm-lock.yaml"

# Document configuration files
echo "📝 Documenting configuration files..."
mas doc \
  --pattern "\.(js|json|config.js|mjs|config.ts)$|next.config.js|knip.ts|.eslintrc.json" \
  --exclude "$IGNORE_FILES" \
  --output "docs/config-docs.md" \
  --compress false

# Document TypeScript source files
echo "📘 Documenting TypeScript source code..."
mas doc \
  --pattern "(src|pages|components|conf|helpers|hook|lib|styles|utils)/.*\.tsx?$" \
  --exclude "$IGNORE_FILES" \
  --output "docs/src-docs.md" \
  --compress false

# List all configuration files
echo "📜 Listing configuration files..."
mas list --all | grep -E "\.(js|json|config.js)$"


echo "🌳 Generating Next.js project tree structure..."

# Generate tree structure with specific ignores
TREE_OUTPUT=$(tree -a -I 'node_modules|.git|.next|dist|.turbo|.cache|.vercel|coverage' \
     --dirsfirst \
     --charset=ascii)

{
  echo "# Project Tree Structure"
  echo "\`\`\`plaintext"
  echo "$TREE_OUTPUT"
  echo "\`\`\`"
} > docs/project-tree.md

echo "✨ Tree structure generated in docs/project-tree.md"

echo "✨ Documentation generation complete! Check the following files:"
echo "- config-docs.md: Configuration files documentation"
echo "- src-docs.md: Source code documentation"
echo "- routes-docs.md: Pages and app router documentation"
echo "- api-docs.md: API routes documentation"