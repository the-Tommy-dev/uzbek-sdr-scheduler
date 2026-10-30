# Tradehouse scheduled checks

This repository contains only a small scheduler for a separately hosted application.

It invokes two fixed HTTPS endpoints every five minutes on a best-effort basis. Source code, business data and API response bodies are not published here. The dedicated worker credential is stored as an encrypted Actions secret. Logs show HTTP statuses only. The workflow performs no checkout and has no repository write permissions.

Set `SDR_HOSTED_ENABLED=false` in repository Actions variables to pause scheduled checks. Keep `SDR_WORKER_SECRET` only in Actions secrets. Never put it into source or a URL.

GitHub may delay cron jobs. Actual application execution/queue status is tracked inside the private application's operator dashboard. Free standard-runner usage for public repositories is documented in [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).
