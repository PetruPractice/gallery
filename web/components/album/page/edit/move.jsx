const ChooseButton = ({emit, albumId, parentAlbumId, title, style}) => (
    <tr style={style}>
        <td>{title}</td>
        <td><button class="modal-close waves-effect waves-green btn" onclick={e => emit('chooseAlbum', albumId, parentAlbumId)}>Choose</button></td>
    </tr>
)

module.exports = ({albums, emit, albumId}) => (
    <div class="row card modal s12 move_album" id={'move_album_' + albumId}>
        <div class="modal-content">
		<table>
 		<tr><th>Album Name</th><th>Pick</th></tr>
 		<ChooseButton emit={emit} albumId={albumId} parentAlbumId={-1} title="ROOT" style={albums.filter(album => !album.parent).some(album => album._id === albumId) && 'display: none'} />
 		{albums.filter(album => album._id !==albumId).map(album => <ChooseButton emit={emit} albumId={albumId} parentAlbumId={album._id} title={album.title} />)}
 	</table>

        </div>
        <div class="modal-footer">
            <button class="modal-close waves-effect waves-green btn-flat">Cancel</button>
        </div>
    </div>
)
