import RouteApp from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  return (
    <div className="App">
      <ToastContainer/>
        <RouteApp/>
    </div>
  );
}

 
