const {getJSON, $} = require('../utils')

module.exports = (state, emitter) => {

    emitter.on('tags:forImage', imageId => {
        getJSON('/api/tags/' + imageId).then(tags => {
            state.page.images2tags[imageId] = tags
            emitter.emit('render')
        })
    })
}
