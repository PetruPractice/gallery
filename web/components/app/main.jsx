import 'bulma/css/bulma.min.css'
// import './style.css'
import Nav from './nav/index.jsx'

export default ({ children }) => (
  <section class='section'>
    <Nav />
    {children}
  </section>
)
