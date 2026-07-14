import { Link } from 'react-router-dom'
import './home.css'

const capabilities = [
  {
    index: '01',
    title: 'AI 应用工程',
    desc: '把不确定的模型输出包装成可校验、可恢复的产品流程。',
  },
  {
    index: '02',
    title: '本地优先架构',
    desc: '关注数据所有权、离线能力与可靠的本地持久化。',
  },
  {
    index: '03',
    title: '产品原型实现',
    desc: '从需求、交互到前端落地，快速构建可验证的完整体验。',
  },
  {
    index: '04',
    title: '系统化设计',
    desc: '用清晰的数据流、状态边界和异常路径支撑长期演进。',
  },
]

const futureProjects = [
  {
    number: '02',
    path: '/demo2',
    title: 'AI Learning Copilot',
    type: 'Python Desktop · 2026',
    description: '一键截图、OCR 识别、AI 翻译解释，并自动沉淀为个人知识库。',
    status: '已发布',
  },
  {
    number: '03',
    path: '/demo3',
    title: 'Image to PowerPoint',
    type: 'Codex Workflow · 2026',
    description: '将学术架构图和复杂信息图，转换为大部分内容可编辑的 PowerPoint。',
    status: '已发布',
  },
]

function Home() {
  return (
    <div className="portfolio-home">
      <section className="portfolio-hero">
        <div className="hero-kicker">
          <span className="status-dot" />
          独立开发者 · AI 产品工程
        </div>
        <div className="hero-grid">
          <h1>构建真正能用的<br /><em>AI 产品。</em></h1>
          <div className="hero-intro">
            <p>我关注 AI 应用、本地优先软件与复杂产品原型，把模糊想法变成结构清晰、可以运行的产品。</p>
            <div className="hero-actions">
              <a href="#selected-work" className="button button-primary">查看项目 <span>↓</span></a>
              <Link to="/about" className="text-link">了解我的工作方式 <span>↗</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="work-section" id="selected-work">
        <div className="section-heading">
          <span>01 / SELECTED WORK</span>
          <h2>重点项目</h2>
        </div>
        <article className="featured-project">
          <div className="project-copy">
            <div className="project-meta">
              <span>旗舰项目 · 2026</span>
              <span>Electron / React / SQLite / LLM</span>
            </div>
            <h3>Study Agent</h3>
            <p className="project-lead">把概率性的 LLM，包装成可靠的个人学习运行时。</p>
            <p className="project-description">一个本地优先的 Windows 桌面学习系统。它通过结构化状态、Schema Guard 与 Human-in-the-loop 机制，让目标、计划、执行、评估和复盘形成可持续的学习闭环。</p>
            <div className="project-links"><Link to="/demo">查看完整项目 <span>↗</span></Link></div>
          </div>
          <div className="project-visual" aria-label="Study Agent 界面概念图">
            <div className="visual-window">
              <div className="visual-bar"><i /><i /><i /><span>study-agent / today</span></div>
              <div className="visual-body">
                <aside>
                  <b>SA</b>
                  <span className="active" />
                  <span />
                  <span />
                  <span />
                </aside>
                <div className="visual-content">
                  <small>DAY 12 · PYTHON DATA</small>
                  <h4>今天的学习任务</h4>
                  <div className="task-line task-line-primary"><i>01</i><span><b>清洗缺失数据</b><small>理解 dropna 与 fillna 的差异</small></span><em>45 min</em></div>
                  <div className="task-line"><i>02</i><span><b>完成数据练习</b><small>使用真实样例验证处理结果</small></span><em>60 min</em></div>
                  <div className="progress-row"><span>本周进度</span><div><i /></div><b>68%</b></div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="future-project-grid">
          {futureProjects.map((project) => (
            <Link className="future-project" key={project.number} to={project.path}>
              <div className="future-project-meta">
                <span>{project.number} / SELECTED WORK</span>
                <em>{project.status}</em>
              </div>
              <div>
                <small>{project.type}</small>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <span className="future-project-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="capability-section">
        <div className="section-heading">
          <span>02 / CAPABILITIES</span>
          <h2>我擅长把复杂问题<br />变成清晰系统</h2>
        </div>
        <div className="capability-list">
          {capabilities.map((cap) => (
            <article key={cap.title}>
              <span>{cap.index}</span>
              <h3>{cap.title}</h3>
              <p>{cap.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-strip">
        <span className="about-label">03 / ABOUT</span>
        <p>我喜欢处理产品与工程之间那些“不够清楚”的问题：梳理边界、建立可靠的数据流，再用简单直接的界面把系统能力呈现出来。</p>
        <Link to="/about" className="text-link">更多关于我 <span>↗</span></Link>
      </section>

      <section className="site-note">
        <div><span className="status-dot" /><strong>关于这个在线版本</strong></div>
        <p>这是静态作品展示，不接入真实模型、不收集用户数据。在线流程使用模拟内容还原真实桌面软件；完整产品运行在本地环境。</p>
      </section>
    </div>
  )
}

export default Home
