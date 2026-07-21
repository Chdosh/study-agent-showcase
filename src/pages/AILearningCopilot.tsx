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

const snapshot = [
  ['44', '采集记录', 'captures 表行数'],
  ['103', '沉淀术语', 'terms 表行数'],
  ['20', '追问会话', 'conversations 表行数'],
  ['47', '会话消息', '其中 24 条为 AI 回复'],
]

const pipeline = [
  ['01', '捕获', 'ScreenshotSelector', 'pynput 监听热键，mss 按原生分辨率截取多屏选区。'],
  ['02', '识别', 'OCRService', '优先使用随应用提供的 Tesseract，并检查引擎与语言包状态。'],
  ['03', '解释', 'AIClient', '通过 urllib 调用兼容接口，解析 JSON、代码围栏及异常响应。'],
  ['04', '编排', 'CapturePipelineWorker', 'QThread 串联 OCR、AI、分类与保存，避免阻塞主界面。'],
  ['05', '持久化', 'HistoryStore', '一次结果写入记录、术语和会话，随后驱动检索与统计。'],
]

const failureCases = [
  {
    code: 'AI / FORMAT',
    title: '接口不支持 response_format',
    symptom: '部分 OpenAI 兼容服务会拒绝 json_object 参数。',
    handling: '识别到对应错误后移除该参数重试；随后仍执行 JSON 提取与对象类型检查。',
  },
  {
    code: 'OCR / ENV',
    title: 'OCR 引擎或语言包不可用',
    symptom: '便携路径、系统路径或所选语言数据缺失时，截图链路无法继续。',
    handling: '启动前检查环境并返回可读错误；失败结果仍进入统一结果状态，避免线程静默退出。',
  },
  {
    code: 'DATA / PRIVACY',
    title: '用户不希望长期保存截图',
    symptom: '原始画面可能包含不适合长期保留的界面信息。',
    handling: '关闭“保存截图”后，流程成功即删除图片文件，只保留用于回顾的结构化文字记录。',
  },
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
    <div className="copilot-titlebar"><div><i /><i /><i /></div><span>AI Learning Copilot</span><small>静态还原 · 示例数据</small></div>
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
      <div className="copilot-hero-grid"><div><h1>AI Learning<br /><em>Copilot</em></h1></div><div className="copilot-summary"><p>把一次截图翻译做成可恢复、可检索、能持续积累的本地桌面工作流。</p><div className="copilot-tags"><span>PySide6</span><span>Tesseract</span><span>SQLite + FTS5</span></div><div className="copilot-hero-links"><a href="#copilot-tour">查看流程 <span>↓</span></a><a href="https://github.com/Chdosh/ai-learning-copilot" target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div></div></div>
    </section>

    <section className="copilot-problem"><span>01 / WHY</span><h2>看到不懂的英文时，<br />不该打断正在进行的工作。</h2><p>复制文字、切换翻译软件、粘贴、查看，再手动整理——这条链路既慢，也没有形成积累。AI Learning Copilot 把它压缩成一次框选，并让每次理解都自动成为可检索的学习记录。</p></section>

    <section className="copilot-demo-section" id="copilot-tour">
      <div className="copilot-section-heading"><span>02 / PRODUCT TOUR</span><div><h2>真实软件流程的静态还原</h2><p>无需输入。点击步骤，查看桌面应用从截图到知识沉淀的完整过程。</p></div></div>
      <div className="copilot-tour">
        <div className="copilot-step-list">{steps.map((step) => <button key={step.id} className={view === step.id ? 'active' : ''} onClick={() => setView(step.id)}><span>{step.index}</span><b>{step.label}</b><i>→</i></button>)}</div>
        <div className="copilot-preview-wrap"><AppPreview view={view} /><div className="copilot-step-note"><span>{activeStep.index}</span><div><h3>{activeStep.title}</h3><p>{activeStep.description}</p></div></div></div>
      </div>
    </section>

    <section className="copilot-evidence">
      <div className="copilot-section-heading"><span>03 / VERIFIED SNAPSHOT</span><div><h2>软件确实运行过，<br />数据也确实留下来了。</h2><p>以下只读取开发环境 SQLite 的聚合数量，不复制截图、原文、解释、术语内容或任何导出文件。</p></div></div>
      <div className="copilot-snapshot">{snapshot.map(([value, label, source]) => <article key={label}><strong>{value}</strong><h3>{label}</h3><p>{source}</p></article>)}</div>
      <div className="copilot-evidence-note"><span>SNAPSHOT · 2026-07-21</span><p>统计口径：当前本地数据库共有 3 个产生采集记录的日期，FTS5 索引覆盖全部 44 条记录。该数据库生成于较早版本；当前代码会在应用启动时自动迁移分类、收藏与 Embedding 表，因此页面将“快照数据”和“现行代码能力”分开披露。</p></div>
    </section>

    <section className="copilot-flow-section"><div className="copilot-section-heading light"><span>04 / RUNTIME FLOW</span><div><h2>一次框选，经过五个可定位的模块</h2><p>这里展示的是代码里的实际执行顺序，不是抽象产品流程。</p></div></div><div className="copilot-runtime-flow">{pipeline.map(([index, title, module, description]) => <article key={index}><span>{index}</span><div><small>{module}</small><h3>{title}</h3><p>{description}</p></div></article>)}</div></section>

    <section className="copilot-architecture"><div className="copilot-section-heading"><span>05 / ARCHITECTURE</span><div><h2>界面、任务编排、业务服务与数据层分开</h2><p>每一层都能对应到原项目中的实际模块，便于继续测试和替换实现。</p></div></div><div className="architecture-grid">
      <article><span>UI + THREAD</span><code>app/ui/</code><h3>桌面交互与后台任务</h3><p><b>main_window.py</b> 组织页面、筛选和数据管理；<b>workers.py</b> 用 QThread 执行截图分析与追问。</p><small>main_window · result_window · workers</small></article>
      <article><span>DOMAIN SERVICES</span><code>app/services/</code><h3>捕获、识别与解释</h3><p><b>screenshot.py</b>、<b>ocr.py</b>、<b>ai_client.py</b> 和 <b>categorizer.py</b> 分别处理单一职责。</p><small>mss · Tesseract · urllib · regex</small></article>
      <article><span>LOCAL STORE</span><code>history_store.py</code><h3>SQLite 持久化与检索</h3><p>统一管理采集、术语、会话、消息、设置和向量基础表，并维护 FTS5 全文索引。</p><small>6 个实体表 + FTS5 虚拟表</small></article>
    </div></section>

    <section className="copilot-data-model">
      <div className="copilot-section-heading"><span>06 / DATA MODEL</span><div><h2>一次理解，变成可以继续使用的数据</h2><p>存储结构围绕“采集—术语—追问”建立，而不是只保存一段最终回答。</p></div></div>
      <div className="copilot-data-grid">
        <article><span>CAPTURE</span><h3>captures</h3><p>原文、翻译、解释、标签、分类与截图路径，是历史检索和统计的事实来源。</p></article>
        <article><span>KNOWLEDGE</span><h3>terms</h3><p>术语唯一化更新，记录中文名、解释、例子、出现次数与收藏状态。</p></article>
        <article><span>CONTEXT</span><h3>conversations + messages</h3><p>追问与原采集记录关联，继续提问时只加载最近 12 条消息控制上下文长度。</p></article>
        <article><span>SEARCH</span><h3>captures_fts</h3><p>FTS5 同步索引原文、翻译、解释和标签；不可用时回退到 LIKE 查询。</p></article>
        <article><span>OPERATIONS</span><h3>settings</h3><p>本地保存偏好、OCR 语言与接口配置；数据库支持备份、恢复、清理和 VACUUM。</p></article>
        <article><span>FOUNDATION</span><h3>capture_embeddings</h3><p>向量存储表与服务接口已经存在，但完整语义检索界面仍属于后续能力。</p></article>
      </div>
    </section>

    <section className="copilot-failures">
      <div className="copilot-section-heading light"><span>07 / FAILURE HANDLING</span><div><h2>真实工程不只展示成功页面</h2><p>三个已经在代码中处理的边界情况。</p></div></div>
      <div className="copilot-failure-grid">{failureCases.map((item) => <article key={item.code}><span>{item.code}</span><h3>{item.title}</h3><dl><dt>触发</dt><dd>{item.symptom}</dd><dt>处理</dt><dd>{item.handling}</dd></dl></article>)}</div>
    </section>

    <section className="copilot-verification">
      <div className="copilot-section-heading"><span>08 / VERIFICATION</span><div><h2>测试结果与实现边界放在同一处</h2><p>避免把“已有接口”“未来方向”和“已经完成的用户能力”混为一谈。</p></div></div>
      <div className="copilot-verification-grid">
        <article className="copilot-test-card"><span>PYTEST · 2026-07-21</span><strong>27 / 27</strong><h3>当前单元测试全部通过</h3><p>覆盖 SQLite 保存与搜索、术语更新、追问会话、OCR 文本清理、JSON 解析、自动分类、统计与高级筛选。</p><code>python -m pytest -q</code></article>
        <article><span>IMPLEMENTED</span><h3>已经实现</h3><ul><li>全局热键与多屏区域截图</li><li>本地 OCR、AI 解释与连续追问</li><li>历史、术语、分类、统计与导出</li><li>数据库备份、恢复、清理和迁移</li></ul></article>
        <article><span>BOUNDARY</span><h3>仍在完善</h3><ul><li>Embedding 仅有存储与服务基础</li><li>尚未形成完整语义搜索 / RAG 体验</li><li>展示站为静态还原，不连接真实模型</li><li>页面示例数据不等于本地数据库数据</li></ul></article>
      </div>
    </section>

    <section className="copilot-facts"><div><span>27</span><small>本次通过测试</small></div><div><span>6+1</span><small>实体表与全文索引</small></div><div><span>0</span><small>云端用户数据库</small></div><p>核心依赖保持在 PySide6、mss 与 pynput；网络请求使用 Python 标准库，统计图表由 QPainter 自绘，Tesseract 以便携方式随项目提供。</p></section>

    <section className="copilot-repo"><span>PROJECT SOURCE</span><div><h2>查看实现，而不只看介绍。</h2><a href="https://github.com/Chdosh/ai-learning-copilot" target="_blank" rel="noreferrer">Chdosh / ai-learning-copilot <b>↗</b></a></div></section>
  </div>
}

export default AILearningCopilot
