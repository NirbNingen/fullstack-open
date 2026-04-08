import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import store from "./store";
import { NotificationContextProvider } from "../src/context/NotificationContext";
import { BlogsContextProvider } from "./context/BlogsContext";
import { UserContextProvider } from "./context/UserContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <BlogsContextProvider>
        <UserContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </UserContextProvider>
      </BlogsContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>,
);
