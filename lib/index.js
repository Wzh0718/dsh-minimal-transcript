/** DSH 0.1.1-rc.2 host registration for the Minimal transcript plugin. */

/** Plugin identifier used by the Loader and client module table. */
export const name = 'dsh-minimal-transcript'

/** Host services required by this client-only contribution. */
export const inject = []

/**
 * Loads the client-only presentation contribution.
 * @param _ctx - DSH host context.
 */
export function apply(_ctx) {
  // 客户端入口负责注册浏览器槽位；宿主入口保持为空以兼容旧版 Loader。
}
