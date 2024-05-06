import { createRoot } from 'react-dom/client';

// Import statement to indicate need to bundle `./index.scss`
import "./index.scss";

// Main component 
const MyFlixApplication = () => {
    return (
        <div className="my-flix">
            <div>Good Morning</div>
        </div>
    );
};

// Finds root of app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render app in root DOM element 
root.render(<myFlixApplication />);