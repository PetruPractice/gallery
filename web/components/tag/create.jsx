import { useDispatch } from 'react-redux'

const closeCreateTag = () => document.getElementById('create_tag').classList.remove('is-active')
export default () => {
  const dispatch = useDispatch()
  return (
    <div class="modal" id='create_tag'>
      <div class="modal-background" onClick={closeCreateTag}></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Create A Tag</p>
            <button class="delete" aria-label="close" onClick={closeCreateTag}></button>
          </header>
          <form onSubmit={e => dispatch({type:'createTag', e})}>
            <section class="modal-card-body">
                <input class="input" placeholder='tag name' name='tagName' />
                <input class="input" type='color' name='tagColor' />
                <br />
                <textarea class="textarea" name='tagDesc' cols='30' rows='10' />
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" type="submit">Create Tag</button>
              <button class="button" onClick={closeCreateTag}>Cancel</button>
            </footer>
          </form>
        </div>
    </div>
  )
}

