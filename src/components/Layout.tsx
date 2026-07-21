import { Link, Outlet, useLocation } from 'react-router-dom'
import './layout.css'

const navItems = [
  { path: '/', label: '首页' },
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
            <span className="brand-mark">冬</span>
            <span className="brand-copy">
              <strong>冬生</strong>
              <small>个人网站</small>
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
          <p>项目、想法与持续实践。</p>
          <p>冬生 &middot; 个人网站</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
