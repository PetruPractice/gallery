const React = require('jsx-dom')
module.exports = ({state, emit}) => <div> 
    <div class="overlay" />
    <form onsubmit={e => emit('newAlbum', e)}>
        <input  placeholder="album name..." />
        <br />
        <textarea  placeholder="album description" />
        <br />
        <button type="submit">Create Album</button>
    </form>        
</div>
