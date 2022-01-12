module.exports = ({ albumId, imageId, emit, state }) => (
  <div class='row card modal s12 move_image' id={'move_image_' + imageId}>
    <div class='modal-content'>
      <table>
        <tr><th>Image Name</th><th>Pick</th></tr>
        {state.page.albums.filter(album => album._id !== albumId).map(album => (
          <tr>
            <td>{album.title}</td>
            <td><button class='modal-close waves-effect waves-green btn' onclick={e => emit('chooseAlbumForImage', imageId, album._id)}>Choose</button></td>
          </tr>
		))}
      </table>

    </div>
    <div class='modal-footer'>
      <button class='modal-close waves-effect waves-green btn-flat'>Cancel</button>
    </div>
  </div>
)
