import { useDispatch } from 'react-redux'
import {Popup } from '../popup.jsx'

export default ({ albumId, imageId }) => {
  const id = 'move_image_' + imageId
  return (
    <Popup id={id} title='Move Image'>
      <section class="modal-card-body">
        <div class='rows'>
          <div class='row columns'>
            <div class='column is-6'>Image Name</div>
            <div class='column is-6'>Pick album to move to</div>
          </div>
          {albums.filter(album => album._id !== albumId).map(album => (
                <div class='row columns'>
                  <div class='column is-6'>{album.title}</div>
                  <div class='column is-6'>
                    <button class='button is-info' onClick={e => {
                      const dispatch = useDispatch()
                      dispatch({type: 'chooseAlbumForImage', imageId, albumId: album._id, e})
                    }}>Choose</button></div>
                </div>
          ))}
          </div>
      </section>
    </Popup>
  )
}
