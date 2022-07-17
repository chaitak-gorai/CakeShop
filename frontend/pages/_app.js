import '../styles/bootstrap.min.css'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { persistor } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'
import Header from '../components/Header'
import { Container } from 'react-bootstrap'
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
      </PersistGate>
    </Provider>
  )
}

// export default wrapper.withRedux(MyApp)
export default MyApp
