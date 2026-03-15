import { Link } from 'react-router-dom'
import { courses } from '../../data/courses'
import { useAuth } from '../../context/AuthContext'

function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.id}`}
          className="rounded-xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
          style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>
      <img src={course.image} alt={course.title} className="w-full h-36 object-cover" />
      <div className="p-4 flex flex-col gap-2">
        <span className="text-xs px-2 py-1 rounded-full w-fit"
              style={{backgroundColor: '#1e3a5f', color: '#3b82f6'}}>
          {course.category}
        </span>
        <h3 className="font-semibold text-sm" style={{color: '#e2e8f0'}}>
          {course.title}
        </h3>
        <p className="text-xs" style={{color: '#8892a4'}}>{course.instructor}</p>
        <div className="flex items-center justify-between text-xs mt-1">
          <span style={{color: '#f59e0b'}}>★ {course.rating}</span>
          <span style={{color: '#e2e8f0'}} className="font-bold">${course.price} MXN</span>
        </div>
      </div>
    </Link>
  )
}

function Home() {
  const { user } = useAuth()
  const featuredCourses = courses.slice(0, 3)

  return (
    <div className="min-h-screen" style={{backgroundColor: '#0f1117'}}>

      {/* Hero */}
      <section className="px-6 py-20 text-center"
               style={{borderBottom: '1px solid #2a2d3a'}}>
        <div className="max-w-3xl mx-auto">
          <span className="text-xs px-3 py-1 rounded-full inline-block mb-6"
                style={{backgroundColor: '#1e3a5f', color: '#3b82f6', border: '1px solid #3b82f6'}}>
            🚀 La plataforma educativa para developers
          </span>
          <h1 className="text-5xl font-bold leading-tight mb-6" style={{color: '#e2e8f0'}}>
            Aprende a tu ritmo,{' '}
            <span style={{color: '#3b82f6'}}>crece sin límites</span>
          </h1>
          <p className="text-lg mb-10" style={{color: '#8892a4'}}>
            Domina las tecnologías más demandadas con cursos prácticos impartidos por expertos de la industria.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/courses"
                  className="px-8 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                  style={{backgroundColor: '#3b82f6'}}>
              Explorar cursos
            </Link>
            {!user && (
              <Link to="/register"
                    className="px-8 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
                    style={{backgroundColor: '#1a1d27', color: '#e2e8f0', border: '1px solid #2a2d3a'}}>
                Crear cuenta gratis
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-12" style={{borderBottom: '1px solid #2a2d3a'}}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6"
             style={{gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))'}}>
          {[
            { value: '50+', label: 'Cursos disponibles' },
            { value: '10k+', label: 'Estudiantes activos' },
            { value: '20+', label: 'Instructores expertos' },
            { value: '4.8★', label: 'Valoración promedio' },
          ].map(stat => (
            <div key={stat.label} className="text-center p-6 rounded-xl"
                 style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>
              <p className="text-3xl font-bold mb-1" style={{color: '#3b82f6'}}>{stat.value}</p>
              <p className="text-sm" style={{color: '#8892a4'}}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cursos destacados */}
      <section className="px-6 py-12" style={{borderBottom: '1px solid #2a2d3a'}}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold" style={{color: '#e2e8f0'}}>
              Cursos Destacados
            </h2>
            <Link to="/courses" className="text-sm hover:underline" style={{color: '#3b82f6'}}>
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6"
               style={{gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'}}>
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      {!user && (
        <section className="px-6 py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4" style={{color: '#e2e8f0'}}>
              ¿Listo para empezar?
            </h2>
            <p className="mb-8" style={{color: '#8892a4'}}>
              Únete a miles de estudiantes que ya están aprendiendo en EduCatify.
            </p>
            <Link to="/register"
                  className="px-8 py-3 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                  style={{backgroundColor: '#3b82f6'}}>
              Comenzar ahora gratis
            </Link>
          </div>
        </section>
      )}

    </div>
  )
}

export default Home