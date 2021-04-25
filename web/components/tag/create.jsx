const React = require('jsx-dom')
module.exports = (state, emit) => {
    return <form onsubmit={e => emit('createTag', e)}>
        <input placeholder="tag name" name="tagName" />
        <input type="color" name="tagColor" />
        <br />
        <textarea name="tagDesc" cols="30" rows="10"></textarea>
        <input type="submit" value="create tag" />
    </form>
}