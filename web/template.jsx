
const Shadow = props => <>
  <div class='bg-top'> <div class='bg-inner' /> </div>
  <div class='bg-right'> <div class='bg-inner' /> </div>
  <div class='bg'> <div class='bg-inner' /> </div>
</>

module.exports = {
	React,
	View: props => <body><div class={props.class}>{props.children}</div></body>,
	Shadow,
	BlockInput: props =>
  <div class='control block-cube block-input'>
    {props.children}
    <Shadow />
    <br /><br />
  </div>,
	Footer: props =>
  <div class='credits'>
    <a href='https://codeismagic.com/' target='_blank' rel='noreferrer'>Cloud 8</a>
  </div>
}
