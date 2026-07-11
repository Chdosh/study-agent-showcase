import './architecture.css'

const dataFlowNodes = [
  { id: 'goal', label: 'Goal', desc: '学习目标' },
  { id: 'roadmap', label: 'Roadmap', desc: '长期路线图' },
  { id: 'daily-guide', label: 'Daily Guide', desc: '每日学习指南' },
  { id: 'session', label: 'Session', desc: '学习会话' },
  { id: 'submission', label: 'Submission', desc: '提交总结' },
  { id: 'evaluation', label: 'Evaluation', desc: 'AI 评估' },
  { id: 'knowledge', label: 'Knowledge', desc: '知识库' },
  { id: 'review', label: 'Review', desc: '复盘' },
  { id: 'rolling-plan', label: 'Rolling Plan', desc: '滚动计划' },
]

const principles = [
  {
    title: 'LLM 无状态',
    desc: '大语言模型本身不保存任何上下文。每次调用都是独立的，必须显式传入所有必要信息。应用负责构建每次调用所需的完整上下文。',
  },
  {
    title: '应用保存持久状态',
    desc: '所有学习目标、计划、提交、评估和知识卡片都持久化在本地 SQLite 数据库中。应用重启后可完整恢复学习状态。',
  },
  {
    title: 'Schema Guard',
    desc: 'AI 输出必须通过 Zod schema 校验。校验失败时进行 repair 重试，仍失败则标记为异常，不会破坏业务状态。',
  },
  {
    title: 'Human-in-the-loop',
    desc: 'AI 只能提出建议（Proposal），不能直接修改正式计划。用户确认后才会事务性应用变更，确保学习方向由人掌控。',
  },
  {
    title: '在线版与桌面版边界',
    desc: '在线版是静态展示站点，使用 Mock 数据和 localStorage。完整学习功能需要桌面版（Electron），它拥有本地文件、SQLite 和完整 AI 调用能力。',
  },
]

const techStack = [
  { category: '框架', items: ['Electron', 'React', 'TypeScript'] },
  { category: '数据', items: ['SQLite', 'Drizzle ORM', 'Zod'] },
  { category: 'AI', items: ['OpenAI-compatible API', 'DeepSeek'] },
  { category: '测试', items: ['Vitest', 'Playwright'] },
]

function Architecture() {
  return (
    <div className="architecture">
      <h1 className="page-title">系统架构</h1>
      <p className="page-desc">Study Agent 如何将无状态的 LLM 包装为可靠的学习运行时。</p>

      <section className="section">
        <h2 className="section-title">数据流</h2>
        <p className="section-desc">学习数据在系统中的流转路径，从目标设定到计划迭代。</p>
        <div className="data-flow">
          {dataFlowNodes.map((node, index) => (
            <div key={node.id} className="flow-row">
              <div className="flow-node">
                <span className="flow-node-label">{node.label}</span>
                <span className="flow-node-desc">{node.desc}</span>
              </div>
              {index < dataFlowNodes.length - 1 && (
                <div className="flow-arrow">
                  <span className="flow-arrow-line" />
                  <span className="flow-arrow-head">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">核心原则</h2>
        <div className="principle-grid">
          {principles.map((p) => (
            <div key={p.title} className="principle-card">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">技术栈</h2>
        <div className="tech-grid">
          {techStack.map((group) => (
            <div key={group.category} className="tech-group">
              <h3 className="tech-category">{group.category}</h3>
              <ul className="tech-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">持久化层</h2>
        <p className="section-desc">应用使用 SQLite 作为唯一事实源（durable source of truth）。</p>
        <div className="persist-layer">
          <div className="persist-box">
            <h3>运行时状态</h3>
            <ul>
              <li>当前激活的学习日</li>
              <li>Session 指针</li>
              <li>生成锁</li>
            </ul>
          </div>
          <div className="persist-box">
            <h3>学习数据</h3>
            <ul>
              <li>目标与画像</li>
              <li>Roadmap / Short Plan</li>
              <li>Daily Guide / Tasks</li>
              <li>Submissions / Evaluations</li>
              <li>Knowledge Items</li>
            </ul>
          </div>
          <div className="persist-box">
            <h3>审计记录</h3>
            <ul>
              <li>计划版本快照</li>
              <li>AI 调用日志</li>
              <li>变更来源追踪</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Architecture
