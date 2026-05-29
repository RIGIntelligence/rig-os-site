.PHONY: smoke help

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  smoke   Run deterministic smoke checks (no network, no secrets needed)"
	@echo "  help    Show this help"

smoke:
	@echo "=== rig-os-site smoke check ==="; \
	STATUS=ok; \
	echo "--- Required files ---"; \
	for f in index.html README.md cli/manifest.json mcp/manifest.json bin/rig-os-site install.sh; do \
	  if test -f "$$f"; then echo "$$f: ok"; else echo "$$f: MISSING"; STATUS=fail; fi; \
	done; \
	echo "--- HTML pages ---"; \
	find . -name "*.html" -not -path "./.git/*" | sort | sed 's|^\./||' | while read f; do echo "  $$f"; done; \
	echo "--- CLI manifest schema ---"; \
	python3 -c "import json; d=json.load(open('cli/manifest.json')); print('  schema:', d.get('schema','MISSING')); print('  command:', d.get('command','MISSING')); print('  status:', d.get('status','MISSING'))"; \
	echo "--- MCP manifest schema ---"; \
	python3 -c "import json; d=json.load(open('mcp/manifest.json')); print('  schema:', d.get('schema','MISSING')); print('  status:', d.get('status','MISSING')); print('  tools:', len(d.get('tools',[])))"; \
	echo "--- smoke check DONE ---"; \
	if [ "$$STATUS" = "fail" ]; then echo "RESULT: FAIL (missing files)"; exit 1; else echo "RESULT: PASS"; fi
