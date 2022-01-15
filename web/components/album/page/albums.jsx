import css from 'classnames'
import { connect } from 'react-redux'

import ListAlbums from '../list.jsx'
import EditButton from './edit/index.jsx'


const closeAlbumPage = id => document.getElementById('album_' + id).classList.remove('is-active')

const AlbumImage = ({ img }) => (
  <div class='column modal-trigger' data-target={'image_' + img._id}>
    <img style={css({width: '100%', height: '100%'})} src={'http://localhost:8080/api/images/' + img.filename} />
  </div>
)
const AlbumPage = ({ album }) => (
  <div class="modal" id={'album_' + album._id}>
    <div class="modal-background" onClick={e => closeAlbumPage(album._id)}></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{album.title}</p>
        <EditButton albumId={album._id} />
      </header>
      <section class="modal-card-body">
          <ListAlbums albums={album.children} />
          <div class='columns is-multiline'>
            {album.images.map(img => <AlbumImage img={img} />)}
          </div>
          {/** tags here ... maybe in the future */}
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" onClick={e => closeAlbumPage(album._id)}>Save changes</button>
        <button class="button" onClick={e => closeAlbumPage(album._id)}>Cancel</button>
      </footer>
    </div>
  </div>
)

const ListAlbumPages = ({ page }) => page.albums.map(album => <AlbumPage album={album} />)

export default connect(o => o)(ListAlbumPages)