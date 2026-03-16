import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      return setError('Las contraseñas no coinciden')
    }
    if (formData.password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres')
    }

    setLoading(true)
    try {
      await register(formData.name, formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError('Error al crear la cuenta. El correo ya puede estar en uso.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
         style={{backgroundColor: '#0f1117'}}>
      <div className="w-full max-w-md p-8 rounded-2xl"
           style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>

        <h1 className="text-2xl font-bold mb-2" style={{color: '#e2e8f0'}}>
          Crear Cuenta
        </h1>
        <p className="mb-8 text-sm" style={{color: '#8892a4'}}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{color: '#3b82f6'}} className="hover:underline">
            Inicia sesión aquí
          </Link>
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm"
               style={{backgroundColor: '#2d1f1f', color: '#f87171', border: '1px solid #7f1d1d'}}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { label: 'Nombre completo', name: 'name', type: 'text', placeholder: 'Tu nombre' },
            { label: 'Correo electrónico', name: 'email', type: 'email', placeholder: 'tu@correo.com' },
            { label: 'Contraseña', name: 'password', type: 'password', placeholder: '••••••••' },
            { label: 'Confirmar contraseña', name: 'confirmPassword', type: 'password', placeholder: '••••••••' },
          ].map(field => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{color: '#8892a4'}}>
                {field.label}
              </label>
              <input type={field.type} name={field.name}
                     value={formData[field.name]} onChange={handleChange}
                     placeholder={field.placeholder} required
                     className="px-4 py-3 rounded-lg text-sm outline-none"
                     style={{backgroundColor: '#0f1117', border: '1px solid #2a2d3a', color: '#e2e8f0'}} />
            </div>
          ))}

          <button type="submit" disabled={loading}
                  className="mt-2 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                  style={{backgroundColor: '#3b82f6', opacity: loading ? 0.7 : 1}}>
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Register