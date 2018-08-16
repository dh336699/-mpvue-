import * as types from './mutationTypes'

const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
  }
}
export default mutations
