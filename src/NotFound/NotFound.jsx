import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6"
         style={{backgroundColor: '#0f1117'}}>
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-4" style={{color: '#3b82f6'}}>
          404
        </h1>
        <h2 className="text-2xl font-bold mb-3" style={{color: '#e2e8f0'}}>
          Página no encontrada
        </h2>
        <p className="mb-8 text-sm" style={{color: '#8892a4'}}>
          La página que buscas no existe o fue movida.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/"
                className="px-6 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                style={{backgroundColor: '#3b82f6'}}>
            Ir al inicio
          </Link>
          <Link to="/courses"
                className="px-6 py-3 rounded-lg font-medium transition-opacity hover:opacity-90"
                style={{backgroundColor: '#1a1d27', color: '#e2e8f0', border: '1px solid #2a2d3a'}}>
            Ver cursos
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound;