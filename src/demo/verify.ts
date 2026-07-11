const store = new Map<string, string>()

globalThis.localStorage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => { store.set(key, value) },
  removeItem: (key: string) => { store.delete(key) },
  clear: () => { store.clear() },
  key: (index: number) => Array.from(store.keys())[index] ?? null,
  get length() { return store.size },
}

import { loadDemoState, saveDemoState, resetDemoState, saveCurrentStep, saveGoal, saveInterviewAnswers, saveSubmission, clearDemoStorage } from './demoRepository.ts'
import type { DemoState } from './types.ts'
import { MOCK_GOAL, MOCK_INTERVIEW_ANSWERS, MOCK_ROADMAP, MOCK_DAILY_TASKS, MOCK_SUBMISSIONS, MOCK_EVALUATIONS, MOCK_KNOWLEDGE_CARDS, MOCK_NEXT_PLAN } from './mockData.ts'

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(`Assertion failed: ${message}`)
}

let failures = 0

function test(description: string, fn: () => void): void {
  try {
    fn()
    console.log(`  PASS: ${description}`)
  } catch (error) {
    console.error(`  FAIL: ${description}`)
    console.error(`    ${error instanceof Error ? error.message : String(error)}`)
    failures++
  }
}

console.log('Demo Data Layer Verification\n')

test('loadDemoState returns initial state when storage empty', () => {
  clearDemoStorage()
  const state = loadDemoState()
  assert(state.currentStep === 'goal_input', 'initial step should be goal_input')
  assert(state.goal === null, 'goal should be null')
  assert(state.interviewAnswers.length === 0, 'interviewAnswers should be empty')
})

test('resetDemoState creates fresh state with timestamps', () => {
  const state = resetDemoState()
  assert(state.startedAt !== null, 'startedAt should be set')
  assert(state.updatedAt !== null, 'updatedAt should be set')
})

test('saveGoal roundtrip preserves data', () => {
  clearDemoStorage()
  saveGoal(MOCK_GOAL)
  const state = loadDemoState()
  assert(state.goal?.subject === MOCK_GOAL.subject, 'subject should match')
  assert(state.goal?.raw === MOCK_GOAL.raw, 'raw should match')
  assert(state.startedAt !== null, 'startedAt auto-set on first goal')
})

test('saveInterviewAnswers roundtrip preserves data', () => {
  clearDemoStorage()
  saveInterviewAnswers(MOCK_INTERVIEW_ANSWERS)
  const state = loadDemoState()
  assert(state.interviewAnswers.length === 4, 'should have 4 answers')
  assert(state.interviewAnswers[0]!.questionId === 'q1', 'first id should match')
})

test('saveSubmission roundtrip preserves data and updates task', () => {
  clearDemoStorage()
  saveSubmission(MOCK_SUBMISSIONS[0]!)
  const state = loadDemoState()
  assert(state.submissions.length === 1, 'should have 1 submission')
  assert(state.submissions[0]!.id === 'sub-1', 'submission id should match')
})

test('saveCurrentStep updates step', () => {
  clearDemoStorage()
  saveCurrentStep('roadmap')
  const state = loadDemoState()
  assert(state.currentStep === 'roadmap', 'should be roadmap')
})

test('saveDemoState merges all sections', () => {
  clearDemoStorage()
  const initial = loadDemoState()
  const updated: DemoState = {
    ...initial,
    roadmap: MOCK_ROADMAP,
    dailyTasks: MOCK_DAILY_TASKS,
    evaluations: MOCK_EVALUATIONS,
    knowledgeCards: MOCK_KNOWLEDGE_CARDS,
    nextPlan: MOCK_NEXT_PLAN,
  }
  saveDemoState(updated)
  const state = loadDemoState()
  assert(state.roadmap.length === 5, 'should have 5 roadmap stages')
  assert(state.dailyTasks.length === 3, 'should have 3 daily tasks')
  assert(state.evaluations.length === 1, 'should have 1 evaluation')
  assert(state.knowledgeCards.length === 3, 'should have 3 knowledge cards')
  assert(state.nextPlan !== null, 'nextPlan should not be null')
})

test('resetDemoState clears all sections', () => {
  saveGoal(MOCK_GOAL)
  saveCurrentStep('evaluation')
  resetDemoState()
  const state = loadDemoState()
  assert(state.currentStep === 'goal_input', 'should reset to goal_input')
  assert(state.goal === null, 'goal should be null')
  assert(state.updatedAt !== null, 'updatedAt should remain')
})

test('corrupted storage falls back to initial state', () => {
  localStorage.setItem('study_agent_demo_state', '{invalid json')
  const state = loadDemoState()
  assert(state.currentStep === 'goal_input', 'should fall back to initial')
})

test('clearDemoStorage removes state', () => {
  saveGoal(MOCK_GOAL)
  clearDemoStorage()
  const state = loadDemoState()
  assert(state.goal === null, 'goal should be null after clear')
})

console.log(`\n  ${failures === 0 ? 'ALL TESTS PASSED ✓' : `${failures} TEST(S) FAILED ✗`}`)
if (failures > 0) process.exit(1)
