# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Rails 8.1 tutorial app for Turbo caching (Hotwire). Fresh scaffold — no models/controllers beyond Rails defaults yet. Ruby 3.4.5.

Stack: Propshaft (assets), importmap-rails (JS, no bundler), SQLite3, Puma, turbo-rails + stimulus-rails, Solid Cache/Queue/Cable (database-backed — no Redis), Kamal + Thruster for deploy.

## Commands

- `bin/rails server` — dev server
- `bin/rails console` — console
- `bin/rails test` — run tests
- `bin/rails test TEST=path/to/test.rb` — single test file; append `NAME=test_name` for single test
- `bin/rails test:system` — system tests (Capybara/Selenium); screenshots in `tmp/screenshots` on failure
- `bin/rails db:test:prepare test` — prepare DB + run tests (what CI does)
- `bin/rubocop` — lint (rubocop-rails-omakase style, see .rubocop.yml)
- `bin/brakeman` — security scan
- `bin/bundler-audit` — gem vulnerability scan
- `bin/importmap audit` — JS dependency audit

## CI (.github/workflows/ci.yml)

Runs on PR and push to main: brakeman, bundler-audit, importmap audit, rubocop, tests, system tests. Run lint + tests locally before pushing.

## Architecture notes

- JavaScript via import maps — pin new packages with `bin/importmap pin <pkg>`, no node_modules or build step. Stimulus controllers live in `app/javascript/controllers/`, auto-registered by `index.js`.
- Rails.cache, Active Job, and Action Cable are backed by Solid Cache/Queue/Cable (SQLite/production database) — do not introduce Redis.
- Health check endpoint: `GET /up`.
- Environments load Solid adapters via `config/cache.yml`, `config/queue.yml`, `config/cable.yml`.
