import { useState } from 'react'
import { Link } from 'react-router-dom'
import { courses } from '../../data/courses'

const categories = ['Todos', 'Programación', 'Data Science', 'Diseño', 'Base de Datos']
const levels = ['Todos', 'Principiante', 'Intermedio', 'Avanzado']

function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.id}`}
          className="rounded-xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
          style={{backgroundColor: '#1a1d27', border: '1px solid #2a2d3a'}}>

      {/* Imagen */}
      <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />

      {/* Contenido */}
      <div className="p-4 flex flex-col gap-2 flex-1">

        {/* Categoría y nivel */}
        <div className="flex gap-2">
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
        <h3 className="font-semibold text-sm leading-snug" style={{color: '#e2e8f0'}}>
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-xs" style={{color: '#8892a4'}}>
          {course.instructor}
        </p>

        {/* Rating y estudiantes */}
        <div className="flex items-center gap-1 text-xs">
          <span style={{color: '#f59e0b'}}>★ {course.rating}</span>
          <span style={{color: '#8892a4'}}>({course.students.toLocaleString()} estudiantes)</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3"
             style={{borderTop: '1px solid #2a2d3a'}}>
          <span className="text-xs" style={{color: '#8892a4'}}>
            ⏱ {course.duration}
          </span>
          <span className="font-bold" style={{color: '#e2e8f0'}}>
            ${course.price} MXN
          </span>
        </div>

      </div>
    </Link>
  )
}

function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedLevel, setSelectedLevel] = useState('Todos')
  const [search, setSearch] = useState('')

  const filtered = courses.filter(course => {
    const matchCategory = selectedCategory === 'Todos' || course.category === selectedCategory
    const matchLevel = selectedLevel === 'Todos' || course.level === selectedLevel
    const matchSearch = course.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchLevel && matchSearch
  })

  return (
    <div className="min-h-screen px-6 py-8" style={{backgroundColor: '#0f1117'}}>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{color: '#e2e8f0'}}>
          Catálogo de Cursos
        </h1>
        <p style={{color: '#8892a4'}}>
          {filtered.length} cursos disponibles
        </p>
      </div>

      {/* Búsqueda */}
      <input
        type="text"
        placeholder="Buscar cursos..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-lg text-sm outline-none mb-6"
        style={{
          backgroundColor: '#1a1d27',
          border: '1px solid #2a2d3a',
          color: '#e2e8f0'
        }}
      />

      {/* Filtros de categoría */}
      <div className="flex gap-2 flex-wrap mb-3">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="px-4 py-2 rounded-full text-sm transition-all"
            style={{
              backgroundColor: selectedCategory === cat ? '#3b82f6' : '#1a1d27',
              color: selectedCategory === cat ? '#ffffff' : '#8892a4',
              border: '1px solid #2a2d3a'
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Filtros de nivel */}
      <div className="flex gap-2 flex-wrap mb-8">
        {levels.map(lvl => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            className="px-4 py-2 rounded-full text-sm transition-all"
            style={{
              backgroundColor: selectedLevel === lvl ? '#1e3a5f' : '#1a1d27',
              color: selectedLevel === lvl ? '#3b82f6' : '#8892a4',
              border: `1px solid ${selectedLevel === lvl ? '#3b82f6' : '#2a2d3a'}`
            }}>
            {lvl}
          </button>
        ))}
      </div>

      {/* Grid de cursos */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6"
             style={{gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'}}>
          {filtered.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20" style={{color: '#8892a4'}}>
          <p className="text-lg">No se encontraron cursos</p>
          <p className="text-sm mt-1">Intenta con otros filtros</p>
        </div>
      )}

    </div>
  )
}

export default Courses