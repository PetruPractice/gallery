import SettingsPopup from './settings.jsx'
import CreateAlbum from '../../album/create.jsx'
import CreateTag from '../../tag/create.jsx'

const MenuButtons = () => (
  <div class='navbar-end' style='font-size:200%'>
      <a data-target="create_album" class="navbar-item modal-trigger"><i class="fas fa-folder-plus"></i></a>
      <a data-target="create_tag" class="navbar-item modal-trigger"><i class="fas fa-tags"></i></a>
      <a data-target="settings" class="navbar-item modal-trigger"><i class="fas fa-ellipsis-v"></i></a>
  </div>
)

const SearchBar = () => (
  <div class="field has-addons">
    <div class="control has-icons-left">
      <input class="input" type="text" placeholder="Find a picture ..." style='width: 70vw' />
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </div>
    <div class="control">
      <a class="button is-info">
        <i class="fas fa-search"></i>
      </a>
    </div>
  </div>
)

export default () => (
  <nav class='navbar' role='navigation' aria-label='main navigation'>
    <div class='navbar-brand'>
      <a class='navbar-item' href='/'><i class="fas fa-images" style="font-size:300%"></i></a>
      <a role='button' class='navbar-burger' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample'>
        <span aria-hidden='true' />
        <span aria-hidden='true' />
        <span aria-hidden='true' />
      </a>
    </div>

    <div id='navbarBasicExample' class='navbar-menu'>
      <div class='navbar-start'>
        {/* <a class='navbar-item'>Home</a> */}
        <a class='navbar-item'>
          <SearchBar />
        </a>
      </div>
      <MenuButtons />
    </div>
    <CreateAlbum />
    <CreateTag />
    <SettingsPopup />
  </nav>

)
