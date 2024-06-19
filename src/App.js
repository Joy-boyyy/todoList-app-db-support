import { BrowserRouter, Route, Routes } from "react-router-dom";

import Welcome from "./component/Welcome";
import Home from "./component/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={Welcome} />

        <Route exact path="/todoapp" Component={Home} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
