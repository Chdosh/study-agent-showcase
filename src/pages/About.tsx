import { Link } from 'react-router-dom'
import './about.css'

function About() {
  return (
    <div className="about-page">
      <header className="about-hero">
        <span>ABOUT / 关于我</span>
        <h1>在产品想法与<br />工程现实之间工作。</h1>
      </header>
      <div className="about-layout">
        <aside>独立开发者<br />AI 产品工程</aside>
        <div className="about-copy">
          <p className="about-lead">我关注 AI 应用、本地优先软件和复杂产品原型，享受从模糊需求中梳理系统边界，再把它做成可运行产品的过程。</p>
          <p>Study Agent 是目前最完整的实践：它不只是一个调用模型的界面，而是尝试用持久状态、结构化校验和人工确认机制，让 AI 真正进入长期、可靠的个人工作流。</p>
          <p>这个网站也是我的持续作品档案。项目内容会占主要部分，同时记录我在产品定义、架构设计和界面实现上的方法。</p>
        </div>
      </div>
      <section className="principles-list">
        <h2>工作原则</h2>
        <div><span>01</span><h3>先澄清真实问题</h3><p>不急着堆功能，先确认用户真正需要完成什么。</p></div>
        <div><span>02</span><h3>让复杂度有边界</h3><p>明确状态、数据和异常路径，让系统可以被理解和维护。</p></div>
        <div><span>03</span><h3>尽快做出可用版本</h3><p>用真实交互验证判断，再基于证据继续迭代。</p></div>
      </section>
      <section className="about-cta">
        <p>从旗舰项目开始了解我的工作。</p>
        <Link to="/demo" className="button button-primary">体验 Study Agent Demo <span>↗</span></Link>
      </section>
    </div>
  )
}

export default About
