import "./styles/globals.css";
import { CvBuilderWithTheming } from "./components/cv-builder-with-theming";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <CvBuilderWithTheming />
    </div>
  );
}

export default App;
