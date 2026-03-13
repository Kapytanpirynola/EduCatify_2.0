import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { courses } from '../../data/courses';

// Simulamos cursos inscritos con los primeros 3
const enrolledIds = [1, 2, 3]

function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Si no hay sesión, redirige al login
  useEffect(() => {
    if (!user) navigate('/login')
  }, [user])

  if (!user) return null

  const enrolledCourses = courses.filter(c => enrolledIds.includes(c.id))

  return (
    <div className="min-h-screen px-6 py-8" style={{backgroundColor: '#0f1117'}}>
      <div className="max-w-5xl mx-auto flex flex-col gap-8">

        {/* Saludo */}
        <div>
          <h1 className="text-3xl font-bold" style={{color: '#e2e8f0'}}>
            Hola, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="mt-1 text-sm" style={{color: '#8892a4'}}>
            Continúa aprendiendo donde lo dejaste
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4"
             style={{gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'}}>
          {[
            { label: 'Cursos inscritos', value: enrolledCourses.length, icon: '📚' },
            { label: 'Cursos completados', value: 1, icon: '✅' },
            { label: 'Horas aprendidas', value: '42h', icon: '⏱' },
            { label: 'Certificados', value: 1, icon: '🏆' },
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

        {/* Mis cursos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold" style={{color: '#e2e8f0'}}>
              Mis Cursos
            </h2>
            <Link to="/courses" className="text-sm hover:underline" style={{color: '#3b82f6'}}>
              Ver catálogo
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {enrolledCourses.map((course, index) => (
              <Link to={`/courses/${course.id}`} key={course.id}
                    className="p-4 rounded-xl flex items-center gap-4 transition-opacity hover:opacity-80"
                    style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>

                {/* Imagen */}
                <img src={course.image} alt={course.title}
                     className="w-20 h-14 rounded-lg object-cover flex-shrink-0" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate" style={{color: '#e2e8f0'}}>
                    {course.title}
                  </h3>
                  <p className="text-xs mt-1" style={{color: '#8892a4'}}>
                    {course.instructor}
                  </p>

                  {/* Barra de progreso */}
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1" style={{color: '#8892a4'}}>
                      <span>Progreso</span>
                      <span>{index === 0 ? '100%' : index === 1 ? '60%' : '20%'}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{backgroundColor: '#2a2d3a'}}>
                      <div className="h-1.5 rounded-full"
                           style={{
                             backgroundColor: '#3b82f6',
                             width: index === 0 ? '100%' : index === 1 ? '60%' : '20%'
                           }} />
                    </div>
                  </div>
                </div>

                {/* Duración */}
                <span className="text-xs flex-shrink-0" style={{color: '#8892a4'}}>
                  {course.duration}
                </span>

              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard;