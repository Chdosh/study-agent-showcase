import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Demo from './pages/Demo'
import About from './pages/About'
import ProjectPlaceholder from './pages/ProjectPlaceholder'
import AILearningCopilot from './pages/AILearningCopilot'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="demo" element={<Demo />} />
        <Route path="demo2" element={<AILearningCopilot />} />
        <Route path="demo3" element={<ProjectPlaceholder number="03" />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
