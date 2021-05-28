const React = require('jsx-dom')
module.exports = (state, emit) =>
    <div id='uploadImages'>
        <form id="uploadForm" enctype="multipart/form-data">
            <input type="file" name="files[]" multiple />
            <label for="file">
                <strong>Choose a file</strong>
                <span> or drag it here.</span>
            </label>
            <button type="submit">Upload</button>
        </form>
    </div>
