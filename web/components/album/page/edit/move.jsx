module.exports = ({albums, emit, albumId}) => {
    const movePopup = <div class="row card modal s12" id={'move_album_' + albumId}>
        <div class="modal-content">
		<table>
 		<tr><th>album name</th><th>Pick</th></tr>
 		{/* {!props.state.page.mainAlbums.some(album => album._id === props.albumId) && <tr><td>ROOT</td><td><button onclick={e => props.emit('chooseAlbum', props.albumId, -1)}>Choose</button></td></tr>} */}
 		{albums.filter(album => album._id !==albumId).map(album =>
 			<tr><td>{album.title}</td><td><button onclick={e => emit('chooseAlbum', albumId, album._id)}>Choose</button></td></tr>
 		)}
 	</table>

        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
        </div>
    </div>

    M.Modal.init(movePopup, {})
    return movePopup
}

