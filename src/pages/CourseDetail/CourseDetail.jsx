import { useParams, useNavigate } from 'react-router-dom'
import { courses } from '../../data/courses'
import { useAuth } from '../../context/AuthContext'

function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const course = courses.find(c => c.id === parseInt(id))

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center"
           style={{backgroundColor: '#0f1117'}}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{color: '#e2e8f0'}}>
            Curso no encontrado
          </h1>
          <button onClick={() => navigate('/courses')}
                  className="mt-4 px-6 py-2 rounded-lg text-white"
                  style={{backgroundColor: '#3b82f6'}}>
            Ver todos los cursos
          </button>
        </div>
      </div>
    )
  }

  const handleEnroll = () => {
    if (!user) {
      navigate('/login')
    } else {
      alert(`¡Te has inscrito en "${course.title}"!`)
    }
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#0f1117'}}>

      {/* Hero del curso */}
      <div className="px-6 py-10" style={{backgroundColor: '#1a1d27', borderBottom: '1px solid #2a2d3a'}}>
        <div className="max-w-4xl mx-auto">

          {/* Categoría y nivel */}
          <div className="flex gap-2 mb-4">
            <span className="text-xs px-2 py-1 rounded-full"
                  style={{backgroundColor: '#1e3a5f', color: '#3b82f6'}}>
              {course.category}
            </span>
            <span className="text-xs px-2 py-1 rounded-full"
                  style={{backgroundColor: '#2a2d3a', color: '#8892a4'}}>
              {course.level}
            </span>
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold mb-3" style={{color: '#e2e8f0'}}>
            {course.title}
          </h1>

          {/* Descripción */}
          <p className="text-base mb-6" style={{color: '#8892a4'}}>
            {course.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-sm" style={{color: '#8892a4'}}>
            <span>★ <strong style={{color: '#f59e0b'}}>{course.rating}</strong> valoración</span>
            <span>👥 {course.students.toLocaleString()} estudiantes</span>
            <span>⏱ {course.duration}</span>
            <span>🎓 Instructor: <strong style={{color: '#e2e8f0'}}>{course.instructor}</strong></span>
          </div>

        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8">

        {/* Imagen / Video placeholder */}
        <div className="rounded-xl overflow-hidden"
             style={{border: '1px solid #2a2d3a'}}>
          <img src={course.image} alt={course.title} className="w-full object-cover" />
          <div className="flex items-center justify-center py-6"
               style={{backgroundColor: '#1a1d27'}}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                   style={{backgroundColor: '#3b82f6'}}>
                ▶
              </div>
              <span style={{color: '#8892a4'}}>Vista previa del curso</span>
            </div>
          </div>
        </div>

        {/* Lo que aprenderás */}
        <div className="p-6 rounded-xl" style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>
          <h2 className="text-lg font-bold mb-4" style={{color: '#e2e8f0'}}>
            Lo que aprenderás
          </h2>
          <div className="grid grid-cols-1 gap-2"
               style={{gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'}}>
            {['Fundamentos sólidos', 'Proyectos prácticos', 'Buenas prácticas', 'Casos reales'].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm" style={{color: '#8892a4'}}>
                <span style={{color: '#3b82f6'}}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Card de inscripción */}
        <div className="p-6 rounded-xl" style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-3xl font-bold" style={{color: '#e2e8f0'}}>
                ${course.price} <span className="text-sm font-normal" style={{color: '#8892a4'}}>MXN</span>
              </p>
              <p className="text-sm mt-1" style={{color: '#8892a4'}}>Acceso de por vida</p>
            </div>
            <button
              onClick={handleEnroll}
              className="px-8 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
              style={{backgroundColor: '#3b82f6'}}>
              {user ? 'Inscribirse ahora' : 'Iniciar sesión para inscribirse'}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CourseDetail