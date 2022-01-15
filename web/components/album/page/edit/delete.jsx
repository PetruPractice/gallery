const closeDeleteAlbum = id => document.getElementById('delete_album_' + id).classList.remove('is-active')

export default ({ albumId }) => (
  <div class="modal" id={'delete_album_' + albumId}>
    <div class="modal-background" onClick={e => closeDeleteAlbum(albumId)}></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Are you sure you want to delete this Album?</p>
        <button class="delete" aria-label="close" onClick={e => closeDeleteAlbum(albumId)}></button>
      </header>
      <footer class="modal-card-foot">
        <button class="button is-danger" onClick={e => closeDeleteAlbum(albumId, 'deleteAlbum')}>Delete</button>
        <button class="button" onClick={e => closeDeleteAlbum(albumId)}>Cancel</button>
      </footer>
    </div>
  </div>
)
