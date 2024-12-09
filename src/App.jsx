import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Main from "./Components/Main/Main";

function App() {

  return (
    <div className="flex max-h-full max-w-screen">
      <Sidebar className="flex-shrink-0 transition-all duration-300"/>

      <Main className="flex-1" />
    </div>
  );
}

export default App;
