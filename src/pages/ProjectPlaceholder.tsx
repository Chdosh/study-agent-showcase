import { Link } from 'react-router-dom'
import './project-placeholder.css'

function ProjectPlaceholder({ number }: { number: '02' | '03' }) {
  return (
    <div className="project-placeholder-page">
      <header>
        <span>PROJECT {number} / RESERVED</span>
        <h1>这个项目位置<br />已经准备好了。</h1>
        <p>后续可以在这里放项目背景、核心价值、产品流程、技术架构和真实界面。页面结构会沿用 Study Agent 的完整项目案例形式。</p>
      </header>
      <section>
        <div><span>01</span><strong>项目说明</strong><small>它解决什么问题，为什么值得做</small></div>
        <div><span>02</span><strong>产品流程</strong><small>真实使用过程与关键界面</small></div>
        <div><span>03</span><strong>技术实现</strong><small>架构、技术栈和关键决策</small></div>
      </section>
      <Link to="/" className="button button-primary">返回全部项目 <span>←</span></Link>
    </div>
  )
}

export default ProjectPlaceholder
