import { useDispatch } from 'react-redux'

const closeCreateAlbum = () => document.getElementById('create_album').classList.remove('is-active')

export default () => {
  const dispatch = useDispatch()
  return (
    <div class="modal" id='create_album'>
      <div class="modal-background" onClick={closeCreateAlbum}></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create Album</p>
          <button class="delete" aria-label="close" onClick={closeCreateAlbum}></button>
        </header>
        <form onsubmit={e => dispatch({type: 'newAlbum', e, dispatch})}>
          <section class="modal-card-body">
            <input class="input" placeholder='album name...' />
            <br />
            <textarea class="textarea" placeholder='album description' />
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" type="submit">Create Album</button>
            <button class="button" onClick={closeCreateAlbum}>Cancel</button>
          </footer>
        </form>
      </div>
    </div>
  )
}
