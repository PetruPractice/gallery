export default (state = { url: '/', path: '/', matches: {} }, { type, params }) => type === 'updateParams' ? params : state
