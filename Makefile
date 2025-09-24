run:
	chmod +x entrypoint.sh && docker compose up --build --force-recreate

run-detached:
	chmod +x entrypoint.sh && docker compose up -d --build --force-recreate

%:
	@:
