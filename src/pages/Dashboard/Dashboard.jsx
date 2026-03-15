import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { courses } from '../../data/courses';

const enrolledIds = [1, 2, 3]
const progressMap = { 1: 100, 2: 60, 3: 20 }

function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('cursos')

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user])

  if (!user) return null

  const enrolledCourses = courses.filter(c => enrolledIds.includes(c.id))
  const completedCourses = enrolledCourses.filter(c => progressMap[c.id] === 100)
  const totalHours = enrolledCourses.reduce((acc, c) => {
    const h = parseFloat(c.duration)
    return acc + h
  }, 0).toFixed(0)

  return (
    <div className="min-h-screen px-6 py-8" style={{backgroundColor: '#0f1117'}}>
      <div className="max-w-5xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold" style={{color: '#e2e8f0'}}>
              Hola, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="mt-1 text-sm" style={{color: '#8892a4'}}>
              Continúa aprendiendo donde lo dejaste
            </p>
          </div>
          <Link to="/courses"
                className="px-5 py-2 rounded-lg text-sm text-white transition-opacity hover:opacity-90"
                style={{backgroundColor: '#3b82f6'}}>
            + Explorar más cursos
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4"
             style={{gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'}}>
          {[
            { label: 'Cursos inscritos', value: enrolledCourses.length, icon: '📚' },
            { label: 'Cursos completados', value: completedCourses.length, icon: '✅' },
            { label: 'Horas aprendidas', value: `${totalHours}h`, icon: '⏱' },
            { label: 'Certificados', value: completedCourses.length, icon: '🏆' },
          ].map(stat => (
            <div key={stat.label} className="p-5 rounded-xl flex items-center gap-4"
                 style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-2xl font-bold" style={{color: '#e2e8f0'}}>{stat.value}</p>
                <p className="text-xs" style={{color: '#8892a4'}}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-lg w-fit"
             style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>
          {['cursos', 'completados', 'perfil'].map(tab => (
            <button key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="px-5 py-2 rounded-md text-sm font-medium capitalize transition-all"
                    style={{
                      backgroundColor: activeTab === tab ? '#3b82f6' : 'transparent',
                      color: activeTab === tab ? '#ffffff' : '#8892a4'
                    }}>
              {tab === 'cursos' ? 'Mis Cursos' : tab === 'completados' ? 'Completados' : 'Mi Perfil'}
            </button>
          ))}
        </div>

        {/* Tab: Mis Cursos */}
        {activeTab === 'cursos' && (
          <div className="flex flex-col gap-4">
            {enrolledCourses.map(course => (
              <Link to={`/courses/${course.id}`} key={course.id}
                    className="p-4 rounded-xl flex items-center gap-4 transition-opacity hover:opacity-80"
                    style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>
                <img src={course.image} alt={course.title}
                     className="w-20 h-14 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate" style={{color: '#e2e8f0'}}>
                    {course.title}
                  </h3>
                  <p className="text-xs mt-1" style={{color: '#8892a4'}}>{course.instructor}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1" style={{color: '#8892a4'}}>
                      <span>Progreso</span>
                      <span>{progressMap[course.id]}%</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{backgroundColor: '#2a2d3a'}}>
                      <div className="h-1.5 rounded-full transition-all"
                           style={{
                             backgroundColor: progressMap[course.id] === 100 ? '#22c55e' : '#3b82f6',
                             width: `${progressMap[course.id]}%`
                           }} />
                    </div>
                  </div>
                </div>
                <span className="text-xs flex-shrink-0" style={{color: '#8892a4'}}>
                  {course.duration}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Tab: Completados */}
        {activeTab === 'completados' && (
          <div className="flex flex-col gap-4">
            {completedCourses.length > 0 ? completedCourses.map(course => (
              <div key={course.id}
                   className="p-4 rounded-xl flex items-center gap-4"
                   style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>
                <img src={course.image} alt={course.title}
                     className="w-20 h-14 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-medium text-sm" style={{color: '#e2e8f0'}}>{course.title}</h3>
                  <p className="text-xs mt-1" style={{color: '#8892a4'}}>{course.instructor}</p>
                  <span className="text-xs mt-2 inline-block px-2 py-1 rounded-full"
                        style={{backgroundColor: '#14532d', color: '#22c55e'}}>
                    ✓ Completado
                  </span>
                </div>
                <button className="px-4 py-2 rounded-lg text-xs font-medium transition-opacity hover:opacity-90"
                        style={{backgroundColor: '#1e3a5f', color: '#3b82f6'}}>
                  Ver certificado
                </button>
              </div>
            )) : (
              <div className="text-center py-16" style={{color: '#8892a4'}}>
                <p className="text-lg">Aún no has completado ningún curso</p>
                <Link to="/courses" className="text-sm mt-2 inline-block hover:underline"
                      style={{color: '#3b82f6'}}>
                  Explorar cursos →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab: Perfil */}
        {activeTab === 'perfil' && (
          <div className="p-6 rounded-xl flex flex-col gap-6"
               style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>

            {/* Avatar y nombre */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white"
                   style={{backgroundColor: '#3b82f6'}}>
                {user.avatar}
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{color: '#e2e8f0'}}>{user.name}</h2>
                <p className="text-sm" style={{color: '#8892a4'}}>{user.email}</p>
                <span className="text-xs px-2 py-1 rounded-full mt-1 inline-block capitalize"
                      style={{backgroundColor: '#1e3a5f', color: '#3b82f6'}}>
                  {user.role}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="grid grid-cols-1 gap-3"
                 style={{gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'}}>
              {[
                { label: 'Nombre', value: user.name },
                { label: 'Correo', value: user.email },
                { label: 'Rol', value: user.role },
                { label: 'Miembro desde', value: 'Marzo 2026' },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-lg"
                     style={{backgroundColor: '#0f1117', border: '1px solid #2a2d3a'}}>
                  <p className="text-xs mb-1" style={{color: '#8892a4'}}>{item.label}</p>
                  <p className="text-sm font-medium capitalize" style={{color: '#e2e8f0'}}>{item.value}</p>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard;