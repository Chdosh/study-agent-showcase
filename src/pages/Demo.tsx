import { useState, useEffect, useCallback } from 'react'
import type { DemoState, DemoStep, InterviewAnswer, Submission } from '../demo/types'
import {
  loadDemoState,
  saveDemoState,
  resetDemoState,
  saveCurrentStep,
  saveGoal,
  saveInterviewAnswers,
  saveSubmission,
} from '../demo/demoRepository'
import {
  MOCK_GOAL,
  MOCK_INTERVIEW_ANSWERS,
  MOCK_ROADMAP,
  MOCK_DAILY_TASKS,
  MOCK_EVALUATIONS,
  MOCK_KNOWLEDGE_CARDS,
  MOCK_NEXT_PLAN,
  DEMO_STEPS,
} from '../demo/mockData'
import './demo.css'

const STEP_LABELS: Record<DemoStep, string> = {
  goal_input: '目标输入',
  interview: '目标澄清',
  roadmap: '学习路线图',
  daily_task: '今日任务',
  submission: '提交总结',
  evaluation: 'AI 评估',
  knowledge_cards: '知识卡片',
  next_plan: '下一轮计划',
}

function Demo() {
  const [state, setState] = useState<DemoState>(() => loadDemoState())
  const [goalInput, setGoalInput] = useState('')
  const [answers, setAnswers] = useState<string[]>(['', '', ''])
  const [submissionText, setSubmissionText] = useState('')

  useEffect(() => {
    if (!state.startedAt) {
      const initialized = resetDemoState()
      setState(initialized)
    }
  }, [state.startedAt])

  const updateState = useCallback((updater: (prev: DemoState) => DemoState) => {
    setState((prev) => {
      const next = updater(prev)
      saveDemoState(next)
      return next
    })
  }, [])

  const goToStep = useCallback((step: DemoStep) => {
    const updated = saveCurrentStep(step)
    setState(updated)
  }, [])

  const handleReset = useCallback(() => {
    const fresh = resetDemoState()
    setState(fresh)
    setGoalInput('')
    setAnswers(['', '', ''])
    setSubmissionText('')
  }, [])

  const handleGoalSubmit = useCallback(() => {
    if (!goalInput.trim()) return
    const goal = { ...MOCK_GOAL, raw: goalInput.trim() }
    const updated = saveGoal(goal)
    setState(updated)
    goToStep('interview')
  }, [goalInput, goToStep])

  const handleInterviewSubmit = useCallback(() => {
    const filled: InterviewAnswer[] = MOCK_INTERVIEW_ANSWERS.map((q, i) => ({
      ...q,
      answer: answers[i]?.trim() || q.answer,
    }))
    const updated = saveInterviewAnswers(filled)
    setState(updated)
    updateState((prev) => ({
      ...prev,
      roadmap: MOCK_ROADMAP,
      dailyTasks: MOCK_DAILY_TASKS,
    }))
    goToStep('roadmap')
  }, [answers, updateState, goToStep])

  const handleStartDailyTask = useCallback(() => {
    goToStep('daily_task')
  }, [goToStep])

  const handleSubmissionSubmit = useCallback(() => {
    if (!submissionText.trim()) return
    const submission: Submission = {
      id: `sub-${Date.now()}`,
      taskId: 'task-1',
      content: submissionText.trim(),
      submittedAt: new Date().toISOString(),
    }
    const updated = saveSubmission(submission)
    setState(updated)
    updateState((prev) => ({
      ...prev,
      evaluations: MOCK_EVALUATIONS,
    }))
    goToStep('evaluation')
  }, [submissionText, updateState, goToStep])

  const handleViewKnowledgeCards = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      knowledgeCards: MOCK_KNOWLEDGE_CARDS,
    }))
    goToStep('knowledge_cards')
  }, [updateState, goToStep])

  const handleViewNextPlan = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      nextPlan: MOCK_NEXT_PLAN,
    }))
    goToStep('next_plan')
  }, [updateState, goToStep])

  const currentStepIndex = DEMO_STEPS.indexOf(state.currentStep)

  return (
    <div className="demo">
      <div className="demo-header">
        <h1>功能演示</h1>
        <div className="demo-badges">
          <span className="badge badge-mock">Mock 演示</span>
          <span className="badge badge-step">
            步骤 {currentStepIndex + 1} / {DEMO_STEPS.length}
          </span>
        </div>
      </div>

      <div className="demo-notice">
        <p>这是一个静态演示流程，使用预置 Mock 数据，不调用真实 AI 模型。所有数据保存在浏览器 localStorage 中，刷新后可继续。</p>
      </div>

      <nav className="step-nav">
        {DEMO_STEPS.map((step, index) => (
          <button
            key={step}
            className={`step-dot ${index <= currentStepIndex ? 'step-dot--done' : ''} ${step === state.currentStep ? 'step-dot--active' : ''}`}
            onClick={() => index <= currentStepIndex && goToStep(step)}
            disabled={index > currentStepIndex}
          >
            <span className="step-dot-num">{index + 1}</span>
            <span className="step-dot-label">{STEP_LABELS[step]}</span>
          </button>
        ))}
      </nav>

      <div className="step-content">
        {state.currentStep === 'goal_input' && (
          <GoalInputStep
            value={goalInput}
            onChange={setGoalInput}
            onSubmit={handleGoalSubmit}
          />
        )}
        {state.currentStep === 'interview' && (
          <InterviewStep
            answers={answers}
            onChange={setAnswers}
            onSubmit={handleInterviewSubmit}
            onBack={() => goToStep('goal_input')}
          />
        )}
        {state.currentStep === 'roadmap' && (
          <RoadmapStep
            roadmap={state.roadmap}
            onContinue={handleStartDailyTask}
            onBack={() => goToStep('interview')}
          />
        )}
        {state.currentStep === 'daily_task' && (
          <DailyTaskStep
            tasks={state.dailyTasks}
            onContinue={() => goToStep('submission')}
            onBack={() => goToStep('roadmap')}
          />
        )}
        {state.currentStep === 'submission' && (
          <SubmissionStep
            value={submissionText}
            onChange={setSubmissionText}
            onSubmit={handleSubmissionSubmit}
            onBack={() => goToStep('daily_task')}
          />
        )}
        {state.currentStep === 'evaluation' && (
          <EvaluationStep
            evaluations={state.evaluations}
            onContinue={handleViewKnowledgeCards}
            onBack={() => goToStep('submission')}
          />
        )}
        {state.currentStep === 'knowledge_cards' && (
          <KnowledgeCardsStep
            cards={state.knowledgeCards}
            onContinue={handleViewNextPlan}
            onBack={() => goToStep('evaluation')}
          />
        )}
        {state.currentStep === 'next_plan' && (
          <NextPlanStep
            plan={state.nextPlan}
            onReset={handleReset}
            onBack={() => goToStep('knowledge_cards')}
          />
        )}
      </div>

      <div className="demo-footer">
        <button className="btn btn-reset" onClick={handleReset}>
          重置演示
        </button>
      </div>
    </div>
  )
}

function GoalInputStep({ value, onChange, onSubmit }: {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
}) {
  return (
    <div className="step-card">
      <h2>告诉我你的学习目标</h2>
      <p className="step-desc">用一句话描述你想学什么，系统会帮你制定学习计划。</p>
      <input
        type="text"
        className="input"
        placeholder="例如：我想学会 Python 数据分析"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
      />
      <button className="btn btn-primary" onClick={onSubmit} disabled={!value.trim()}>
        确认目标
      </button>
    </div>
  )
}

function InterviewStep({ answers, onChange, onSubmit, onBack }: {
  answers: string[]
  onChange: (a: string[]) => void
  onSubmit: () => void
  onBack: () => void
}) {
  const questions = MOCK_INTERVIEW_ANSWERS

  return (
    <div className="step-card">
      <h2>目标澄清</h2>
      <p className="step-desc">回答几个问题，帮助系统更好地理解你的需求。</p>
      {questions.slice(0, 3).map((q, i) => (
        <div key={q.questionId} className="interview-item">
          <label className="interview-question">{q.question}</label>
          <textarea
            className="input textarea"
            placeholder="输入你的回答..."
            value={answers[i] || ''}
            onChange={(e) => {
              const next = [...answers]
              next[i] = e.target.value
              onChange(next)
            }}
          />
        </div>
      ))}
      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>上一步</button>
        <button className="btn btn-primary" onClick={onSubmit}>生成计划</button>
      </div>
    </div>
  )
}

function RoadmapStep({ roadmap, onContinue, onBack }: {
  roadmap: { id: string; title: string; description: string; order: number; status: string }[]
  onContinue: () => void
  onBack: () => void
}) {
  return (
    <div className="step-card">
      <h2>学习路线图</h2>
      <p className="step-desc">基于你的目标，系统生成了以下学习阶段。</p>
      <div className="roadmap-list">
        {roadmap.map((stage) => (
          <div key={stage.id} className={`roadmap-item roadmap-item--${stage.status}`}>
            <div className="roadmap-order">{stage.order}</div>
            <div className="roadmap-content">
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </div>
            <span className={`status-tag status-tag--${stage.status}`}>
              {stage.status === 'completed' ? '已完成' : stage.status === 'active' ? '进行中' : '待开始'}
            </span>
          </div>
        ))}
      </div>
      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>上一步</button>
        <button className="btn btn-primary" onClick={onContinue}>开始今日任务</button>
      </div>
    </div>
  )
}

function DailyTaskStep({ tasks, onContinue, onBack }: {
  tasks: { id: string; title: string; description: string; status: string }[]
  onContinue: () => void
  onBack: () => void
}) {
  return (
    <div className="step-card">
      <h2>今日任务</h2>
      <p className="step-desc">今天的学习任务如下。</p>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task-item task-item--${task.status}`}>
            <div className="task-content">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <span className={`status-tag status-tag--${task.status}`}>
              {task.status === 'completed' ? '已完成' : task.status === 'in_progress' ? '进行中' : '待开始'}
            </span>
          </div>
        ))}
      </div>
      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>上一步</button>
        <button className="btn btn-primary" onClick={onContinue}>提交总结</button>
      </div>
    </div>
  )
}

function SubmissionStep({ value, onChange, onSubmit, onBack }: {
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  onBack: () => void
}) {
  return (
    <div className="step-card">
      <h2>提交学习总结</h2>
      <p className="step-desc">记录今天的学习内容和收获。</p>
      <textarea
        className="input textarea textarea-large"
        placeholder="描述今天学了什么、遇到了什么问题..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>上一步</button>
        <button className="btn btn-primary" onClick={onSubmit} disabled={!value.trim()}>
          提交并获取评估
        </button>
      </div>
    </div>
  )
}

function EvaluationStep({ evaluations, onContinue, onBack }: {
  evaluations: { submissionId: string; score: number; feedback: string; strengths: string[]; improvements: string[] }[]
  onContinue: () => void
  onBack: () => void
}) {
  const evalItem = evaluations[0]
  if (!evalItem) return null

  return (
    <div className="step-card">
      <h2>AI 评估结果</h2>
      <p className="step-desc">基于你的提交，系统给出了以下评估。</p>
      <div className="eval-score">
        <span className="eval-score-num">{evalItem.score}</span>
        <span className="eval-score-label">/ 100</span>
      </div>
      <div className="eval-section">
        <h3>综合评价</h3>
        <p>{evalItem.feedback}</p>
      </div>
      <div className="eval-section">
        <h3>优势</h3>
        <ul>
          {evalItem.strengths.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
      <div className="eval-section">
        <h3>改进建议</h3>
        <ul>
          {evalItem.improvements.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>上一步</button>
        <button className="btn btn-primary" onClick={onContinue}>查看知识卡片</button>
      </div>
    </div>
  )
}

function KnowledgeCardsStep({ cards, onContinue, onBack }: {
  cards: { id: string; type: string; content: string; sourceSubmissionId: string }[]
  onContinue: () => void
  onBack: () => void
}) {
  const typeLabels: Record<string, string> = {
    insight: '洞察',
    misconception: '误区',
    weakness: '薄弱点',
    correction: '纠正',
  }
  const typeColors: Record<string, string> = {
    insight: 'card-insight',
    misconception: 'card-misconception',
    weakness: 'card-weakness',
    correction: 'card-correction',
  }

  return (
    <div className="step-card">
      <h2>知识卡片</h2>
      <p className="step-desc">系统从你的提交中提取了以下知识点。</p>
      <div className="card-grid">
        {cards.map((card) => (
          <div key={card.id} className={`knowledge-card ${typeColors[card.type] || ''}`}>
            <span className="knowledge-card-type">{typeLabels[card.type] || card.type}</span>
            <p>{card.content}</p>
          </div>
        ))}
      </div>
      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>上一步</button>
        <button className="btn btn-primary" onClick={onContinue}>查看下一轮计划</button>
      </div>
    </div>
  )
}

function NextPlanStep({ plan, onReset, onBack }: {
  plan: { summary: string; adjustments: string[]; nextFocusAreas: string[] } | null
  onReset: () => void
  onBack: () => void
}) {
  if (!plan) return null

  return (
    <div className="step-card">
      <h2>下一轮计划</h2>
      <p className="step-desc">基于本次学习情况，系统建议如下调整。</p>
      <div className="plan-summary">
        <h3>阶段总结</h3>
        <p>{plan.summary}</p>
      </div>
      <div className="plan-section">
        <h3>计划调整</h3>
        <ul>
          {plan.adjustments.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </div>
      <div className="plan-section">
        <h3>下阶段重点</h3>
        <ul>
          {plan.nextFocusAreas.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </div>
      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>上一步</button>
        <button className="btn btn-primary" onClick={onReset}>重新开始</button>
      </div>
    </div>
  )
}

export default Demo
