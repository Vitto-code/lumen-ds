# Atalhos padronizados. Todos tem equivalente direto em npm scripts,
# entao o Make e opcional (no Windows, use os comandos npm do README).

.PHONY: setup build test lint run clean

setup:
	npm install

build:
	npm run build

test:
	npm run test:coverage

lint:
	npm run lint

run: build
	docker compose up demo

clean:
	rm -rf dist coverage
