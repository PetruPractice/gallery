module.exports = ({tags, emit, albumId}) => {
    const applyTagPopup = <div class="row card modal s12" id={'tag_album_' + albumId}>
        <div class="modal-content">
		<table>
            <tr><th>Tag Name</th><th>Apply Tag to Whole Album</th></tr>
            {/** TODO: get all tags for the given album that can be applied to the album */}
            {tags.map(tag => <tr>
                <td>{tag.name}</td>
                <td><button onclick={e => emit('applyTagToWholeAlbum', e, tag._id, albumId)}>Choose</button> </td>
            </tr>)}
        </table>

        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancel</a>
        </div>
    </div>

    M.Modal.init(applyTagPopup, {})
    return applyTagPopup
}
