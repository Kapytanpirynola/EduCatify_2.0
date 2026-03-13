import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="px-6 py-4 flex items-center justify-between"
    style={{backgroundColor: '#1a1d27', borderBottom: '1px solid #2a2d3a'}}>

      {/* Logo */}
      <Link to="/" className="text-xl font-bold" style={{color: '#e2e8f0'}}>
       <span style={{color: '#3b82f6'}}>{'</>'}</span>Edu<span style={{color: '#3b82f6'}}>Catify</span>
      </Link>

      {/* Links centro */}
      <div className="flex gap-6">
        <Link to="/" style={{color: '#8892a4'}} className="hover:text-white transition-colors">
          Inicio
        </Link>
        <Link to="/courses" style={{color: '#8892a4'}} className="hover:text-white transition-colors">
          Cursos
        </Link>
      </div>

      {/* Derecha — cambia según si hay sesión */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* Avatar y nombre */}
            <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                   style={{backgroundColor: '#3b82f6'}}>
                {user.avatar}
              </div>
              <span className="text-sm font-medium" style={{color: '#e2e8f0'}}>
                {user.name}
              </span>
            </Link>

            {/* Botón cerrar sesión */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-sm transition-opacity hover:opacity-80"
              style={{backgroundColor: '#2a2d3a', color: '#8892a4'}}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{color: '#8892a4'}}
                  className="px-4 py-2 hover:text-white transition-colors">
              Iniciar Sesión
            </Link>
            <Link to="/register"
                  className="px-4 py-2 rounded-lg text-white text-sm transition-opacity hover:opacity-90"
                  style={{backgroundColor: '#3b82f6'}}>
              Registrarse
            </Link>
          </>
        )}
      </div>

    </nav>
  )
}

export default Navbar