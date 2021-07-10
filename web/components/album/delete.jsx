const React = require('jsx-dom')
module.exports = ({emit, albumId}) => <div> 
    <div class="overlay" />
    <div class="deleteAlbumBox">
        <p>Are you sure you want to delete Album?</p>
        <button class="cancel" onclick={e => e.target.parentElement.parentElement.remove()}>Cancel</button>
        <button class="ok" onclick={e => emit('deleteAlbum', albumId)}>ok</button> 
    </div>
</div>