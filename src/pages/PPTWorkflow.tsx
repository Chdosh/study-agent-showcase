import './ppt-workflow.css'

const workflow = [
  ['01', '输入参考图', '学术架构图、流程图或复杂信息图'],
  ['02', '提取可信内容', '客户文字与公式优先，OCR 负责补充'],
  ['03', '拆分页面元素', '识别标题、正文、公式、形状与复杂场景'],
  ['04', '混合重建', '简单内容转原生对象，复杂内容保留为图片'],
  ['05', '自动验证', '检查公式结构、页面越界与输出完整性'],
  ['06', '输出 PPT', '得到大部分内容可编辑的 PowerPoint'],
]

function PPTWorkflow() {
  return (
    <div className="ppt-page">
      <section className="ppt-hero">
        <div className="ppt-eyebrow"><span>PROJECT 03</span><span>CODEX WORKFLOW · 2026</span></div>
        <div className="ppt-hero-grid">
          <div><h1>Image to<br /><em>PowerPoint</em></h1><p>一个面向学术架构图和复杂信息图的 AI 辅助图片转可编辑 PowerPoint 工作流。</p><a href="https://github.com/Chdosh/image-to-PPT" target="_blank" rel="noreferrer">查看 GitHub <span>↗</span></a></div>
          <div className="ppt-visual" aria-label="图片转换为可编辑 PowerPoint 的示意图">
            <div className="ppt-source-card"><small>INPUT / REFERENCE IMAGE</small><div className="source-diagram"><i /><i /><span /><span /></div></div>
            <div className="ppt-transform-arrow"><b>→</b><small>REBUILD</small></div>
            <div className="ppt-output-card"><div className="ppt-toolbar"><i /><i /><i /><span>Editable slide</span></div><div className="ppt-slide"><h3>System Architecture</h3><div className="slide-flow"><span>Input</span><b>→</b><span>Process</span><b>→</b><span>Output</span></div><p>Text · Shapes · Formula · Connectors</p></div></div>
          </div>
        </div>
      </section>

      <section className="ppt-workflow-section">
        <div className="ppt-section-heading"><span>01 / WORKFLOW</span><div><h2>从一张图片，<br />到可继续编辑的页面。</h2><p>工作流不尝试从模糊图片里猜测不存在的细节，而是优先保证可信内容可编辑、复杂内容可独立替换。</p></div></div>
        <div className="ppt-workflow">{workflow.map(([index, title, desc]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{desc}</p></article>)}</div>
      </section>

      <section className="ppt-strategy">
        <div className="ppt-section-heading light"><span>02 / HYBRID STRATEGY</span><div><h2>原生对象重建<br />+ 局部图片保留</h2></div></div>
        <div className="strategy-grid"><article><span>EDITABLE</span><h3>优先转为 PPT 原生对象</h3><p>标题、正文、Office Math 公式、方框、圆点、状态条和主要连接线均可继续修改。</p><div><i>文字</i><i>形状</i><i>公式</i><i>连线</i></div></article><article><span>REPLACEABLE</span><h3>复杂内容保留高清图片</h3><p>人物、器官与复杂场景自动裁切为局部图片，保持视觉质量，并可在 PowerPoint 中独立替换。</p><div><i>人物</i><i>器官</i><i>复杂场景</i></div></article></div>
      </section>

      <section className="ppt-capabilities">
        <div className="ppt-section-heading"><span>03 / CAPABILITIES</span><div><h2>已实现的工作流能力</h2></div></div>
        <div className="capability-cells"><div><b>01</b><span>场景化配置与通用组件渲染</span></div><div><b>02</b><span>局部裁切、取色与配色提取</span></div><div><b>03</b><span>公式、越界和完整性自动检查</span></div><div><b>04</b><span>图片＋备注直接在 Codex 中生成</span></div></div>
        <div className="ppt-stack"><span>JavaScript</span><span>Python</span><span>PowerShell</span><span>Office Math</span><span>Codex Workflow</span><span>GitHub Actions</span></div>
      </section>
    </div>
  )
}

export default PPTWorkflow
