module.exports = ({emit}) => { 
    const settingsPopup = <div class="row card modal modal-fixed-footer s12" id="settings">
            <div class="modal-content">
                <p class="black">Settings</p>
            </div>
            <div class="modal-footer">                
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Ok</a>
            </div>   
    </div>

    M.Modal.init(settingsPopup , {})
    return settingsPopup 
}