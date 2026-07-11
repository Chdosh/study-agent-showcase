import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Demo from './pages/Demo'
import Architecture from './pages/Architecture'
import DesktopApp from './pages/DesktopApp'
import About from './pages/About'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="demo" element={<Demo />} />
        <Route path="architecture" element={<Architecture />} />
        <Route path="desktop-app" element={<DesktopApp />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
