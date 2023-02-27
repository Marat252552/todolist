import { Provider } from "react-redux/es/exports"
import { BrowserRouter } from "react-router-dom"
import Page from "./Components/Page"
import store from "./Components/Redux/Redux"

const App = () => {
  return <BrowserRouter>
  <Provider store={store}>
    <Page />
  </Provider>
  </BrowserRouter>
}

export default App
