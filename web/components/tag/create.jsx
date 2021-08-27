module.exports = ({emit}) => <div class="row card modal modal-fixed-footer s12" id="create_tag">
        <form onsubmit={e => emit('createTag', e)}>
            <div class="modal-content">
                <input placeholder="tag name" name="tagName" />
                <input type="color" name="tagColor" />  
                <br />
                <textarea name="tagDesc" cols="30" rows="10"></textarea>
            </div>
            <div class="modal-footer">
                <button class="modal-close waves-effect waves-green btn-flat">Cancel</button>
                <button href="#!" class="modal-close waves-effect waves-green btn-flat green" type="submit">Create Tag</button>
            </div>
        </form>
</div>