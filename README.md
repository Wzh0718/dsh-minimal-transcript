# dsh-minimal-transcript

A client-only DSH Web plugin for **DSH 0.1.1-rc.2**.

It adds a compact **execution-graph icon** to the session header. Clicking the icon hides or shows thinking, tool-call, and Turn-process presentation. The header does not display a text label; the icon remains keyboard-accessible with an accessible name and tooltip. It changes only browser rendering; Session events, tool execution, persistence, and model requests are untouched.

## Install

From the plugin's GitHub repository:

```bash
dsh plugin --profile web add github:Wzh0718/dsh-minimal-transcript
```

Then refresh the existing Web page. The session header contains an execution-graph icon; hover or focus it for the accessible label. The selected state is stored in browser `localStorage` under `dsh-minimal-transcript.mode`.

### If DSH appears stuck

Do not start a second `dsh web` process while an existing Web process is still running. DSH 0.1.1-rc.2 plugins such as the task board use a process lock; the second process can fail with `task-board ledger is already owned by process ...`. Stop the existing Web process first, then start it once. If the DSH plugin manager reports that agents are running, wait for active agents to finish before changing the plugin.

## Compatibility

This package targets DSH `0.1.1-rc.2` and uses the `conversation.session.header.actions` slot shipped by that release. It does not depend on `@deepseek-ai/dsh-client-ui-chat`, which was introduced after that release.

## Official ecosystem discovery

This is a community plugin, not bundled into the DSH core distribution. The repository is tagged with the `dsh-plugin`, `deepseek-harness`, and `dsh` GitHub topics so it can be found by DSH plugin directories and community catalogs. To request listing in an official DSH community plugin discussion, share this repository together with the install command above; the plugin must remain explicitly labeled as third-party.

## Files

- `lib/index.js` — host Loader entry.
- `lib/client.js` — browser slot contribution and presentation CSS.
- `cordis.patch.yml` — profile bundle mount.
