import { Link } from 'react-router-dom'
import './about.css'

const skills = [
  ['AI 应用', 'LLM API、Prompt、结构化输出、上下文组装、多阶段 Workflow 与失败修复。'],
  ['桌面软件', 'React、Electron、PySide6，以及 preload / IPC 等桌面应用边界。'],
  ['本地数据', 'SQLite、Drizzle、迁移、事务、状态持久化与 FTS5 全文检索。'],
  ['工程验证', 'Vitest、Pytest、TypeScript 类型检查、构建、日志与问题排查。'],
]

const projects = [
  { number: '01', title: 'Study Agent', description: '本地优先的长周期学习 Agent。重点解决结构化 LLM Workflow、持久状态、失败恢复与计划确认。', path: '/demo', meta: 'Electron · React · SQLite' },
  { number: '02', title: 'AI Learning Copilot', description: '将截图、OCR、AI 解释、术语提取和历史记录串成轻量桌面学习工具。', path: '/demo2', meta: 'Python · PySide6 · Tesseract' },
  { number: '03', title: 'Image to PowerPoint', description: '把学术图和复杂信息图转换为大部分内容可编辑的 PowerPoint 工作流。', path: '/demo3', meta: 'Codex Workflow · Office Math' },
]

function About() {
  return (
    <div className="about-page">
      <header className="about-hero">
        <span>ABOUT / 关于我</span>
        <div className="about-hero-grid"><div><h1>陈东升</h1><p>AI 应用 · 本地软件 · 工作流工具</p></div><div className="about-contact"><a href="mailto:cdongs@outlook.com">cdongs@outlook.com ↗</a><a href="https://github.com/Chdosh" target="_blank" rel="noreferrer">GitHub / Chdosh ↗</a><span>计算机科学与技术 · 2026 应届</span><span>南京理工大学紫金学院</span></div></div>
      </header>

      <section className="about-profile">
        <span>PROFILE</span>
        <div><p className="about-lead">我喜欢把一个模糊想法逐步整理成有明确状态、数据边界和真实交互的软件。</p><p>目前主要在做 AI 应用、本地优先桌面软件和自动化工作流。相比单次调用模型，我更关心模型输出怎样被校验、保存、恢复，并真正影响后续流程。</p><p>这个网站是我的项目档案。个人介绍只是其中一部分，主要内容仍然是项目本身：它解决什么问题、怎样运行、用了哪些工程机制，以及哪些能力已经实现。</p></div>
      </section>

      <section className="about-projects">
        <div className="about-section-title"><span>01 / PROJECTS</span><h2>正在构建的项目</h2></div>
        <div className="about-project-grid">{projects.map((project) => <Link to={project.path} key={project.number}><span>{project.number}</span><small>{project.meta}</small><h3>{project.title}</h3><p>{project.description}</p><b>查看项目 ↗</b></Link>)}</div>
      </section>

      <section className="about-skills">
        <div className="about-section-title"><span>02 / PRACTICE</span><h2>长期关注的实践方向</h2></div>
        <div className="skills-grid">{skills.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="about-boundary"><div><span>这个网站怎样介绍项目</span><h2>不只展示结果，也说明系统为什么这样设计。</h2></div><p>每个项目页尽量包含真实流程、关键数据、技术边界和失败路径。运行数字来自本地开发库的聚合统计；在线 Demo 使用静态示意内容，不上传数据，也不调用真实模型。</p></section>

      <section className="about-cta"><p>如果你对这些项目、实现过程或合作方向感兴趣，欢迎联系。</p><div><a href="mailto:cdongs@outlook.com" className="button button-primary">发送邮件 <span>↗</span></a><a href="https://github.com/Chdosh" target="_blank" rel="noreferrer" className="about-github">查看 GitHub ↗</a></div></section>
    </div>
  )
}

export default About
