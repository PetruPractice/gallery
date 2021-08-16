module.exports = (state, emit) => {
    const uploadPopup = <div class="row card modal modal-fixed-footer s12" id="upload">
            <span>Loading...</span>
            <form id="uploadForm" enctype="multipart/form-data">
            <div class="modal-content">
                <input type="file" name="files[]" multiple />
                <label for="file">
                    <strong>Choose a file</strong>
                    
                </label>
                <select name="albums" style="z-index:999;">
                    {state.page.albums.map(album => <option value={album._id} >{album.title}</option> )}
               </select>

            </div>
            <div class="modal-footer">                
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Upload</a>
            </div>  
            </form> 
    </div>

    M.Modal.init(uploadPopup , {})

    // const uploadImages = (<div id='uploadImages'>
    //     <span>Loading...</span>
    //     <form id="uploadForm" enctype="multipart/form-data">
    //         <input type="file" name="files[]" multiple />
    //         <label for="file">
    //             <strong>Choose a file</strong>
    //             <span> or drag it here.</span>
    //         </label>
    //         <select name="albums" style="z-index:999;">
    //             {state.page.albums.map(album => <option value={album._id} >{album.title}</option> )}
    //         </select>
    //         <button type="submit">Upload</button>
    //     </form>

    // </div>)
    setTimeout(() => emit('uploadPage', uploadPopup), 400)
    return uploadPopup
}