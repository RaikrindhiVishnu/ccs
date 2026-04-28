import { Provider } from "react-redux"
import { store } from "./app/store/store"
import { AppRouter } from "./app/router/AppRouter"

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
