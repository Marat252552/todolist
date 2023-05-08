import { Provider } from "react-redux/es/exports"
import { BrowserRouter } from "react-router-dom"
import Page from "./Page"
import { format } from "date-fns"

const App = () => {
  return <BrowserRouter>
    <Page />
  </BrowserRouter>
}

export default App
