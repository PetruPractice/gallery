import { useSelector } from 'react-redux'

const closeTagAlbum = id => document.getElementById('tag_album_' + id).classList.remove('is-active')


export default ({ albumId }) => {
  const tags = useSelector(state => state.page.tags)
  return (
    <div class="modal" id={'tag_album_' + albumId}>
      <div class="modal-background" onClick={e => closeTagAlbum(albumId)}></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Tag Album</p>
          <button class="delete" aria-label="close" onClick={e => closeTagAlbum(albumId)}></button>
        </header>
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
                  <button onclick={e => closeTagAlbum(albumId, 'applyTagToWholeAlbum', e, tag._id, albumId)}>Choose</button>
                </div>
              </div>
            ))}
          </div>
          {/** TODO: get all tags for the given album that can be applied to the album */}
        </section>
      </div>
    </div>
  )
}
