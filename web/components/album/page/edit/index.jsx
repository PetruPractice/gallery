const DeletePage = require('./delete')
const MovePage = require('./move')
const ApplyTagPage = require('./applyTag')

const EditButton = ({albums, tags, emit, albumId}) => (
    <div class="fixed-action-btn edit_button">
        <a class="btn-floating btn-large red"><i class="large material-icons">mode_edit</i></a>
        <ul>
            <li data-target={'delete_album_' + albumId} class="modal-trigger"><a class="btn-floating red" alt="Delete Album"><i class="material-icons">clear</i></a></li>
            <li data-target={'move_album_' + albumId} class="modal-trigger"><a class="btn-floating blue" alt="Move Album"><i class="material-icons">exit_to_app</i></a></li>
            <li data-target={'tag_album_' + albumId} class="modal-trigger"><a class="btn-floating green darken-1" alt="Add Tag"><i class="material-icons">sell</i></a></li>
        </ul>

        <DeletePage emit={emit} albumId={albumId} />
        <MovePage emit={emit} albumId={albumId} albums={albums} />
        <ApplyTagPage emit={emit} albumId={albumId} tags={tags} />
        
    </div>
)
module.exports = { EditButton }

