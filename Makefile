run:
	chmod +x entrypoint.sh && docker compose up --build --force-recreate --renew-anon-volumes

run-detached:
	chmod +x entrypoint.sh && docker compose up -d --build --force-recreate

%:
	@:
