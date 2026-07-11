import type {
  DemoStep,
  Goal,
  InterviewAnswer,
  RoadmapStage,
  DailyTask,
  Submission,
  Evaluation,
  KnowledgeCard,
  NextPlan,
  DemoState,
} from './types'

export const DEMO_STEPS: DemoStep[] = [
  'goal_input',
  'interview',
  'roadmap',
  'daily_task',
  'submission',
  'evaluation',
  'knowledge_cards',
  'next_plan',
]

export const INITIAL_DEMO_STATE: DemoState = {
  currentStep: 'goal_input',
  goal: null,
  interviewAnswers: [],
  roadmap: [],
  dailyTasks: [],
  submissions: [],
  evaluations: [],
  knowledgeCards: [],
  nextPlan: null,
  startedAt: null,
  updatedAt: null,
}

export const MOCK_GOAL: Goal = {
  raw: '我想学会 Python 数据分析',
  clarified: '掌握 Python 数据分析核心技能，能够独立完成从数据清洗到可视化的完整流程',
  subject: 'Python 数据分析',
  durationDays: 30,
}

export const MOCK_INTERVIEW_ANSWERS: InterviewAnswer[] = [
  {
    questionId: 'q1',
    question: '你目前的数据分析基础如何？',
    answer: '我有一些 Excel 基础，会用基本的图表和透视表，但没有编程经验。',
  },
  {
    questionId: 'q2',
    question: '你每天能投入多少时间学习？',
    answer: '工作日大约 1-2 小时，周末可以 3-4 小时。',
  },
  {
    questionId: 'q3',
    question: '你学习数据分析的主要用途是什么？',
    answer: '工作中需要处理销售数据，希望用 Python 自动化报表生成。',
  },
  {
    questionId: 'q4',
    question: '你有具体的截止日期吗？',
    answer: '希望一个月内能独立完成基础分析任务。',
  },
]

export const MOCK_ROADMAP: RoadmapStage[] = [
  {
    id: 'stage-1',
    title: 'Python 基础语法',
    description: '变量、数据类型、控制流、函数、文件操作',
    order: 1,
    status: 'completed',
  },
  {
    id: 'stage-2',
    title: '数据处理核心库',
    description: 'NumPy 数组运算与 Pandas DataFrame 操作',
    order: 2,
    status: 'active',
  },
  {
    id: 'stage-3',
    title: '数据清洗实战',
    description: '缺失值处理、异常检测、数据标准化',
    order: 3,
    status: 'pending',
  },
  {
    id: 'stage-4',
    title: '数据可视化',
    description: 'Matplotlib 基础图表与 Seaborn 高级可视化',
    order: 4,
    status: 'pending',
  },
  {
    id: 'stage-5',
    title: '综合项目实战',
    description: '完成一个完整的销售数据分析项目',
    order: 5,
    status: 'pending',
  },
]

export const MOCK_DAILY_TASKS: DailyTask[] = [
  {
    id: 'task-1',
    title: 'Pandas DataFrame 基本操作',
    description: '学习 DataFrame 的创建、索引、筛选方法',
    status: 'in_progress',
    submissions: [],
  },
  {
    id: 'task-2',
    title: '数据筛选与排序',
    description: '掌握条件筛选、多列排序、分组聚合',
    status: 'pending',
    submissions: [],
  },
  {
    id: 'task-3',
    title: '缺失值处理实战',
    description: '识别并处理真实数据集中的缺失值',
    status: 'pending',
    submissions: [],
  },
]

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-1',
    taskId: 'task-1',
    content: '今天学习了 Pandas DataFrame 的创建和索引操作。通过练习掌握了 loc 和 iloc 的区别，能够使用布尔索引筛选数据。接下来需要深入理解 groupby 的用法。',
    submittedAt: '2026-07-10T14:30:00Z',
  },
]

export const MOCK_EVALUATIONS: Evaluation[] = [
  {
    submissionId: 'sub-1',
    score: 78,
    feedback: '对 DataFrame 索引的理解较为准确，能够区分 loc 和 iloc。但在实际应用场景的描述上还可以更具体。',
    strengths: [
      '准确理解了标签索引与位置索引的区别',
      '能够举例说明不同场景的使用方式',
    ],
    improvements: [
      '建议补充完整的数据处理流程示例',
      '可以增加对性能优化的思考',
    ],
  },
]

export const MOCK_KNOWLEDGE_CARDS: KnowledgeCard[] = [
  {
    id: 'kc-1',
    type: 'misconception',
    content: '初学者容易混淆 apply 与 vectorized 运算的性能差异',
    sourceSubmissionId: 'sub-1',
  },
  {
    id: 'kc-2',
    type: 'weakness',
    content: '对 groupby 分组的理解还不够深入',
    sourceSubmissionId: 'sub-1',
  },
  {
    id: 'kc-3',
    type: 'insight',
    content: '已掌握 DataFrame 索引的核心概念',
    sourceSubmissionId: 'sub-1',
  },
]

export const MOCK_NEXT_PLAN: NextPlan = {
  summary: '已完成 Python 基础语法阶段，当前处于数据处理核心库学习阶段。建议进入数据清洗实战。',
  adjustments: [
    '增加更多真实数据集练习时间',
    '补充数据可视化入门内容作为辅助',
  ],
  nextFocusAreas: [
    '数据清洗流程标准化',
    '异常值检测方法',
    '数据类型转换技巧',
  ],
}
