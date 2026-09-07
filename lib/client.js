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
        'html[data-dsh-transcript-mode="minimal"] [data-chat-flow-kind="assistant-step"]:has([data-variant="think"])',
      ].join(',') + '{display:none!important;}'
      document.head.appendChild(style)
    }

    /** 返回当前浏览器语言对应的按钮文案。 */
    function labels(mode) {
      const chinese = document.documentElement.lang.toLowerCase().startsWith('zh')
      if (chinese) return mode === 'minimal' ? ['显示执行过程', '已隐藏执行过程'] : ['隐藏执行过程', '已显示执行过程']
      return mode === 'minimal' ? ['Show process', 'Process hidden'] : ['Hide process', 'Process shown']
    }

    /** 渲染并切换 Minimal/Normal 显示模式按钮。 */
    function DisplayModeAction() {
      const [mode, setMode] = React.useState(readMode)
      React.useEffect(() => {
        installStyle()
        writeMode(mode)
      }, [mode])
      const copy = labels(mode)
      return React.createElement('button', {
        type: 'button',
        'aria-pressed': mode === 'minimal',
        'aria-label': copy[1],
        title: copy[1],
        onClick: () => setMode(mode === 'minimal' ? 'normal' : 'minimal'),
        style: {
          border: '0',
          borderRadius: '8px',
          background: 'transparent',
          color: 'inherit',
          cursor: 'pointer',
          font: 'inherit',
          padding: '4px 8px',
        },
      }, copy[0])
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
