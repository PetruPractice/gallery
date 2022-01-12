module.exports = ({ emit, imageId }) => (
  <div class='row card modal modal-fixed-footer s12 delete_image' id={'delete_image_' + imageId}>
    <div class='deleteImageBox modal-content'>
      <h4>Are you sure you want to delete this Image?</h4>
    </div>
    <div class='modal-footer'>
      <button class='modal-close waves-effect waves-green btn'>Cancel</button>
      <button class='modal-close waves-effect waves-green btn' onclick={e => emit('deleteImage', imageId)}>Delete</button>
    </div>
  </div>
)
