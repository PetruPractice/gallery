// import './style.css'
import Nav from './nav.jsx'
import 'bulma/css/bulma.min.css'

export default ({ children }) => (
  <section class='section'>
    <Nav />
    {children}
  </section>
)
