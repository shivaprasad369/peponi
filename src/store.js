import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: localStorage.getItem('coreui-free-react-admin-template-theme'),
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}


const store = createStore(changeState)
export default store
