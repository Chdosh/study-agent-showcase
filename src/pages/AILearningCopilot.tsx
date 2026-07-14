import { useState } from 'react'
import './ai-learning-copilot.css'

type View = 'capture' | 'result' | 'followup' | 'library' | 'statistics'

const steps: Array<{ id: View; index: string; label: string; title: string; description: string }> = [
  { id: 'capture', index: '01', label: '框选截图', title: '在任何软件上方唤起截图', description: '按下 Ctrl + Alt + T，直接框选看不懂的英文界面、报错或文档。' },
  { id: 'result', index: '02', label: '识别解释', title: '本地 OCR 后给出结构化解释', description: 'Tesseract 在本地识别文字，AI 返回翻译、小白解释、术语和标签。' },
  { id: 'followup', index: '03', label: '继续追问', title: '不懂就换一种方式再讲', description: '通过“更简单”“举例子”“重新解释”继续追问，不用重新组织提示词。' },
  { id: 'library', index: '04', label: '知识沉淀', title: '结果自动进入历史与术语本', description: '每次识别都自动保存，可按时间和分类筛选，重要术语还能收藏。' },
  { id: 'statistics', index: '05', label: '回顾统计', title: '看见自己的学习积累', description: '用趋势、分类和活跃度回顾学习过程，并可将术语导出到 Anki。' },
]

const sidebar = [
  ['⌂', '首页'], ['⌗', '截图'], ['◷', '历史'], ['Aa', '术语'], ['▥', '统计'], ['⚙', '设置'],
]

function CaptureView() {
  return <div className="copilot-view copilot-capture-view">
    <div className="copilot-view-heading"><span>截图 / 小窗</span><h3>框选需要理解的内容</h3><p>松开鼠标后，应用会自动完成 OCR 与分析。</p></div>
    <div className="capture-stage">
      <div className="capture-source"><small>TERMINAL — build output</small><code>ModuleNotFoundError: No module named 'pandas'</code><span>Process finished with exit code 1</span></div>
      <div className="capture-selection"><i /><i /><i /><i /><b>860 × 180</b></div>
      <div className="hotkey-tip"><span>全局热键</span><kbd>Ctrl</kbd><b>+</b><kbd>Alt</kbd><b>+</b><kbd>T</kbd></div>
    </div>
  </div>
}

function ResultView() {
  return <div className="copilot-view">
    <div className="result-toolbar"><div><span className="result-ready">识别完成</span><small>刚刚 · Python</small></div><button>查看大窗口</button></div>
    <div className="result-grid">
      <section><small>识别原文</small><p className="source-copy">ModuleNotFoundError: No module named 'pandas'</p></section>
      <section><small>翻译</small><h3>模块未找到：没有名为 “pandas” 的模块</h3></section>
      <section className="explanation-card"><small>小白解释</small><p>你的 Python 程序想使用 pandas，但当前运行环境里还没有安装它。通常需要先确认正在使用哪个 Python 环境，再在同一环境中安装依赖。</p></section>
      <section><small>关键术语</small><div className="term-chips"><span>Module</span><span>Python 环境</span><span>Dependency</span></div></section>
    </div>
  </div>
}

function FollowupView() {
  return <div className="copilot-view">
    <div className="copilot-tabs"><span>翻译</span><span>解释</span><span className="active">追问</span></div>
    <div className="chat-panel">
      <div className="chat-question"><small>你</small><p>为什么我明明安装过，程序还是找不到？</p></div>
      <div className="chat-answer"><div className="ai-avatar">AI</div><div><small>学习助手</small><p>最常见的原因是：你安装 pandas 时使用的 Python，和运行程序时使用的 Python 不是同一个环境。可以先检查 IDE 当前选择的解释器，再用该解释器执行安装命令。</p></div></div>
    </div>
    <div className="quick-actions"><span>快捷追问</span><button>更简单点</button><button>举例子</button><button>重新解释</button></div>
  </div>
}

function LibraryView() {
  return <div className="copilot-view library-view">
    <div className="library-list"><div className="library-title"><h3>历史记录</h3><span>24 条</span></div><div className="filter-chips"><span className="active">全部</span><span>今天</span><span>本周</span></div>
      <article className="active"><small>刚刚 · Python</small><b>ModuleNotFoundError...</b><span>模块未找到</span></article>
      <article><small>今天 14:20 · 文档</small><b>Rate limit exceeded</b><span>已超过请求频率限制</span></article>
      <article><small>昨天 · AI 概念</small><b>Retrieval augmented...</b><span>检索增强生成</span></article>
    </div>
    <div className="term-book"><div className="library-title"><h3>术语本</h3><span>12 个</span></div><div className="term-table"><div><b>★</b><span><strong>Dependency</strong><small>依赖项</small></span><em>6 次</em></div><div><b>☆</b><span><strong>Interpreter</strong><small>解释器</small></span><em>4 次</em></div><div><b>★</b><span><strong>Rate limit</strong><small>速率限制</small></span><em>3 次</em></div></div></div>
  </div>
}

function StatisticsView() {
  const days = [1,2,0,3,1,4,0,2,3,1,0,4,2,1,3,0,2,4,3,1,2,0,1,3,4,2,1,0,3,2,4,1,2,3,0]
  return <div className="copilot-view stats-view">
    <div className="stats-cards"><div><span>今日学习</span><b>8</b><small>条记录</small></div><div><span>累计记录</span><b>124</b><small>本地保存</small></div><div><span>术语沉淀</span><b>37</b><small>5 个收藏</small></div><div><span>AI 交互</span><b>29</b><small>次追问</small></div></div>
    <div className="stats-panels"><section><div className="panel-heading"><b>近 7 天趋势</b><span>+18%</span></div><div className="bar-chart">{[42,70,52,85,61,96,78].map((height, index) => <i key={index} style={{height: `${height}%`}}><small>{['一','二','三','四','五','六','日'][index]}</small></i>)}</div></section><section><div className="panel-heading"><b>35 天活跃度</b><span>持续积累</span></div><div className="heatmap">{days.map((level, index) => <i key={index} data-level={level} />)}</div><div className="heatmap-key"><span>少</span><i /><i /><i /><i /><span>多</span></div></section></div>
  </div>
}

function AppPreview({ view }: { view: View }) {
  const activeIndex = view === 'capture' ? 1 : view === 'library' ? 2 : view === 'statistics' ? 4 : 0
  return <div className="copilot-window">
    <div className="copilot-titlebar"><div><i /><i /><i /></div><span>AI Learning Copilot</span><small>本地学习助手</small></div>
    <div className="copilot-app"><aside><div className="copilot-logo">C</div>{sidebar.map(([icon, label], index) => <span className={index === activeIndex ? 'active' : ''} key={label}><b>{icon}</b><small>{label}</small></span>)}</aside><main>
      {view === 'capture' && <CaptureView />}{view === 'result' && <ResultView />}{view === 'followup' && <FollowupView />}{view === 'library' && <LibraryView />}{view === 'statistics' && <StatisticsView />}
    </main></div>
  </div>
}

function AILearningCopilot() {
  const [view, setView] = useState<View>('capture')
  const activeStep = steps.find((step) => step.id === view)!

  return <div className="copilot-page">
    <section className="copilot-hero">
      <div className="copilot-eyebrow"><span>PROJECT 02</span><span>PYTHON DESKTOP · 2026</span></div>
      <div className="copilot-hero-grid"><div><h1>AI Learning<br /><em>Copilot</em></h1></div><div className="copilot-summary"><p>一键截图、OCR 识别、AI 翻译解释，自动沉淀为个人知识库。</p><div className="copilot-tags"><span>PySide6</span><span>Tesseract</span><span>SQLite + FTS5</span></div><a href="https://github.com/Chdosh/ai-learning-copilot" target="_blank" rel="noreferrer">查看 GitHub <span>↗</span></a></div></div>
    </section>

    <section className="copilot-problem"><span>01 / WHY</span><h2>看到不懂的英文时，<br />不该打断正在进行的工作。</h2><p>复制文字、切换翻译软件、粘贴、查看，再手动整理——这条链路既慢，也没有形成积累。AI Learning Copilot 把它压缩成一次框选，并让每次理解都自动成为可检索的学习记录。</p></section>

    <section className="copilot-demo-section">
      <div className="copilot-section-heading"><span>02 / PRODUCT TOUR</span><div><h2>真实软件流程的静态还原</h2><p>无需输入。点击步骤，查看桌面应用从截图到知识沉淀的完整过程。</p></div></div>
      <div className="copilot-tour">
        <div className="copilot-step-list">{steps.map((step) => <button key={step.id} className={view === step.id ? 'active' : ''} onClick={() => setView(step.id)}><span>{step.index}</span><b>{step.label}</b><i>→</i></button>)}</div>
        <div className="copilot-preview-wrap"><AppPreview view={view} /><div className="copilot-step-note"><span>{activeStep.index}</span><div><h3>{activeStep.title}</h3><p>{activeStep.description}</p></div></div></div>
      </div>
    </section>

    <section className="copilot-flow-section"><div className="copilot-section-heading light"><span>03 / WORKFLOW</span><div><h2>一次框选背后的处理链路</h2><p>截图与 OCR 在本地完成，AI 只负责生成结构化解释，最终结果回到用户自己的 SQLite 数据库。</p></div></div><div className="copilot-flow">{[
      ['01','全局热键','pynput 监听'],['02','区域截图','mss 捕获'],['03','文字识别','Tesseract 本地 OCR'],['04','翻译解释','结构化 JSON'],['05','自动归档','SQLite + FTS5'],['06','学习复用','术语 / 统计 / Anki'],
    ].map(([index,title,desc]) => <div key={index}><span>{index}</span><b>{title}</b><small>{desc}</small></div>)}</div></section>

    <section className="copilot-architecture"><div className="copilot-section-heading"><span>04 / ARCHITECTURE</span><div><h2>轻量、本地优先、职责清楚</h2></div></div><div className="architecture-grid">
      <article><span>INTERFACE</span><h3>PySide6 桌面界面</h3><p>主窗口、结果弹窗、历史、术语与统计页面，由 QThread 隔离耗时任务。</p><small>7 个页面与窗口</small></article>
      <article><span>SERVICES</span><h3>独立业务服务</h3><p>截图、OCR、AI 客户端、分类器与提示词构建各自独立，界面只负责编排。</p><small>urllib · mss · pynput</small></article>
      <article><span>LOCAL DATA</span><h3>SQLite + FTS5</h3><p>记录、术语和追问保存在本地，并为全文检索、备份与后续语义搜索留出空间。</p><small>5 个实体表 + FTS</small></article>
    </div></section>

    <section className="copilot-facts"><div><span>27</span><small>单元测试</small></div><div><span>0</span><small>云端用户数据库</small></div><div><span>3</span><small>核心第三方依赖</small></div><p>便携版 Tesseract 随应用提供，无需用户另外安装 OCR 环境；统计图表由 QPainter 自绘，不引入大型图表库。</p></section>
  </div>
}

export default AILearningCopilot
