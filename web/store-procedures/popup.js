const { $ } = require('./utils')

module.exports = (state, emitter) => {
    emitter.on('openPopup', popup => {
        $('popups').appendChild(popup)
        const overlay = popup.querySelector('.overlay')
        overlay.addEventListener('click', e => {
            popup.remove()
        })
    })



    //
    // M.Modal.init(view.querySelectorAll('#settings'), {})
      // M.Modal.init(view.querySelectorAll('#uploadImages'), {})
      // M.Modal.init(view.querySelectorAll('#create_album'), {})
      // M.Modal.init(view.querySelectorAll('#create_tag'), {})
      // M.Modal.init(view.querySelectorAll('.tag_album'), {})
      // M.Modal.init(view.querySelectorAll('.album_page'), {})
      // M.Modal.init(view.querySelectorAll('.move_album'), {})
      // M.Modal.init(view.querySelectorAll('.delete_album'), {})
      // M.Modal.init(view.querySelectorAll('.move_image'), {})
      // M.Modal.init(view.querySelectorAll('.delete_image'), {})
      // M.Modal.init(view.querySelectorAll('.image_page'), {})
      // M.FloatingActionButton.init(view.querySelectorAll('.edit_button'), {})
      // M.Sidenav.init(view.querySelectorAll('.sidenav'), {})
}
