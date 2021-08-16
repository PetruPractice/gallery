module.exports = ({emit}) => {
    const tagPopup = <div class="row card modal modal-fixed-footer s12" id="create_tag">
        <form onsubmit={e => emit('createTag', e)}>
            <div class="modal-content">
                <input placeholder="tag name" name="tagName" />
                <input type="color" name="tagColor" />  
                <br />
                <textarea name="tagDesc" cols="30" rows="10"></textarea>
            </div>
            <div class="modal-footer">                
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
                <a href="#!" class="modal-close waves-effect waves-green btn-flat green" type="submit">Create Tag</a>
            </div>
        </form>
    
    </div>

    M.Modal.init(tagPopup, {})
    return tagPopup
    
}