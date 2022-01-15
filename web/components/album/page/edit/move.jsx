import css from 'classnames'
import { useSelector } from 'react-redux'

const closeMoveAlbum = id => document.getElementById('move_album_' + id).classList.remove('is-active')

const ChooseButton = ({ albumId, parentAlbumId, title, style }) => (
  <div class={'row columns ' + (style || '')}>
    <div class='column is-6'>{title}</div>
    <div class='column is-6'>
      <button onclick={e => closeMoveAlbum(albumId, 'chooseAlbum', parentAlbumId, albumId)}>Choose</button>
    </div>
  </div>
)

export default ({ albumId }) => {
  const albums = useSelector(state => state.page.albums)
  return (
    <div class="modal" id={'move_album_' + albumId}>
      <div class="modal-background" onClick={e => closeMoveAlbum(albumId)}></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Tag Album</p>
          <button class="delete" aria-label="close" onClick={e => closeMoveAlbum(albumId)}></button>
        </header>
        <section class="modal-card-body">
          <div class='rows'>
            <div class='row columns'>
              <div class='column is-6'>Album Name</div>
              <div class='column is-6'>Pick album to move to</div>
            </div>

            <ChooseButton albumId={albumId} parentAlbumId={-1} title='ROOT' style={css({'is-hidden': albums.filter(album => !album.parent).some(album => album._id === albumId)})} />

            {albums.filter(album => album._id !== albumId).map(album => (
              <ChooseButton albumId={albumId} parentAlbumId={album._id} title={album.title} />
            ))}
          </div>
          {/** TODO: get all tags for the given album that can be applied to the album */}
        </section>
      </div>
    </div>
  )
}
