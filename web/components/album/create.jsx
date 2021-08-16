module.exports = ({emit}) => { 
    const createPopup = <div class="row card modal modal-fixed-footer s12" id="create_album">
        <form onsubmit={e => emit('newAlbum', e)}>
            <div class="modal-content">
                <input  placeholder="album name..." />
                <br />
                <textarea  placeholder="album description" />
            </div>
            <div class="modal-footer">                
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                <a href="#!" class="modal-close waves-effect waves-green btn-flat green" type="submit">Create Album</a>
            </div>
        </form>
    
    </div>

    M.Modal.init(createPopup, {})
    return createPopup
}