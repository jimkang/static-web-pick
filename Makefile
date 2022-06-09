pushall:
	git push origin main
	npm publish

try:
	rm -rf testbed/output/*
	node static-web-pick.js testbed/test-config.js testbed/meta testbed/ids.json

try-anoited:
	# Don't delete anoited-testbed/output/meta - this relies on last-page.txt being there.
	rm -rf anoited-testbed/output/*
	node static-web-pick.js anoited-testbed/anoited-config.js anoited-testbed/meta anoited-testbed/ids.json
