import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Demo from './pages/Demo'
import About from './pages/About'
import AILearningCopilot from './pages/AILearningCopilot'
import PPTWorkflow from './pages/PPTWorkflow'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="demo" element={<Demo />} />
        <Route path="demo2" element={<AILearningCopilot />} />
        <Route path="demo3" element={<PPTWorkflow />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
