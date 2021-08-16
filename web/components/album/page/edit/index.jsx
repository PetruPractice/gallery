
// const MoveAlbum = require('../components/album/move')
// const MoveImage = require('../components/image/move')
// const DeleteAlbum = require('../components/album/delete')
    //             <button onclick={e => emit('openPopup', <MoveImage state={state} emit={emit} imageId={img._id} />)}>🏞️</button>
    //     <button class="tagToAlbum" onclick={e => emit('openPopup', <TagsSelector state={state} emit={emit} albumId={album._id} />)}>➕</button>
    //     <button class="moveAlbum" onclick={e => emit('openPopup', <MoveAlbum state={state} emit={emit} albumId={album._id} />)}>➡️</button>
    //     <button class="deleteAlbum" onclick={e =>emit('openPopup', <DeleteAlbum emit={emit} albumId={album._id} />)}>❌</button>
const DeletePage = require('./delete')
const MovePage = require('./move')
const ApplyTagPage = require('./applyTag')


const EditButton = ({albums, tags, emit, albumId}) => {
    const editButton = <div class="fixed-action-btn">
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

    M.FloatingActionButton.init(editButton, {})

    return editButton
}
module.exports = { EditButton }

