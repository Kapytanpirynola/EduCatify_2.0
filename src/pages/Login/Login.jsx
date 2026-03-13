import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { users } from '../../data/users'
import { useAuth } from '../../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = users.find(
      u => u.email === formData.email && u.password === formData.password
    )
    if (user) {
      login(user)
      navigate('/dashboard')
    } else {
      setError('Correo o contraseña incorrectos')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
         style={{backgroundColor: '#0f1117'}}>
      
      <div className="w-full max-w-md p-8 rounded-2xl"
           style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>

        {/* Título */}
        <h1 className="text-2xl font-bold mb-2" style={{color: '#e2e8f0'}}>
          Iniciar Sesión
        </h1>
        <p className="mb-8 text-sm" style={{color: '#8892a4'}}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" style={{color: '#3b82f6'}} className="hover:underline">
            Regístrate aquí
          </Link>
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm"
               style={{backgroundColor: '#2d1f1f', color: '#f87171', border: '1px solid #7f1d1d'}}>
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{color: '#8892a4'}}>
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@correo.com"
              required
              className="px-4 py-3 rounded-lg text-sm outline-none transition-all"
              style={{
                backgroundColor: '#0f1117',
                border: '1px solid #2a2d3a',
                color: '#e2e8f0'
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{color: '#8892a4'}}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="px-4 py-3 rounded-lg text-sm outline-none transition-all"
              style={{
                backgroundColor: '#0f1117',
                border: '1px solid #2a2d3a',
                color: '#e2e8f0'
              }}
            />
          </div>

          <button
            type="submit"
            className="mt-2 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
            style={{backgroundColor: '#3b82f6'}}>
            Iniciar Sesión
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login;