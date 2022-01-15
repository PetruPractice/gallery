import { useDispatch } from 'react-redux'
import {Popup, closePopup } from '../../../popup.jsx'

export default ({ albumId }) => {
  const id = 'delete_album_' + albumId
  return (
    <Popup id={id} title='Are you sure you want to delete this Album?'>
      <footer class="modal-card-foot">
        <button class="button is-danger" onClick={e => {
          const dispatch = useDispatch()
          dispatch({type: 'deleteAlbum', albumId, dispatch, e})
          closePopup(id)
        }}>Delete</button>
        <button class="button" onClick={e => closePopup(id)}>Cancel</button>
      </footer>
    </Popup>
  )
}
