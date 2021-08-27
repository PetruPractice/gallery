module.exports = ({emit}) => (
    <div class="row card modal modal-fixed-footer s12" id="create_album">
        <form onsubmit={e => emit('newAlbum', e)}>
            <div class="modal-content">
                <input  placeholder="album name..." />
                <br />
                <textarea  placeholder="album description" />
            </div>
            <div class="modal-footer">                
                <button class="modal-close waves-effect waves-green btn-flat">Cancel</button>
                <button class="modal-close waves-effect waves-green btn-flat green" type="submit">Create Album</button>
            </div>
        </form>
    
    </div>
)