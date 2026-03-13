import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    // Por ahora solo redirigimos al login
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
         style={{backgroundColor: '#0f1117'}}>

      <div className="w-full max-w-md p-8 rounded-2xl"
           style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>

        {/* Título */}
        <h1 className="text-2xl font-bold mb-2" style={{color: '#e2e8f0'}}>
          Crear Cuenta
        </h1>
        <p className="mb-8 text-sm" style={{color: '#8892a4'}}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{color: '#3b82f6'}} className="hover:underline">
            Inicia sesión aquí
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
              Nombre completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
              className="px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: '#0f1117',
                border: '1px solid #2a2d3a',
                color: '#e2e8f0'
              }}
            />
          </div>

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
              className="px-4 py-3 rounded-lg text-sm outline-none"
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
              className="px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: '#0f1117',
                border: '1px solid #2a2d3a',
                color: '#e2e8f0'
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{color: '#8892a4'}}>
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="px-4 py-3 rounded-lg text-sm outline-none"
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
            Crear Cuenta
          </button>

        </form>
      </div>
    </div>
  )
}

export default Register;