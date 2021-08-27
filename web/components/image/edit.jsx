const DeletePage = require('./delete')
const MovePage = require('./move')

module.exports = ({ state, emit, albumId, imageId}) => (
    <div class="fixed-action-btn edit_button">
        <a class="btn-floating btn-large red"><i class="large material-icons">mode_edit</i></a>
        <ul>
            <li data-target={'delete_image_' + imageId} class="modal-trigger"><a class="btn-floating red" alt="Delete Image"><i class="material-icons">clear</i></a></li>
            <li data-target={'move_image_' + imageId} class="modal-trigger"><a class="btn-floating blue" alt="Move Image"><i class="material-icons">exit_to_app</i></a></li>
            {/* <li data-target={'send_image_' + imageId} class="modal-trigger"><a class="btn-floating green darken-1" alt="Send"><i class="material-icons">send</i></a></li> */}
        </ul>

        <DeletePage emit={emit} imageId={imageId} />
        <MovePage state={state} emit={emit} albumId={albumId} imageId={imageId} />
        {/* <ApplyTagPage emit={emit} albumId={albumId} tags={tags} imageId={imageId} /> */}
        
    </div>
)
