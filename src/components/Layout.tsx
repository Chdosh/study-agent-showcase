import { Link, Outlet, useLocation } from 'react-router-dom'
import './layout.css'

const navItems = [
  { path: '/', label: '首页' },
  { path: '/demo', label: '演示' },
  { path: '/architecture', label: '架构' },
  { path: '/desktop-app', label: '桌面应用' },
  { path: '/about', label: '关于' },
]

function Layout() {
  const location = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav-brand">
            Study Agent
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
        <p>Study Agent Showcase &middot; 独立 Web 展示站点</p>
      </footer>
    </div>
  )
}

export default Layout
