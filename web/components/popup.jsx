export const closePopup = id => document.getElementById(id).classList.remove('is-active')

export const Popup = ({id, title, children, noDelete, header}) => (
    <div class="modal" id={id} style='height:80vh'>
        <div class="modal-background" onClick={() => closePopup(id)}></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{title}</p>
            {!noDelete && <button class="delete" aria-label="close" onClick={() => closePopup(id)}></button>}
            {header && header}
        </header>
        {children}
        </div>
    </div>
)

