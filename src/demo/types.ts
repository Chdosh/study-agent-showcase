export type DemoStep =
  | 'goal_input'
  | 'interview'
  | 'roadmap'
  | 'daily_task'
  | 'submission'
  | 'evaluation'
  | 'knowledge_cards'
  | 'next_plan'

export interface Goal {
  raw: string
  clarified: string
  subject: string
  durationDays: number
}

export interface InterviewAnswer {
  questionId: string
  question: string
  answer: string
}

export interface RoadmapStage {
  id: string
  title: string
  description: string
  order: number
  status: 'pending' | 'active' | 'completed'
}

export interface DailyTask {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  submissions?: Submission[]
}

export interface Submission {
  id: string
  taskId: string
  content: string
  submittedAt: string
}

export interface Evaluation {
  submissionId: string
  score: number
  feedback: string
  strengths: string[]
  improvements: string[]
}

export interface KnowledgeCard {
  id: string
  type: 'insight' | 'misconception' | 'weakness' | 'correction'
  content: string
  sourceSubmissionId: string
}

export interface NextPlan {
  summary: string
  adjustments: string[]
  nextFocusAreas: string[]
}

export interface DemoState {
  currentStep: DemoStep
  goal: Goal | null
  interviewAnswers: InterviewAnswer[]
  roadmap: RoadmapStage[]
  dailyTasks: DailyTask[]
  submissions: Submission[]
  evaluations: Evaluation[]
  knowledgeCards: KnowledgeCard[]
  nextPlan: NextPlan | null
  startedAt: string | null
  updatedAt: string | null
}
