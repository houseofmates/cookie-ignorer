# PostHog post-wizard report

The wizard has completed a deep integration of your project. PostHog analytics has been added to the two Node.js CLI tools in the `tools/` directory. A shared PostHog client module (`tools/posthog.js`) was created using the `posthog-node` SDK, configured for short-lived CLI processes with `flushAt: 1` and `flushInterval: 0` to send events immediately. Each tool captures relevant events with contextual properties and calls `posthog.shutdown()` before exiting. Exception tracking (`captureException`) was added to error paths in `tools/add-rule.js`. The distinct ID is derived from `os.hostname()` to identify the contributing machine.

| Event | Description | File |
|-------|-------------|------|
| `rule_added` | A new domain rule was successfully added to `rules.js` via the add-rule CLI tool | `tools/add-rule.js` |
| `rule_replaced` | An existing domain rule was replaced in `rules.js` via the add-rule CLI tool | `tools/add-rule.js` |
| `block_rules_generated` | Declarative net request block rules were generated for Manifest V3 from the existing block URL rules | `tools/generate-block-rules.js` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1649048)
- [Rules added over time](/insights/7LNH6qtI)
- [Rules replaced over time](/insights/BK8OmhTX)
- [Rule operations: added vs replaced](/insights/wfkpsJ0H)
- [Block rules generated](/insights/YDQKu64i)
- [Average block rules count per generation](/insights/HyLr4wjI)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
