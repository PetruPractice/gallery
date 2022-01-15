import { useSelector, useDispatch } from 'react-redux'
import { Popup, closePopup } from '../popup.jsx'

export default () => {
  const dispatch = useDispatch()
  const albums = useSelector(state => state.page.albums)
  const id = 'uploadImages'
  return (
      <Popup id={id} title='Upload Images ...'>
        <form id='uploadForm' enctype='multipart/form-data' onSubmit={e => dispatch({type: 'uploadPage', e})}>
          <section class="modal-card-body">
            <label for='file'>
              <strong>Choose a file</strong>
            </label>
            <span>Loading...</span>
            <input type='file' name='files[]' multiple />
            <br /><br />
            <select name='albums' style='display: block'>
              {albums.map(album => <option key={album._id} value={album._id}>{album.title}</option>)}
            </select>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" type='submit'>Upload</button>
            <button class="button" onClick={() => closePopup(id)}>Cancel</button>
          </footer>
        </form>
      </Popup>
  )
}
