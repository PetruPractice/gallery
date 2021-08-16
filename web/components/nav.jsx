const SettingsPopup = require('./settings')
const CreateAlbum = require('./album/create')
const CreateTag = require('./tag/create')
const $ = id => document.getElementById(id)
const Search = ({hideSearch}) => (
    <form>
        <div class="input-field">
          <input id="search" type="search" required />
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons" onClick={hideSearch}>close</i>
        </div>
    </form>
)
const Menu = props => <>
    <a href="#!" class="brand-logo" id='logo'><i class="material-icons">cloud</i>Gallery</a>
    <ul class="right hide-on-med-and-down">
      <li><a onClick={props.onSearch}><i class="material-icons">search</i></a></li>
      <li><a ><i class="material-icons">view_module</i></a></li>
      <li><a ><i class="material-icons">refresh</i></a></li>
      <li><a data-target="settings" class="modal-trigger"><i class="material-icons">more_vert</i></a></li>

    </ul>
    <a data-target="create_album" class="modal-trigger btn-floating btn-small halfway-fab waves-effect waves-light blue darken-2">
        <i class="material-icons">add</i>
    </a>
    <a data-target="create_tag" class="modal-trigger btn-floating btn-small halfway-fab waves-effect waves-light green darken-1" style="right: 100px">
      <i class="material-icons">add_circle_outline</i>
    </a>
</>

module.exports = (state, emit) => {
    const menu = () => <Menu onSearch={onSearch}/>
    function onSearch() {
       $('navbar').innerHTML = ''
       $('navbar').appendChild(<Search hideSearch={hideSearch} />)
       const input = $('navbar').getElementsByTagName('input')[0]
       input.focus()
       input.addEventListener('focusout', hideSearch)
    }
    function hideSearch() {
        $('navbar').innerHTML = ''
        $('navbar').appendChild(menu())
    }
    return <nav>

    <div class="nav-wrapper teal" id='navbar'>
        {menu()}

    </div>
    <CreateAlbum emit={emit} />
    <CreateTag emit={emit} />
    <SettingsPopup />
  </nav>

}