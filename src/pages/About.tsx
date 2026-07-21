import { Link } from 'react-router-dom'
import './about.css'

const skills = [
  ['AI 应用开发', 'LLM API 接入、Prompt 设计、JSON Mode、Zod 结构校验、上下文组装、多阶段 Workflow、异常分类与输出修复'],
  ['应用工程', 'TypeScript、JavaScript、Node.js、React、Electron、Python、preload / IPC'],
  ['数据与状态', 'SQLite、Drizzle、迁移、CRUD、事务、状态持久化、FTS5 全文检索，MySQL 基础'],
  ['验证与交付', 'Vitest、Pytest、TypeScript 类型检查、Git、Linux、应用构建与问题排查'],
]

function About() {
  return (
    <div className="about-page">
      <header className="about-hero">
        <span>ABOUT / 关于我</span>
        <div className="about-hero-grid"><div><h1>陈东升</h1><p>AI 应用开发工程师</p></div><div className="about-contact"><a href="mailto:cdongs@outlook.com">cdongs@outlook.com ↗</a><a href="https://github.com/Chdosh" target="_blank" rel="noreferrer">GitHub / Chdosh ↗</a><span>南京理工大学紫金学院 · 2026 应届</span><span>计算机科学与技术</span></div></div>
      </header>

      <section className="about-profile">
        <span>PROFILE</span>
        <div><p className="about-lead">我关注的不是“把模型接进页面”，而是怎样让不确定的模型输出进入可校验、可持久化、可恢复的真实应用流程。</p><p>能够独立完成需求拆解、交互实现、模型接入和本地数据持久化。当前最完整的项目是长周期学习 Agent：用 SQLite 保存长期学习状态，用结构化输出和人工确认限制 AI 权限，并通过状态机、事务与测试处理失败和恢复。</p><p>我会借助 AI 编程工具加快检索、实现和排错，但项目中的业务边界、状态语义、数据模型与验收标准需要能够由我解释、核验并持续维护。</p></div>
      </section>

      <section className="about-experience">
        <div className="about-section-title"><span>01 / PROJECT EXPERIENCE</span><h2>项目经历</h2></div>
        <article><div className="experience-meta"><span>2026.03 — 至今</span><strong>核心项目</strong></div><div><h3>长周期学习 Agent</h3><p>本地优先的 Windows 桌面学习应用，串联目标访谈、Roadmap、滚动计划、每日执行、提交评价与复盘调整。</p><ul><li>13 类 AI 操作使用字段白名单和约 4K Token 上下文预算。</li><li>JSON Mode + Zod 校验，结构异常时触发一次受约束修复。</li><li>计划调整采用 Proposal → Confirm / Reject；评价、决策和提交状态事务写入。</li><li>记录 Token、延迟、错误分类与 Trace ID，并覆盖重启恢复和幂等推进。</li></ul><Link to="/demo">查看完整工程证据 ↗</Link></div></article>
        <article><div className="experience-meta"><span>2026.02 — 2026.03</span><strong>独立项目</strong></div><div><h3>OCR 与知识采集 Copilot</h3><p>全局快捷键截图、本地中英文 OCR、AI 翻译解释、术语抽取和连续追问，并以 SQLite 保存记录。</p><ul><li>Tesseract 本地 OCR，不要求用户单独安装识别环境。</li><li>SQLite FTS5 与 Embedding 接口为轻量检索和后续 RAG 提供基础。</li><li>处理 OCR 缺失、空文本、非法 JSON 和模型请求异常。</li></ul><Link to="/demo2">查看项目 ↗</Link></div></article>
      </section>

      <section className="about-skills">
        <div className="about-section-title"><span>02 / SKILLS</span><h2>技能与工程实践</h2></div>
        <div className="skills-grid">{skills.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="about-boundary"><div><span>我能提供的证据</span><h2>代码、数据结构、测试结果和失败路径，都能对应到实际项目。</h2></div><p>网站中的运行数字来自本地开发库的聚合统计，不公开原始学习内容；在线 Demo 是静态重建，不会调用模型。项目页会明确区分已实现、正在完善和长期规划。</p></section>

      <section className="about-cta"><p>如果岗位关注 AI 应用工程、Electron 或本地优先产品，欢迎联系。</p><div><a href="mailto:cdongs@outlook.com" className="button button-primary">发送邮件 <span>↗</span></a><a href="https://github.com/Chdosh" target="_blank" rel="noreferrer" className="about-github">查看 GitHub ↗</a></div></section>
    </div>
  )
}

export default About
