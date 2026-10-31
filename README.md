# Tradehouse cloud scheduler

Only the scheduler workflow and its tiny HTTP polling script are public. Application source, database, company data and credentials remain private.

A job ticks collection and the workflow independently every five minutes for 66 ticks (about 5h25m). Repository concurrency permits one active job and one pending replacement. Scheduled launches are best effort: GitHub can delay/drop cron events. A pending replacement starts after the active session finishes; there can still be a restart gap or platform outage. Manual workflow dispatch can start recovery.

The encrypted worker secret is supplied only as an Actions secret. Logs contain endpoint status and a private worker receipt identifier, never response bodies or credentials. No third-party actions beyond checkout are used. The application enforces durable request caches and daily spend limits. Polling failure does not immediately repeat an ambiguous request.
