import '../styles/bootstrap.min.css'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store/store'
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

// export default wrapper.withRedux(MyApp)
export default MyApp
