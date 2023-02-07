import { Provider } from "react-redux/es/exports"
import Page from "./Components/Page"
import store from "./Components/Redux/Redux"

const App = () => {
  return <Provider store={store}>
    <Page />
  </Provider>
}

export default App
