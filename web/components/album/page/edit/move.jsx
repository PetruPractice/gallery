import css from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import {Popup, closePopup } from '../../../popup.jsx'

const ChooseButton = ({ albumId, parentAlbumId, title, style, dispatch, id }) => (
  <div class={'row columns ' + (style || '')}>
    <div class='column is-6'>{title}</div>
    <div class='column is-6'>
      <button class='button is-info' onClick={e => {
        dispatch({type: 'chooseAlbum', parentAlbumId, albumId, dispatch, e})
        closePopup(id)
      }}>Choose</button>
    </div>
  </div>
)

export default ({ albumId }) => {
  const albums = useSelector(state => state.page.albums)
  const dispatch = useDispatch()
  const style = css({'is-hidden': albums.filter(album => !album.parent).some(album => album._id === albumId)})
  const id = 'move_album_' + albumId
  const params = {id, dispatch, albumId}
  return (
    <Popup id={id} title='Move Album'>
      <section class="modal-card-body">
        <div class='rows'>
          <div class='row columns'>
            <div class='column is-6'>Album Name</div>
            <div class='column is-6'>Pick album to move to</div>
          </div>

          <ChooseButton parentAlbumId={-1} title='ROOT' style={style} {...params} />

          {albums.filter(album => album._id !== albumId).map(album => (
            <ChooseButton parentAlbumId={album._id} title={album.title} {...params} />
          ))}
        </div>
        {/** TODO: get all tags for the given album that can be applied to the album */}
      </section>
    </Popup>
  )
}
