import { useSelector, useDispatch } from 'react-redux'
import {Popup, closePopup } from '../../../popup.jsx'

export default ({ albumId }) => {
  const tags = useSelector(state => state.page.tags)
  const dispatch = useDispatch()
  const id = 'tag_album_' + albumId
  return (
    <Popup id={id} title='Tag Album'>
      <section class="modal-card-body">
        <div class='rows'>
          <div class='row columns'>
            <div class='column is-6'>Tag Name</div>
            <div class='column is-6'>Apply Tag to Whole Album</div>
          </div>
          {tags.map(tag => (
            <div class='row columns'>
              <div class='column is-6'>{tag.name}</div>
              <div class='column is-6'>
                <button class='button is-info' onclick={e => {
                  closePopup(id)
                  dispatch({type: 'applyTagToWholeAlbum', tagId: tag._id, albumId, dispatch, e})
                }}>Choose</button>
              </div>
            </div>
          ))}
        </div>
        {/** TODO: get all tags for the given album that can be applied to the album */}
      </section>
    </Popup>
  )
}
