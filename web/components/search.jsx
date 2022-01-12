module.exports = (state, emit) => {
    // const icon = document.querySelector('.icon')
    // const search = document.querySelector('.search')
    // icon.onclick = () => {search.classList.toggle('active')}
    return (
      <div class='search'>
        <div className='icon' />
        <div className='input'>
          <input type='text' placeholder='Search' id='search' />
        </div>
        <span class='clear' onclick={e => emit(document.getElementById('search').value = '')} />

      </div>
)
}
