import "./App.css";
import { useRoutes } from "react-router-dom";
import { routesConfig } from "./app.routes";

function App() {
  const routes = useRoutes(routesConfig);
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* <Navbar className="flex-shrink-0 flex-grow-0"></Navbar> */}
      {routes}
    </div>
  );
}

export default App;
