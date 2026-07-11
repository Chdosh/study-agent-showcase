import { Link } from 'react-router-dom'
import './home.css'

const entries = [
  {
    path: '/demo',
    title: '在线体验',
    desc: '基于 Mock 数据的模拟演示流程',
  },
  {
    path: '/architecture',
    title: '技术架构',
    desc: 'Agent 数据流、本地优先与 Schema Guard',
  },
  {
    path: '/desktop-app',
    title: '桌面版',
    desc: '完整版 Electron 应用功能介绍',
  },
]

const capabilities = [
  {
    title: '目标澄清',
    desc: '通过对话引导明确学习目标，生成结构化的学习画像',
  },
  {
    title: '分层计划',
    desc: '将长期目标分解为 Roadmap、Short Plan 和每日任务',
  },
  {
    title: '学习闭环',
    desc: '执行、记录、提交、评价、复盘的可恢复流程',
  },
  {
    title: '知识库',
    desc: '自动从提交中提取误区、薄弱点和洞察，形成证据链',
  },
  {
    title: '计划迭代',
    desc: '基于学习数据提出计划调整建议，确认后事务性生效',
  },
]

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">把 AI 包装成可靠的学习运行时</h1>
        <p className="hero-tagline">
          Study Agent 是本地优先的 Windows 桌面 AI 学习系统，将无状态、概率性的 LLM 转化为确定、可持久化、可校验、可恢复的个人学习教师。
        </p>
      </section>

      <section className="entries">
        <h2 className="section-title">快速入口</h2>
        <div className="entry-grid">
          {entries.map((entry) => (
            <Link key={entry.path} to={entry.path} className="entry-card">
              <h3 className="entry-title">{entry.title}</h3>
              <p className="entry-desc">{entry.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="capabilities">
        <h2 className="section-title">核心能力</h2>
        <div className="capability-grid">
          {capabilities.map((cap) => (
            <div key={cap.title} className="capability-card">
              <h3 className="capability-title">{cap.title}</h3>
              <p className="capability-desc">{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="disclaimer">
        <h2 className="disclaimer-title">在线版安全声明</h2>
        <ul className="disclaimer-list">
          <li>此站点为静态展示，不接入真实大模型，所有 Demo 数据均为 Mock</li>
          <li>不收集用户输入、不存储真实学习数据到云端</li>
          <li>完整版应用运行于本地 Electron 环境，数据持久化于本机 SQLite</li>
          <li>在线版仅用于功能介绍和演示，不提供完整学习服务</li>
        </ul>
      </section>
    </div>
  )
}

export default Home
