const EditButton = require('../../image/edit')
const AlbumImage = ({ img }) => <div class='col s4 modal-trigger' data-target={'image_' + img._id}>
  <img class='responsive-img card materialbox' src={'http://localhost:8080/api/images/' + img.filename} />
                                </div>

const imageFrom = (color, id) => 'data:image/svg+xml;base64,' + window.btoa('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"><rect width="100" height="100" fill="#' + color + '"/></svg>') + '#' + id

const ImagePage = ({ state, emit, img, albumId }) => {
    const tags = <div class='chips chips-autocomplete' />
    const imgPage = (
      <div class='modal image_page' id={'image_' + img._id} style='width:98vw; height:98vh'>
        <img src={baseURL + '/api/images/' + img.filename} style='width:100%; height: auto' />
        {/* {TagsList(state, emit, img._id)} */}
        {/* <h3>Add Image Tag</h3> */}
        {/* {tagOptions} */}
        {/* <button class="add-tag" onclick={e => emit('addTag', img._id, tagOptions.value)}>+</button> */}
        {tags}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <EditButton state={state} emit={emit} imageId={img._id} albumId={albumId} />
      </div>
)
    // setTimeout(() => {
    //     M.Chips.init(tags, {
    //         data: JSON.parse(img.tags).map(tag => ({tag: tag.name, image: imageFrom(tag.color, tag._id)})),
    //         placeholder: 'Enter a tag',
    //         secondaryPlaceholder: '+Tag',
    //         autocompleteOptions: {
    //             data: Object.fromEntries(state.page.tags.map(tag => ([tag.name + ' (' + tag._id + ')', imageFrom(tag.color, tag._id)]))),
    //             limit: Infinity,
    //             minLength: 2
    //         },
    //         onChipAdd: (_, chip) => {
    //             const id = parseInt(chip.innerText.split('(')[1].split(')')[0])
    //             const name = chip.innerText.split('(')[0].slice(0, -1)
    //             chip.innerHTML = ''
    //             chip.appendChild(<span>{name}</span>)
    //             chip.appendChild(<img src={imageFrom(state.page.tags.find(tag => tag._id === id).color, id)} />)
    //             chip.appendChild(<i class="material-icons close">close</i>)
    //             emit('tag.add', id, img._id)
    //         },
    //         // onChipSelect: (_, chip) => console.log('select', chip.querySelector('img').src.split('#')[1]),
    //         onChipDelete: (_, chip) => emit('tag.delete', parseInt(chip.querySelector('img').src.split('#')[1]), img._id)
    //     })
    // }, 0)
    return imgPage
}
module.exports = { AlbumImage, ImagePage }
