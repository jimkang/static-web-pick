pushall:
	git push origin main
	npm publish

try:
	rm -rf testbed/output/*
	node static-web-pick.js testbed/test-config.js testbed/meta testbed/ids.json
