install:
	npm ci

publish:
	npm publish --dry-run

run:
	bin/gendiff.js

lint:
	npx eslint .