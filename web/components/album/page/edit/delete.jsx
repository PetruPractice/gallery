module.exports = ({emit, albumId}) => {
    const deletePopup = <div class="row card modal modal-fixed-footer s12" id={'delete_album_' + albumId}>
        <div class="deleteAlbumBox modal-content">
            <h4>Are you sure you want to delete Album?</h4>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
            <a href="#!" class="modal-close waves-effect waves-green btn-flat red" onclick={e => emit('deleteAlbum', albumId)}>Delete</a>
        </div>
    </div>

    M.Modal.init(deletePopup, {})
    return deletePopup    
}
