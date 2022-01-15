import { useDispatch } from 'react-redux'
import {Popup, closePopup } from '../popup.jsx'

export default () => {
  const dispatch = useDispatch()
  const id = 'create_album'
  return (
    <Popup id={id} title='Create Album'>
        <form onsubmit={e => dispatch({type: 'newAlbum', e, dispatch})}>
          <section class="modal-card-body">
            <input class="input" placeholder='album name...' />
            <br />
            <textarea class="textarea" placeholder='album description' />
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" type="submit">Create Album</button>
            <button class="button" onClick={() => closePopup(id)}>Cancel</button>
          </footer>
        </form>
    </Popup>
  )
}
