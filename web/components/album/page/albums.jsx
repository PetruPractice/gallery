import css from 'classnames'
import { connect } from 'react-redux'

import {Popup, closePopup } from '../../popup.jsx'

import ListAlbums from '../list.jsx'
import EditButton from './edit/index.jsx'

const AlbumImage = ({ img }) => (
  <div class='column modal-trigger' data-target={'image_' + img._id}>
    <img style={css({width: '100%', height: '100%'})} src={'http://localhost:8080/api/images/' + img.filename} />
  </div>
)

const AlbumPage = ({ album }) => {
  const id = 'album_' + album._id
  return (
    <Popup id={id} title={album.title} header={<EditButton albumId={album._id} />} noDelete>
      <section class="modal-card-body">
          <ListAlbums albums={album.children} />
          <div class='columns is-multiline'>
            {album.images.map(img => <AlbumImage img={img} />)}
          </div>
          {/** tags here ... maybe in the future */}
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" onClick={e => closePopup(id, 'TODO')}>Save changes</button>
        <button class="button" onClick={e => closePopup(id)}>Cancel</button>
      </footer>
    </Popup>
  )
}

const ListAlbumPages = ({ page }) => page.albums.map(album => <AlbumPage album={album} />)

export default connect(o => o)(ListAlbumPages)