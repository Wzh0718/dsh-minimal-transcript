import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const clientSource = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')

test('minimal mode hides only the thinking child, not the whole assistant step', () => {
  assert.match(
    clientSource,
    /\[data-chat-flow-kind="assistant-step"\]\s+\[data-variant="think"\]/,
  )
  assert.doesNotMatch(
    clientSource,
    /\[data-chat-flow-kind="assistant-step"\]:has\(\[data-variant="think"\]\)/,
  )
})
