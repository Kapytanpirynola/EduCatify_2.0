import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { db, auth } from '../../firebase/firebase';

function Profile() {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value })
  }

const handleUpdateProfile = async (e) => {
  e.preventDefault()
  setSuccessMsg('')
  setErrorMsg('')
  setLoading(true)
  try {
    const newAvatar = formData.name.split(' ').map(n => n[0]).join('').toUpperCase()
    await updateDoc(doc(db, 'users', user.uid), {
      name: formData.name,
      avatar: newAvatar
    })
    updateUser({ name: formData.name, avatar: newAvatar }) // ← línea nueva
    setSuccessMsg('Perfil actualizado correctamente')
  } catch (_err) {
    setErrorMsg('Error al actualizar el perfil')
  } finally {
    setLoading(false)
  }
}

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    setSuccessMsg('')
    setErrorMsg('')

    if (passwords.new !== passwords.confirm) {
      return setErrorMsg('Las contraseñas nuevas no coinciden')
    }
    if (passwords.new.length < 6) {
      return setErrorMsg('La contraseña debe tener al menos 6 caracteres')
    }

    setLoading(true)
    try {
      const credential = EmailAuthProvider.credential(user.email, passwords.current)
      await reauthenticateWithCredential(auth.currentUser, credential)
      await updatePassword(auth.currentUser, passwords.new)
      setSuccessMsg('Contraseña actualizada correctamente')
      setPasswords({ current: '', new: '', confirm: '' })
    } catch (_err) {
      setErrorMsg('Contraseña actual incorrecta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-6 py-8" style={{backgroundColor: '#0f1117'}}>
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold" style={{color: '#e2e8f0'}}>Mi Perfil</h1>
          <p className="text-sm mt-1" style={{color: '#8892a4'}}>
            Administra tu información personal
          </p>
        </div>

        {/* Mensajes */}
        {successMsg && (
          <div className="px-4 py-3 rounded-lg text-sm"
               style={{backgroundColor: '#14532d', color: '#22c55e', border: '1px solid #16a34a'}}>
            ✓ {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="px-4 py-3 rounded-lg text-sm"
               style={{backgroundColor: '#2d1f1f', color: '#f87171', border: '1px solid #7f1d1d'}}>
            {errorMsg}
          </div>
        )}

        {/* Avatar */}
        <div className="p-6 rounded-xl flex items-center gap-4"
             style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
               style={{backgroundColor: '#3b82f6'}}>
            {user?.avatar}
          </div>
          <div>
            <h2 className="text-lg font-bold" style={{color: '#e2e8f0'}}>{user?.name}</h2>
            <p className="text-sm" style={{color: '#8892a4'}}>{user?.email}</p>
            <span className="text-xs px-2 py-1 rounded-full mt-1 inline-block capitalize"
                  style={{backgroundColor: '#1e3a5f', color: '#3b82f6'}}>
              {user?.role}
            </span>
          </div>
        </div>

        {/* Editar información */}
        <form onSubmit={handleUpdateProfile}
              className="p-6 rounded-xl flex flex-col gap-4"
              style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>
          <h3 className="text-base font-semibold" style={{color: '#e2e8f0'}}>
            Información personal
          </h3>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{color: '#8892a4'}}>
              Nombre completo
            </label>
            <input type="text" name="name" value={formData.name}
                   onChange={handleChange} required
                   className="px-4 py-3 rounded-lg text-sm outline-none"
                   style={{backgroundColor: '#0f1117', border: '1px solid #2a2d3a', color: '#e2e8f0'}} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{color: '#8892a4'}}>
              Correo electrónico
            </label>
            <input type="email" value={formData.email} disabled
                   className="px-4 py-3 rounded-lg text-sm outline-none cursor-not-allowed"
                   style={{backgroundColor: '#0f1117', border: '1px solid #2a2d3a', color: '#4a5568'}} />
            <p className="text-xs" style={{color: '#8892a4'}}>El correo no se puede cambiar</p>
          </div>

          <button type="submit" disabled={loading}
                  className="py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                  style={{backgroundColor: '#3b82f6', opacity: loading ? 0.7 : 1}}>
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>

        {/* Cambiar contraseña */}
        <form onSubmit={handleUpdatePassword}
              className="p-6 rounded-xl flex flex-col gap-4"
              style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>
          <h3 className="text-base font-semibold" style={{color: '#e2e8f0'}}>
            Cambiar contraseña
          </h3>

          {[
            { label: 'Contraseña actual', name: 'current' },
            { label: 'Nueva contraseña', name: 'new' },
            { label: 'Confirmar nueva contraseña', name: 'confirm' },
          ].map(field => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{color: '#8892a4'}}>
                {field.label}
              </label>
              <input type="password" name={field.name}
                     value={passwords[field.name]}
                     onChange={handlePasswordChange}
                     placeholder="••••••••" required
                     className="px-4 py-3 rounded-lg text-sm outline-none"
                     style={{backgroundColor: '#0f1117', border: '1px solid #2a2d3a', color: '#e2e8f0'}} />
            </div>
          ))}

          <button type="submit" disabled={loading}
                  className="py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                  style={{backgroundColor: '#3b82f6', opacity: loading ? 0.7 : 1}}>
            {loading ? 'Actualizando...' : 'Cambiar contraseña'}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Profile;