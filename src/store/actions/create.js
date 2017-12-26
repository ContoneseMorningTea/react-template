export default function create(action) {
  return async dispatch => {
    try {
      await action(dispatch)
    } catch (e) {
      console.log('create', e)
      throw e
    }
  }
}