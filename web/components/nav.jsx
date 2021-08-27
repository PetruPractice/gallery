const SettingsPopup = require('./settings')
const CreateAlbum = require('./album/create')
const CreateTag = require('./tag/create')
const $ = id => document.getElementById(id)

const state = {}
const closeMenu = () => M.Sidenav.getInstance($('mobile-demo')).close()

function onSearch() {
  const navBar = $('navbar')
  state.navItems = [...navBar.childNodes]
  while (navBar.firstChild) navBar.removeChild(navBar.lastChild)
  navBar.appendChild(<Search hideSearch={hideSearch} />)
  const input = navBar.getElementsByTagName('input')[0]
  input.focus()
  input.addEventListener('focusout', hideSearch)
}

function hideSearch() {
  const navBar = $('navbar')
  while (navBar.firstChild) navBar.removeChild(navBar.lastChild)
  navBar.append(...state.navItems)
  closeMenu()
}

const Search = ({hideSearch}) => (
    <form>
        <div class="input-field">
          <input id="search" type="search" required />
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons" onClick={hideSearch}>close</i>
        </div>
    </form>
)

const MenuButtons = () => <>
      <li><a onClick={onSearch}><i class="material-icons">search</i></a></li>
      <li><a data-target="create_album" class="modal-trigger"><i class="material-icons">create_new_folder</i></a></li>
      <li><a data-target="create_tag" class="modal-trigger"><i class="material-icons">local_offer</i></a></li>
      <li><a data-target="settings" class="modal-trigger"><i class="material-icons">more_vert</i></a></li>
</>

const Menu = () => <>
    <a href='/' class="brand-logo" id='logo'><i class="material-icons">cloud</i>Gallery</a>
    <a data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    <ul class="right hide-on-med-and-down"><MenuButtons onSearch={onSearch}/></ul>
    <ul class="sidenav" id="mobile-demo">
      <li><a class="right" onclick={closeMenu}><i class="material-icons">close</i></a><br /></li>
      <MenuButtons onSearch={onSearch}/>
    </ul>
</>

module.exports = ({ emit }) => <nav>
  <div class="nav-wrapper teal" id='navbar'><Menu /></div>
  <CreateAlbum emit={emit} />
  <CreateTag emit={emit} />
  <SettingsPopup />
</nav>
