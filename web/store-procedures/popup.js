const { $ } = require('./utils')

module.exports = (state, emitter) => {

    emitter.on('openPopup', popup => {
        $('popups').appendChild(popup)
        const overlay = popup.querySelector('.overlay')
        overlay.addEventListener('click', e => {
            popup.remove()
        })
    })
}
