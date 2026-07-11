import './desktop-app.css'

const screenshotPlaceholders = [
  { id: 's1', label: '目标设定', desc: '创建学习目标页面' },
  { id: 's2', label: '今日任务', desc: '每日学习任务面板' },
  { id: 's3', label: '学习会话', desc: '沉浸式学习界面' },
  { id: 's4', label: '评估反馈', desc: 'AI 评估与建议' },
  { id: 's5', label: '知识库', desc: '学习知识卡片管理' },
  { id: 's6', label: '复盘回顾', desc: '学习历程时间线' },
]

const techItems = [
  { name: 'Electron', desc: '跨平台桌面应用框架' },
  { name: 'React', desc: '用户界面库' },
  { name: 'TypeScript', desc: '类型安全' },
  { name: 'SQLite', desc: '本地嵌入式数据库' },
  { name: 'Drizzle ORM', desc: '数据库访问层' },
  { name: 'Zod', desc: '运行时 schema 校验' },
  { name: 'DeepSeek API', desc: 'OpenAI 兼容大模型接口' },
]

const limitations = [
  '目前仅支持 Windows 平台',
  'DeepSeek API Key 需用户自行配置',
  '不支持多人协作或云同步',
  '知识库为本地存储，无法跨设备共享',
  '复杂目标的分层计划仍需人工调整',
  'AI 评估质量依赖模型能力，可能存在偏差',
  '不支持移动端',
]

function DesktopApp() {
  return (
    <div className="desktop-app">
      <h1 className="page-title">桌面应用</h1>
      <p className="page-desc">完整的本地学习体验，运行于 Windows 平台的 Electron 应用。</p>

      <section className="section">
        <h2 className="section-title">应用截图</h2>
        <p className="section-desc">以下展示桌面版的主要界面。（截图为占位区域）</p>
        <div className="screenshot-grid">
          {screenshotPlaceholders.map((s) => (
            <div key={s.id} className="screenshot-card">
              <div className="screenshot-placeholder">
                <span className="screenshot-icon">📷</span>
                <span className="screenshot-label">{s.label}</span>
              </div>
              <p className="screenshot-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">视频演示</h2>
        <div className="video-placeholder">
          <span className="video-icon">▶</span>
          <span className="video-label">演示视频（待添加）</span>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">技术栈</h2>
        <div className="tech-list">
          {techItems.map((tech) => (
            <div key={tech.name} className="tech-item">
              <span className="tech-name">{tech.name}</span>
              <span className="tech-desc">{tech.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">系统要求</h2>
        <ul className="req-list">
          <li>Windows 10/11 64-bit</li>
          <li>4GB 以上内存</li>
          <li>DeepSeek API Key（用户自行配置）</li>
          <li>首次启动需联网，后续可离线使用</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">已知限制</h2>
        <ul className="limitation-list">
          {limitations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">获取方式</h2>
        <p className="section-desc">
          桌面版目前处于开发阶段。构建产物可查看 <code className="code">study_plugin</code> 项目的 release 目录。
        </p>
      </section>
    </div>
  )
}

export default DesktopApp
