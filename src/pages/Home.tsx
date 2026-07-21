import { Link } from 'react-router-dom'
import './home.css'

const capabilities = [
  {
    index: '01',
    title: 'Guarded LLM Workflow',
    desc: 'JSON Mode、Zod 校验、受约束修复与人工确认，让模型建议不能越权改状态。',
  },
  {
    index: '02',
    title: 'Durable State',
    desc: '用 SQLite 保存目标、计划、Session、提交和评价，重启后从正式状态恢复。',
  },
  {
    index: '03',
    title: 'Recoverable Workflow',
    desc: '把失败、重试、幂等和事务纳入主流程，而不是只处理成功路径。',
  },
  {
    index: '04',
    title: 'AI 辅助工程实践',
    desc: '独立完成需求拆解、交互、模型接入、数据持久化、测试与持续迭代。',
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
          陈东升 · 2026 应届 · 计算机科学与技术
        </div>
        <div className="hero-grid">
          <h1>AI 应用<br /><em>开发工程师。</em></h1>
          <div className="hero-intro">
            <p>独立开发本地优先的长周期学习 Agent，重点实践结构化 LLM Workflow、持久状态、异常恢复与可验证执行闭环。</p>
            <div className="hero-actions">
              <Link to="/demo" className="button button-primary">查看核心项目 <span>↗</span></Link>
              <a href="mailto:cdongs@outlook.com" className="text-link">联系我 <span>↗</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="home-evidence" aria-label="Study Agent 真实运行证据">
        <div className="evidence-heading"><span>VERIFIED SNAPSHOT</span><p>Study Agent 当前本地开发库快照 · 2026-07-21</p></div>
        <div className="evidence-grid">
          <article><strong>60</strong><span>Focus Session</span><small>数据库 study_sessions 总记录数</small></article>
          <article><strong>136</strong><span>完成 Action</span><small>daily_guide_actions.status = done</small></article>
          <article><strong>42</strong><span>AI 调用记录</span><small>含 Token、延迟、错误分类与 Trace ID</small></article>
          <article><strong>101</strong><span>本次测试通过</span><small>npm test 实际执行；6 项真实 API 契约测试跳过</small></article>
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
            <p className="project-lead">不是一次性生成计划，而是持续保存状态并根据执行结果推进。</p>
            <p className="project-description">Electron + React 桌面应用。SQLite 是长期状态源，模型输出经过 JSON Mode、Zod 校验与受约束修复；计划变更需确认，评价事务支持失败恢复与幂等推进。</p>
            <div className="project-links"><Link to="/demo">查看工程证据 <span>↗</span></Link><a href="https://github.com/Chdosh/Study_plugin" target="_blank" rel="noreferrer">查看代码 <span>↗</span></a></div>
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
          <h2>把模型能力纳入<br />可验证的应用流程</h2>
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
        <p>南京理工大学紫金学院计算机科学与技术专业。能够独立完成需求拆解、交互实现、模型接入、本地数据持久化和核心流程测试。</p>
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
