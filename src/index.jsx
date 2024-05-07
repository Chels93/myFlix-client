import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";

// Import statement to indicate need to bundle `./index.scss`
import "./index.scss";

// Main component
const MyFlixApplication = () => {
  return;
  <MainView />;
};

// Finds root of app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render app in root DOM element
root.render(<MyFlixApplication />);
