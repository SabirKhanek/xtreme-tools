import "./App.css";
import { useRoutes } from "react-router-dom";
import { routesConfig } from "./app.routes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routes = useRoutes(routesConfig);
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* <Navbar className="flex-shrink-0 flex-grow-0"></Navbar> */}
      {routes}
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
