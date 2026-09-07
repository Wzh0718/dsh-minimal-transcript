# dsh-minimal-transcript

A client-only DSH Web plugin for **DSH 0.1.1-rc.2**.

It adds a session-header switch that hides or shows thinking, tool-call, and Turn-process presentation. It changes only browser rendering; Session events, tool execution, persistence, and model requests are untouched.

## Install

From the plugin's GitHub repository:

```bash
dsh plugin --profile web add github:Wzh0718/dsh-minimal-transcript
```

Then refresh the existing Web page. The session header contains **Show process** / **Hide process**. The selected state is stored in browser `localStorage` under `dsh-minimal-transcript.mode`.

## Compatibility

This package targets DSH `0.1.1-rc.2` and uses the `conversation.session.header.actions` slot shipped by that release. It does not depend on `@deepseek-ai/dsh-client-ui-chat`, which was introduced after that release.

## Files

- `lib/index.js` — host Loader entry.
- `lib/client.js` — browser slot contribution and presentation CSS.
- `cordis.patch.yml` — profile bundle mount.
