module.exports = ({state, emit}) => (
    <div class="row card modal modal-fixed-footer s12" id="uploadImages" style="height:80vh">
        <form id="uploadForm" enctype="multipart/form-data" onsubmit={e => emit('uploadPage', e)}>
            <div class="modal-content">
                <label for="file">
                    <strong>Choose a file</strong>
                </label>
                <span>Loading...</span>
                <input type="file" name="files[]" multiple />
                <br /><br />
                <select name="albums" style="display: block">
                    {state.page.albums.map(album => <option key={album._id} value={album._id}>{album.title}</option>)}
                </select>
                <button class="modal-close waves-effect waves-green btn" type="submit">Upload</button>
            </div>
        </form> 
    </div>
)