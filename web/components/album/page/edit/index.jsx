import DeletePage from './delete.jsx'
import MovePage from './move.jsx'
import ApplyTagPage from './applyTag.jsx'

const AlbumAction = ({action, alt, icon, color, albumId}) => (
  <a class='button modal-trigger' alt={alt} data-target={action + '_album_' + albumId} style='padding: 1rem'>
    <i class={'is-size-3 fas fa-' + icon + ' has-text-' + color}></i>
  </a>
)

const actions = [
  {action: 'delete', alt: 'Delete Album', icon: 'trash', color: 'danger'},
  {action: 'move', alt: 'Move Album', icon: 'compress-arrows-alt', color: 'primary'},
  {action: 'tag', alt: 'Add Tag', icon: 'tags', color: 'info'}  
]

export default ({ albumId }) => (
  <div class='fixed-action-btn edit_button'>
    {actions.map(o => <AlbumAction {...o} albumId={albumId} />)}
    <DeletePage albumId={albumId} />
    <MovePage albumId={albumId} />
    <ApplyTagPage albumId={albumId} />
  </div>
)

