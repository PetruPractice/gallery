module.exports = ({ emit, albumId }) => (
  <div class='row card modal modal-fixed-footer s12 delete_album' id={'delete_album_' + albumId}>
    <div class='deleteAlbumBox modal-content'>
      <h4>Are you sure you want to delete this Album?</h4>
    </div>
    <div class='modal-footer'>
      <button class='modal-close waves-effect waves-green btn-flat'>Cancel</button>
      <button class='modal-close waves-effect waves-green btn-flat red' onclick={e => emit('deleteAlbum', albumId)}>Delete</button>
    </div>
  </div>
)
