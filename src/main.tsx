import ReactDOM from "react-dom/client"
import App from "./app/App.tsx"
import "./app/styles/global.scss"
import StoreProvider from "./shared/providers/StoreProvider/StopreProvider.tsx"


ReactDOM.createRoot(document.getElementById("root")!).render(
    <StoreProvider>
        <App />
    </StoreProvider>
)
