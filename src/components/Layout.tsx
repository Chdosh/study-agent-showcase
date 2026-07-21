import { Link, Outlet, useLocation } from 'react-router-dom'
import './layout.css'

const navItems = [
  { path: '/', label: '作品' },
  { path: '/demo', label: 'Study Agent' },
  { path: '/demo2', label: 'AI Learning Copilot' },
  { path: '/demo3', label: 'Image to PPT' },
  { path: '/about', label: '关于我' },
]

function Layout() {
  const location = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav-brand">
            <span className="brand-mark">P.</span>
            <span className="brand-copy">
              <strong>陈东升</strong>
              <small>AI 应用开发工程师</small>
            </span>
          </Link>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'nav-link--active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <p>用产品思维做工程，用工程能力实现想法。</p>
          <p>静态作品集 &middot; React + TypeScript</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
