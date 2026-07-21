import { Link } from 'react-router-dom'
import './home.css'

const capabilities = [
  {
    index: '01',
    title: '从想法到可运行版本',
    desc: '自己梳理需求、设计交互、接入模型和数据层，再用真实流程验证结果。',
  },
  {
    index: '02',
    title: '把 AI 放进明确边界',
    desc: '不把可靠性寄托在提示词上，用 Schema、确认流程和错误处理约束模型输出。',
  },
  {
    index: '03',
    title: '重视本地状态与数据',
    desc: '使用 SQLite 保存长期状态，让软件关闭后可以继续，也让过程可以回看和核验。',
  },
  {
    index: '04',
    title: '根据真实使用继续改',
    desc: '关注运行记录、失败路径和自动化测试，而不是只完成一套看起来正确的界面。',
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
          冬生 · 个人网站
        </div>
        <div className="hero-grid">
          <h1>把想法做成，<br /><em>真正能用的工具。</em></h1>
          <div className="hero-intro">
            <p>这里记录我正在完成的 AI 应用、本地桌面软件和自动化工作流，也保留它们从想法到运行过程中遇到的问题与实现细节。</p>
            <div className="hero-actions">
              <a href="#selected-work" className="button button-primary">查看项目 <span>↓</span></a>
              <Link to="/about" className="text-link">关于我 <span>↗</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="capability-section home-strengths">
        <div className="section-heading">
          <span>01 / HOW I WORK</span>
          <div><h2>我处理问题的方式</h2><p>项目类型不同，但我通常会沿着同一条路径推进：先让流程成立，再补状态、异常与验证。</p></div>
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
          <span>02 / SELECTED WORK</span>
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

      <section className="about-strip">
        <span className="about-label">03 / ABOUT</span>
        <p>我喜欢处理那些还不够清楚的问题：先梳理边界和数据流，再用简单直接的界面把它做成可以运行的东西。</p>
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
