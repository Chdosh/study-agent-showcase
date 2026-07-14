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
      <header className="tour-hero">
        <span>REAL PRODUCT FLOW / 真实产品流程</span>
        <h1>一次完整学习，<br />在软件里如何发生。</h1>
        <p>以下界面根据 Study Agent 桌面版的真实信息架构和业务流程重建。无需填写内容，向下滚动或点击步骤即可浏览。</p>
      </header>

      <nav className="tour-step-nav" aria-label="产品流程步骤">
        {tourSteps.map((item, index) => (
          <button type="button" className={index === activeIndex ? 'active' : ''} key={item.view} onClick={() => showStep(index)}>
            <span>{String(index + 1).padStart(2, '0')}</span>{item.label.split(' · ')[1]}
          </button>
        ))}
      </nav>

      <section className="tour-stage">
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
      </section>

      <section className="tour-footnote">
        <strong>这不是在线学习服务</strong>
        <p>展示中的目标、学习记录和评价均为虚构数据；网站不会调用模型或上传内容。完整功能只在本地桌面应用中运行。</p>
      </section>
    </div>
  )
}

export default Demo
