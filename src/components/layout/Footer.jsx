import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-auto px-6 py-10"
            style={{backgroundColor: '#1a1d27', borderTop: '1px solid #2a2d3a'}}>
      <div className="max-w-5xl mx-auto grid gap-8"
           style={{gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'}}>

        {/* Logo y descripción */}
        <div className="flex flex-col gap-3">
          <Link to="/" className="text-xl font-bold" style={{color: '#e2e8f0'}}>
            &lt;/&gt;Edu<span style={{color: '#3b82f6'}}>Catify</span>
          </Link>
          <p className="text-sm leading-relaxed" style={{color: '#8892a4'}}>
            La plataforma educativa para developers que quieren crecer sin límites.
          </p>
        </div>

        {/* Plataforma */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold" style={{color: '#e2e8f0'}}>Plataforma</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Inicio', to: '/' },
              { label: 'Cursos', to: '/courses' },
              { label: 'Dashboard', to: '/dashboard' },
            ].map(link => (
              <Link key={link.label} to={link.to}
                    className="text-sm hover:underline transition-colors"
                    style={{color: '#8892a4'}}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Cuenta */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold" style={{color: '#e2e8f0'}}>Cuenta</h4>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Iniciar Sesión', to: '/login' },
              { label: 'Registrarse', to: '/register' },
            ].map(link => (
              <Link key={link.label} to={link.to}
                    className="text-sm hover:underline transition-colors"
                    style={{color: '#8892a4'}}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contacto */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold" style={{color: '#e2e8f0'}}>Contacto</h4>
          <div className="flex flex-col gap-2 text-sm" style={{color: '#8892a4'}}>
            <span>contacto@educatify.com</span>
            <span>Chihuahua, México</span>
          </div>
        </div>

      </div>

      {/* Línea inferior */}
      <div className="max-w-5xl mx-auto mt-8 pt-6 flex items-center justify-between flex-wrap gap-2"
           style={{borderTop: '1px solid #2a2d3a'}}>
        <p className="text-xs" style={{color: '#8892a4'}}>
          © 2026 EduCatify. Todos los derechos reservados.
        </p>
        <p className="text-xs" style={{color: '#8892a4'}}>
          Hecho con ❤️ en México
        </p>
      </div>

    </footer>
  )
}

export default Footer;