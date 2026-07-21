import { useState, type ReactNode } from 'react'
import './demo.css'

type TourView = 'intake' | 'overview' | 'study' | 'submission' | 'records' | 'next'

const tourSteps: { view: TourView; label: string; title: string; description: string }[] = [
  {
    view: 'intake',
    label: '01 · 建立目标',
    title: '先理解目标和现实约束',
    description: '用户说清楚想学什么、现有基础和时间限制，AI 将对话整理成可执行的学习目标。',
  },
  {
    view: 'overview',
    label: '02 · 生成路径',
    title: '把长期目标拆成当前重点',
    description: '系统生成 Roadmap、近期安排和当前主任务，概览页只保留此刻最重要的下一步。',
  },
  {
    view: 'study',
    label: '03 · 开始学习',
    title: '围绕一个真实任务执行',
    description: '进入学习页后，用户按 Action 完成任务，可以暂停、恢复，并在当前上下文中向 AI 提问。',
  },
  {
    view: 'submission',
    label: '04 · 提交与评价',
    title: '用学习结果结束任务',
    description: '完成行动步骤后提交结果。提交先保存在本地，再由 AI 给出评价、优势和修改建议。',
  },
  {
    view: 'records',
    label: '05 · 沉淀记录',
    title: '把过程变成可追溯证据',
    description: 'Session、提交、评价和知识沉淀统一进入记录页，过去发生了什么一目了然。',
  },
  {
    view: 'next',
    label: '06 · 调整下一轮',
    title: '根据真实表现继续规划',
    description: '系统结合薄弱点和完成情况提出下一批任务；重要调整由用户确认后才会进入正式计划。',
  },
]

const systemFlow = [
  ['Goal', '学习目标'],
  ['Roadmap', '长期路径'],
  ['Daily Guide', '当前执行稿'],
  ['Session', '学习会话'],
  ['Submission', '结果提交'],
  ['Evaluation', '结构化评价'],
  ['Knowledge', '知识沉淀'],
  ['Rolling Plan', '下一轮计划'],
]

const architecturePrinciples = [
  ['SQLite 是唯一事实源', '目标、计划、Session、提交和评价保存在本地数据库，应用重启后可以恢复到一致位置。'],
  ['程序推进状态', 'AI 负责生成内容和建议，正式状态由应用校验并推进，模型不能直接修改学习进度。'],
  ['Schema Guard', '所有结构化模型输出都经过 Zod 校验；失败可以重试，不会把非法结果写进业务状态。'],
  ['Human-in-the-loop', '阶段确认和计划调整保留给用户决定，AI 提案确认后才会事务性应用。'],
]

const techStack = [
  ['桌面端', 'Electron', 'React', 'TypeScript'],
  ['数据层', 'SQLite', 'Drizzle ORM', 'Zod'],
  ['AI 层', 'OpenAI-compatible API', 'DeepSeek'],
  ['质量保障', 'Vitest', 'TypeScript', 'Migration Tests'],
]

const aiTransactionFlow = [
  ['Context Build', 'ContextBuilder 按操作筛选字段，并将上下文限制在 4000 Token 预算内。', 'src/main/services/context-builder.ts'],
  ['LLM Proposal', 'Agent 只生成结构化内容或建议，不直接修改正式学习状态。', 'src/main/ai/agents.ts'],
  ['Parse + Normalize', '提取 JSON，并兼容百分比、中文枚举和浮点分钟等常见模型偏差。', 'src/shared/schemas.ts'],
  ['Zod Validation', 'Schema 校验失败时只允许一次携带错误原因的受约束修复。', 'src/main/ai/ai-client.ts'],
  ['Confirm / Reject', '重大计划变化先保存为 pending proposal，由用户确认或拒绝。', 'plan-change-persistence.ts'],
  ['Transaction Commit', '提交、评价、决策与状态推进按事务和幂等规则写入 SQLite。', 'evaluation-persistence.ts'],
]

const dataGroups = [
  ['目标与计划', 'goals · roadmap_stages · short_plan_days · daily_guides'],
  ['执行现场', 'daily_guide_tasks · daily_guide_actions · study_sessions'],
  ['结果证据', 'learning_submissions · learning_evaluations · next_step_decisions'],
  ['上下文与知识', 'question_threads · knowledge_items · learner_facts'],
  ['变更与恢复', 'plan_adjustment_proposals · plan_versions · generation_locks'],
  ['可观测性', 'ai_reviews · prompt_profiles · prompt_versions'],
]

const failureCases = [
  ['浮点数进入整数字段', 'mastery、estimatedMinutes 和 dayIndex 先进行显式舍入与上下界约束，再进入 Zod Schema。', 'schemas.test.ts：浮点掌握度、分钟和 dayIndex'],
  ['非法 JSON / 字段缺失', '首次解析或 Schema 校验失败后，系统把错误摘要交给模型修复一次；再次失败则分类为 schema_violation。', 'ai-client.test.ts：修复成功与二次失败'],
  ['重复评价导致重复推进', '提交先持久化，评价结果事务写入；恢复函数可重复调用，同一评价不会生成第二次阶段推进。', 'store.test.ts：evaluation transaction / idempotent recovery'],
]

function ActivityRail({ active }: { active: 'overview' | 'study' | 'records' | 'settings' }) {
  return (
    <aside className="product-rail" aria-label="软件导航示意">
      {[
        ['overview', '概'],
        ['study', '学'],
        ['records', '记'],
        ['settings', '设'],
      ].map(([key, label]) => (
        <span key={key} className={active === key ? 'is-active' : ''}>{label}</span>
      ))}
      <i />
    </aside>
  )
}

function IntakeView() {
  return (
    <ProductWindow active="overview">
      <div className="intake-view">
        <div className="product-eyebrow">创建学习目标</div>
        <h3>从一次真实对话开始</h3>
        <div className="chat-thread">
          <div className="chat-message assistant">你准备学习什么？可以直接说目标、期限、基础和每天可投入时间。</div>
          <div className="chat-message user">我想在一个月内学会用 Python 自动处理销售数据。会 Excel，但没有编程基础，每天大约能学 90 分钟。</div>
          <div className="chat-message assistant compact">明白了。我会以“独立完成销售数据清洗与分析”为结果，先补齐 Python 和 Pandas 基础，再进入完整项目。</div>
        </div>
        <div className="goal-summary">
          <span>目标理解摘要</span>
          <strong>30 天掌握 Python 销售数据分析</strong>
          <small>零编程基础 · 每日 90 分钟 · 结果导向</small>
        </div>
      </div>
    </ProductWindow>
  )
}

function OverviewView() {
  return (
    <ProductWindow active="overview">
      <div className="overview-view">
        <header><span className="product-eyebrow">当前学习目标</span><h3>用 Python 独立完成销售数据分析</h3><p>第 8 天 · 当前处于数据处理核心阶段</p></header>
        <section className="stage-card"><div><span>当前阶段</span><strong>Pandas 数据处理</strong><small>掌握 DataFrame 的筛选、清洗与聚合</small></div><em>进行中</em></section>
        <section className="path-strip">
          {['Python 基础', 'Pandas 处理', '数据清洗', '可视化', '综合项目'].map((item, index) => (
            <div className={index < 1 ? 'done' : index === 1 ? 'active' : ''} key={item}><i>{index + 1}</i><span>{item}</span></div>
          ))}
        </section>
        <section className="focus-task"><div><span className="product-eyebrow">当前主任务</span><h4>清洗一份真实销售数据</h4><p>处理缺失值、重复记录和错误的数据类型，并保留验证结果。</p></div><button type="button">进入学习</button></section>
      </div>
    </ProductWindow>
  )
}

function StudyView() {
  return (
    <ProductWindow active="study">
      <div className="study-view">
        <div className="session-bar"><span><i /> 学习中</span><strong>00:24:18</strong><button type="button">暂停</button></div>
        <header><span className="product-eyebrow">当前任务 · 1 / 3</span><h3>清洗一份真实销售数据</h3><p>完成每个行动步骤，过程中可以随时向 AI 导师提问。</p></header>
        <div className="action-list">
          <article className="complete"><i>✓</i><div><strong>读取并检查数据结构</strong><small>确认列名、数据类型和缺失情况</small></div><span>已完成</span></article>
          <article className="current"><i>2</i><div><strong>处理缺失值与重复记录</strong><small>选择合适策略并记录处理前后数量</small></div><span>执行中</span></article>
          <article><i>3</i><div><strong>验证清洗结果</strong><small>检查类型、范围和唯一性约束</small></div><span>未开始</span></article>
        </div>
        <div className="teacher-note"><b>AI 导师</b><p>如果不确定应该删除还是填补缺失值，先判断这一列在业务中的含义，再比较两种处理对结果的影响。</p></div>
      </div>
    </ProductWindow>
  )
}

function SubmissionView() {
  return (
    <ProductWindow active="study">
      <div className="submission-view">
        <header><span className="product-eyebrow">任务评价</span><h3>清洗一份真实销售数据</h3><p>提交已经保存在本地，评价结果不会覆盖原始学习证据。</p></header>
        <div className="submission-proof"><span>用户提交</span><p>完成了 1,248 条销售记录的清洗，补全了地区字段，删除 18 条重复记录，并将日期列统一转换为 datetime。验证脚本全部通过。</p><small>已保存 · 今天 20:46</small></div>
        <div className="evaluation-result">
          <div><span className="result-mark">✓</span><div><strong>评价通过</strong><small>当前任务已完成，可以进入下一任务</small></div></div>
          <p>处理步骤完整，能够解释缺失值策略，并提供了清洗前后的数量对比。下一步建议补充异常值检测。</p>
          <ul><li>保留了可复现的验证证据</li><li>正确区分删除与填补场景</li><li>需要加强异常值识别</li></ul>
        </div>
      </div>
    </ProductWindow>
  )
}

function RecordsView() {
  return (
    <ProductWindow active="records">
      <div className="records-view">
        <header><h3>记录</h3><p>查看学习经历、结果证据和后续调整。</p></header>
        <div className="record-tabs"><span className="active">时间线</span><span>知识沉淀</span><span>计划版本</span></div>
        <div className="record-layout">
          <div className="record-list">
            <article><span>评价</span><strong>销售数据清洗任务通过</strong><small>今天 20:47</small></article>
            <article><span>提交</span><strong>清洗结果与验证证据</strong><small>今天 20:46</small></article>
            <article><span>Session</span><strong>完成 3 个行动步骤</strong><small>今天 20:42</small></article>
            <article><span>提问</span><strong>如何选择缺失值处理策略</strong><small>今天 20:18</small></article>
          </div>
          <div className="record-detail"><span>评价</span><h4>销售数据清洗任务通过</h4><p>学习结果已经评价并写入当前进度。系统从本次提交中识别出一个持续关注项。</p><div><b>知识沉淀</b><small>异常值检测方法仍需加强 · 首次记录</small></div></div>
        </div>
      </div>
    </ProductWindow>
  )
}

function NextView() {
  return (
    <ProductWindow active="records">
      <div className="next-view">
        <header><span className="product-eyebrow">复盘与计划调整</span><h3>下一批学习任务</h3><p>根据最近的提交、评价和知识沉淀生成，确认后才会进入正式计划。</p></header>
        <div className="review-summary"><strong>本轮总结</strong><p>已经能够独立完成基础数据清洗。下一轮将继续补足异常值检测，并开始学习分组聚合。</p></div>
        <div className="proposal-list">
          <article><i>01</i><div><strong>异常值检测与处理</strong><small>IQR、业务阈值与处理策略</small></div><em>新增重点</em></article>
          <article><i>02</i><div><strong>销售数据分组聚合</strong><small>使用 groupby 生成区域与品类汇总</small></div><em>按计划</em></article>
          <article><i>03</i><div><strong>生成第一份分析报告</strong><small>把清洗和聚合结果组织成结论</small></div><em>按计划</em></article>
        </div>
        <div className="confirm-row"><span>AI 只能提出建议，计划仍由你决定。</span><button type="button">确认应用调整</button></div>
      </div>
    </ProductWindow>
  )
}

function ProductWindow({ active, children }: { active: 'overview' | 'study' | 'records' | 'settings'; children: ReactNode }) {
  return (
    <div className="product-window">
      <div className="window-titlebar"><span><i /><i /><i /></span><b>Study Agent</b><small>本地运行</small></div>
      <div className="window-shell"><ActivityRail active={active} /><main>{children}</main></div>
    </div>
  )
}

function Demo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const step = tourSteps[activeIndex] ?? tourSteps[0]!

  const showStep = (index: number) => {
    setActiveIndex(index)
    document.querySelector('.tour-stage')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="product-tour">
      <header className="project-hero">
        <div className="project-hero-label">PROJECT 01 / FLAGSHIP</div>
        <div className="project-hero-grid">
          <h1>Study<br /><em>Agent</em></h1>
          <div>
            <p className="project-hero-lead">不是一次性生成计划，而是持续保存状态并根据执行结果推进。</p>
            <p>一个运行在 Windows 本地的长周期学习 Agent。SQLite 保存目标、计划、执行、提交、评价和复盘；LLM 只在明确边界内生成结构化内容。</p>
            <dl><div><dt>角色</dt><dd>产品设计 / 全栈开发</dd></div><div><dt>平台</dt><dd>Windows Desktop</dd></div><div><dt>年份</dt><dd>2026</dd></div></dl>
          </div>
        </div>
        <nav className="project-anchor-nav" aria-label="项目内容导航"><a href="#evidence">运行证据</a><a href="#product-flow">真实流程</a><a href="#ai-transaction">AI 事务</a><a href="#architecture">技术架构</a><a href="#failures">异常案例</a><a href="https://github.com/Chdosh/Study_plugin" target="_blank" rel="noreferrer">GitHub ↗</a></nav>
      </header>

      <section className="project-section project-evidence-section" id="evidence">
        <header className="project-section-heading"><span>01 / VERIFIED SNAPSHOT</span><div><h2>软件真实运行过，<br />数字有查询口径。</h2><p>以下为 2026-07-21 对本机开发库进行只读聚合查询的结果。只展示数量，不复制数据库、日志或学习内容。</p></div></header>
        <div className="project-metric-grid">
          <article><strong>60</strong><span>Session</span><small>study_sessions 全部记录；54 completed / 5 skipped / 1 active</small></article>
          <article><strong>136</strong><span>完成 Action</span><small>daily_guide_actions 中 status = done；另有 67 skipped</small></article>
          <article><strong>42</strong><span>AI 调用记录</span><small>ai_reviews 快照；记录 Token、延迟、错误分类和 Trace ID</small></article>
          <article><strong>39</strong><span>业务数据表</span><small>当前 SQLite 中非系统表数量，覆盖计划、执行、评价与恢复</small></article>
        </div>
        <div className="evidence-source"><span>证据来源</span><code>%APPDATA%/study-supervisor/study-supervisor.db</code><p>页面不公开原始记录；统计口径可由对应表和状态字段复核。</p></div>
      </section>

      <section className="project-section product-flow-section" id="product-flow">
        <header className="project-section-heading"><span>02 / PRODUCT FLOW</span><div><h2>一次完整学习，<br />在软件里如何发生。</h2><p>界面根据桌面版真实信息架构和业务状态重建。无需填写内容，点击步骤即可浏览；这是静态重建，不是在线 SaaS。</p></div></header>
        <nav className="tour-step-nav" aria-label="产品流程步骤">
          {tourSteps.map((item, index) => (
            <button type="button" className={index === activeIndex ? 'active' : ''} key={item.view} onClick={() => showStep(index)}>
              <span>{String(index + 1).padStart(2, '0')}</span>{item.label.split(' · ')[1]}
            </button>
          ))}
        </nav>
        <div className="tour-stage">
          <div className="tour-explanation">
            <span>{step.label}</span>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
            <div className="tour-controls">
              <button type="button" onClick={() => showStep(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0}>← 上一步</button>
              <small>{activeIndex + 1} / {tourSteps.length}</small>
              <button type="button" onClick={() => showStep(Math.min(tourSteps.length - 1, activeIndex + 1))} disabled={activeIndex === tourSteps.length - 1}>下一步 →</button>
            </div>
          </div>
          <div className="tour-product-frame">
            {step.view === 'intake' && <IntakeView />}
            {step.view === 'overview' && <OverviewView />}
            {step.view === 'study' && <StudyView />}
            {step.view === 'submission' && <SubmissionView />}
            {step.view === 'records' && <RecordsView />}
            {step.view === 'next' && <NextView />}
          </div>
        </div>
      </section>

      <section className="project-section" id="ai-transaction">
        <header className="project-section-heading"><span>03 / GUARDED AI TRANSACTION</span><div><h2>模型只能提案，<br />程序负责验证与提交。</h2><p>13 类 AI 操作拥有不同的字段白名单；上下文构建、输出修复、用户确认和事务写入形成一条受保护的调用链。</p></div></header>
        <div className="ai-transaction-flow">{aiTransactionFlow.map(([title, description, module], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p><code>{module}</code></article>)}</div>
      </section>

      <section className="project-section" id="system-flow">
        <header className="project-section-heading"><span>04 / STATE FLOW</span><div><h2>状态从目标推进到下一轮计划</h2><p>Task 是提交和评价的中心；Action 是执行步骤；Session 是一次可暂停恢复的实际执行记录。评价通过后，程序才推进正式状态。</p></div></header>
        <div className="system-flow-diagram">
          {systemFlow.map(([label, description], index) => (
            <article key={label}><span>{String(index + 1).padStart(2, '0')}</span><strong>{label}</strong><small>{description}</small>{index < systemFlow.length - 1 && <i>→</i>}</article>
          ))}
        </div>
      </section>

      <section className="project-section" id="architecture">
        <header className="project-section-heading"><span>05 / RUNTIME ARCHITECTURE</span><div><h2>让 AI 能力服从可靠的应用状态</h2><p>Renderer 不接触数据库和 API Key；preload / IPC 连接 Application Service，服务层再协调 Context、Agent、Store 与 SQLite。</p></div></header>
        <div className="architecture-principles">
          {architecturePrinciples.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>
        <div className="architecture-layers">
          <div className="layer renderer"><span>React Renderer</span><strong>概览 / 学习 / 记录 / 设置</strong><small>App.tsx · pages/* · domain/*</small></div>
          <i>↓</i>
          <div className="layer runtime"><span>preload / IPC / Application Service</span><strong>命令边界 · 状态机 · 校验 · 恢复</strong><small>preload/index.ts · main/ipc.ts · app-service.ts</small></div>
          <i>↓</i>
          <div className="layer split"><div><span>SQLite Store</span><strong>Durable Source of Truth</strong></div><div><span>LLM Client + Zod</span><strong>结构化内容与建议</strong></div></div>
        </div>
      </section>

      <section className="project-section" id="persistence">
        <header className="project-section-heading"><span>06 / PERSISTENCE</span><div><h2>39 张表不是卖点，<br />可追溯的业务事实才是。</h2><p>数据库同时保留原始事实、派生评价、计划版本和恢复锁。下面只列核心表组，完整定义位于 src/main/db/schema.ts。</p></div></header>
        <div className="data-group-grid">{dataGroups.map(([title, tables]) => <article key={title}><h3>{title}</h3><code>{tables}</code></article>)}</div>
      </section>

      <section className="project-section" id="failures">
        <header className="project-section-heading"><span>07 / FAILURE CASES</span><div><h2>失败路径也必须<br />可以解释和复现。</h2><p>比“高可靠”更重要的是展示系统如何发现非法输出、保留原始提交，并在重复执行时避免二次推进。</p></div></header>
        <div className="failure-case-list">{failureCases.map(([title, solution, evidence], index) => <article key={title}><span>CASE 0{index + 1}</span><h3>{title}</h3><p>{solution}</p><code>{evidence}</code></article>)}</div>
        <div className="test-evidence"><div><strong>213</strong><span>源码定义测试用例</span><small>按当前 *.test.ts 中 it/test 定义统计</small></div><div><strong>101</strong><span>本次 npm test 通过</span><small>2026-07-21 实际命令结果</small></div><div><strong>6</strong><span>真实 API 契约测试跳过</span><small>DeepSeek contract 为 opt-in，避免自动消耗额度</small></div><p>定义数量与本次执行数量分开披露；当前默认测试命令未把两个大型 Store / AppService 套件计入最终摘要，因此不写成“213 项全部通过”。</p></div>
      </section>

      <section className="project-section tech-stack-section">
        <header className="project-section-heading"><span>08 / STACK & STATUS</span><div><h2>技术栈与真实完成边界</h2><p>桌面端拥有完整本地能力；当前网站只负责展示，不接入真实模型和用户数据。</p></div></header>
        <div className="project-tech-grid">{techStack.map(([category, ...items]) => <article key={category}><span>{category}</span>{items.map((item) => <strong key={item}>{item}</strong>)}</article>)}</div>
        <div className="delivery-status"><article><span>已实现并验证</span><p>SQLite 持久化、目标到评价主流程、13 类上下文白名单、结构化输出校验、调用日志、状态恢复与核心测试。</p></article><article><span>正在完善</span><p>UI 一致性、默认测试命令覆盖范围、完整交互录屏、错误可观测性展示和发布体验。</p></article><article><span>长期规划</span><p>更丰富的工具能力、个性化长期画像与知识检索；这些能力不会被描述成当前已交付功能。</p></article></div>
      </section>

      <section className="tour-footnote">
        <strong>这不是在线学习服务</strong>
        <p>展示中的目标、学习记录和评价均为虚构数据；网站不会调用模型或上传内容。完整功能只在本地桌面应用中运行。</p>
      </section>
    </div>
  )
}

export default Demo
