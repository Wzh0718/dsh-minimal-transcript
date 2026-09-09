window.__ModuleLoader__.load({
  id: 'dsh-minimal-transcript',
  factory: (require) => {
    const module = { exports: {} }
    const exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
    const React = require('react')

    const inject = ['slots']
    const STORAGE_KEY = 'dsh-minimal-transcript.mode'
    const STYLE_ID = 'dsh-minimal-transcript-style'

    /** 读取本地保存的显示模式，异常时回退到隐藏模式。 */
    function readMode() {
      try {
        const value = window.localStorage.getItem(STORAGE_KEY)
        return value === 'normal' ? 'normal' : 'minimal'
      } catch {
        return 'minimal'
      }
    }

    /** 保存显示模式，并同步页面根节点属性。 */
    function writeMode(mode) {
      try {
        window.localStorage.setItem(STORAGE_KEY, mode)
      } catch {
        // 浏览器禁用存储时仍保留当前页面的显示状态。
      }
      document.documentElement.dataset.dshTranscriptMode = mode
    }

    /** 安装只影响浏览器呈现的隐藏规则。 */
    function installStyle() {
      if (document.getElementById(STYLE_ID) !== null) return
      const style = document.createElement('style')
      style.id = STYLE_ID
      style.textContent = [
        'html[data-dsh-transcript-mode="minimal"] [data-chat-flow-kind="turn-process"]',
        'html[data-dsh-transcript-mode="minimal"] [data-chat-flow-kind="tool-call"]',
        // DSH renders reasoning and the final answer inside the same assistant-step.
        // Hide only the reasoning row; hiding the assistant-step wrapper also hides
        // the user-visible answer text.
        'html[data-dsh-transcript-mode="minimal"] [data-chat-flow-kind="assistant-step"] [data-variant="think"]',
      ].join(',') + '{display:none!important;}'
      document.head.appendChild(style)
    }

    /** 返回当前浏览器语言对应的无障碍名称。 */
    function accessibilityLabel(mode) {
      const chinese = document.documentElement.lang.toLowerCase().startsWith('zh')
      if (chinese) return mode === 'minimal' ? '显示执行流程图' : '隐藏执行流程图'
      return mode === 'minimal' ? 'Show execution graph' : 'Hide execution graph'
    }

    /** 绘制紧凑的执行流程图标，避免在页头显示纯文字。 */
    function ProcessGraphIcon({ active }) {
      return React.createElement('svg', {
        width: 16,
        height: 16,
        viewBox: '0 0 16 16',
        fill: 'none',
        'aria-hidden': 'true',
        focusable: 'false',
      },
      React.createElement('path', {
        d: 'M4 4.25h3.25v3.5H4zM8.75 8.25H12v3.5H8.75zM7.25 6l1.5 2.25M7.25 10h1.5',
        stroke: 'currentColor',
        strokeWidth: 1.25,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      }),
      React.createElement('circle', {
        cx: 4,
        cy: 4.25,
        r: 1.25,
        fill: active ? 'currentColor' : 'none',
        stroke: 'currentColor',
        strokeWidth: 1.25,
      }),
      React.createElement('circle', {
        cx: 12,
        cy: 11.75,
        r: 1.25,
        fill: active ? 'currentColor' : 'none',
        stroke: 'currentColor',
        strokeWidth: 1.25,
      }))
    }

    /** 渲染仅含图表图标的 Minimal/Normal 显示模式按钮。 */
    function DisplayModeAction() {
      const [mode, setMode] = React.useState(readMode)
      React.useEffect(() => {
        installStyle()
        writeMode(mode)
      }, [mode])
      const label = accessibilityLabel(mode)
      return React.createElement('button', {
        type: 'button',
        'aria-pressed': mode === 'minimal',
        'aria-label': label,
        title: label,
        onClick: () => setMode(mode === 'minimal' ? 'normal' : 'minimal'),
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          border: '0',
          borderRadius: '8px',
          background: 'transparent',
          color: 'inherit',
          cursor: 'pointer',
          padding: 0,
        },
      }, React.createElement(ProcessGraphIcon, { active: mode === 'normal' }))
    }

    /** 将切换按钮注册到 DSH 0.1.1-rc.2 的会话头部操作槽。 */
    function apply(ctx) {
      installStyle()
      writeMode(readMode())
      const slots = ctx.get('slots')
      if (slots === undefined) return
      slots.inject('conversation.session.header.actions', () => slots.register({
        name: 'conversation.session.header.actions',
        id: 'dsh-minimal-transcript',
        order: 10,
      }, DisplayModeAction))
    }

    exports.inject = inject
    exports.apply = apply
    return module.exports
  },
})
