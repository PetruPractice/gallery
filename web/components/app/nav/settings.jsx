const closeSettings = () => document.getElementById('settings').classList.remove('is-active')
export default () => (
  <div class='modal' id='settings'>
    <div class='modal-background' onClick={closeSettings} />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Settings</p>
        <button class="delete" aria-label="close" onClick={closeSettings}></button>
      </header>
      <section class="modal-card-body">
        Configurable settings here ...
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" onClick={closeSettings}>Save changes</button>
        <button class="button" onClick={closeSettings}>Cancel</button>
      </footer>
    </div>
  </div>
)
