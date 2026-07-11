import type { DemoState, DemoStep, Goal, InterviewAnswer, Submission } from './types'
import { INITIAL_DEMO_STATE } from './mockData'

const STORAGE_KEY = 'study_agent_demo_state'

function isDemoState(value: unknown): value is DemoState {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return (
    typeof v.currentStep === 'string' &&
    Array.isArray(v.interviewAnswers) &&
    Array.isArray(v.roadmap) &&
    Array.isArray(v.dailyTasks) &&
    Array.isArray(v.submissions) &&
    Array.isArray(v.evaluations) &&
    Array.isArray(v.knowledgeCards)
  )
}

export function loadDemoState(): DemoState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...INITIAL_DEMO_STATE }
    const parsed: unknown = JSON.parse(raw)
    if (isDemoState(parsed)) return parsed
    return { ...INITIAL_DEMO_STATE }
  } catch {
    return { ...INITIAL_DEMO_STATE }
  }
}

export function saveDemoState(state: DemoState): void {
  try {
    const updated = { ...state, updatedAt: new Date().toISOString() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // localStorage 不可用时静默失败
  }
}

export function resetDemoState(): DemoState {
  const fresh: DemoState = {
    ...INITIAL_DEMO_STATE,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  saveDemoState(fresh)
  return fresh
}

export function saveCurrentStep(step: DemoStep): DemoState {
  const state = loadDemoState()
  const updated = { ...state, currentStep: step }
  saveDemoState(updated)
  return updated
}

export function saveGoal(goal: Goal): DemoState {
  const state = loadDemoState()
  const updated = { ...state, goal }
  if (!updated.startedAt) updated.startedAt = new Date().toISOString()
  saveDemoState(updated)
  return updated
}

export function saveInterviewAnswers(answers: InterviewAnswer[]): DemoState {
  const state = loadDemoState()
  const updated = { ...state, interviewAnswers: answers }
  saveDemoState(updated)
  return updated
}

export function saveSubmission(submission: Submission): DemoState {
  const state = loadDemoState()
  const submissions = [...state.submissions.filter((s) => s.id !== submission.id), submission]
  const dailyTasks = state.dailyTasks.map((task) =>
    task.id === submission.taskId
      ? { ...task, submissions: [...(task.submissions ?? []).filter((s) => s.id !== submission.id), submission] }
      : task,
  )
  const updated = { ...state, submissions, dailyTasks }
  saveDemoState(updated)
  return updated
}

export function clearDemoStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // 静默失败
  }
}
