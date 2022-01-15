import { useDispatch } from 'react-redux'
import {Popup, closePopup } from '../popup.jsx'

export default ({ imageId }) => {
  const id = 'delete_image_' + imageId
  return (
    <Popup id={id} title='Are you sure you want to delete this Image?'>
      <footer class="modal-card-foot">
        <button class="button is-danger" onClick={e => {
          const dispatch = useDispatch()
          dispatch({type: 'deleteImage', imageId, dispatch, e})
          closePopup(id)
        }}>Delete</button>
        <button class="button" onClick={e => closePopup(id)}>Cancel</button>
      </footer>
    </Popup>
)
