const React = require('jsx-dom')
module.exports = (state, emit) => {
    const uploadImages = (<div id='uploadImages'>
        <span>Loading...</span>
        <form id="uploadForm" enctype="multipart/form-data">
            <input type="file" name="files[]" multiple />
            <label for="file">
                <strong>Choose a file</strong>
                <span> or drag it here.</span>
            </label>
            <select name="albums" style="z-index:999;">
                {state.page.albums.map(album => <option value={album._id} >{album.title}</option> )}
            </select>
            <button type="submit">Upload</button>
        </form>

    </div>)
    setTimeout(() => emit('uploadPage', uploadImages), 400)
    return uploadImages
}