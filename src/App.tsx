import { useState, version } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/globals.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="mb-8 flex justify-center space-x-4">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img
            src={reactLogo}
            className="animate-spin-slow h-16 w-16"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="mb-6 text-4xl font-bold">Vite + React {version}</h1>
      <div className="rounded-lg bg-card p-6 shadow-md">
        <button
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code className="rounded bg-muted px-1 py-0.5">src/App.tsx</code>{" "}
          and save to test HMR
        </p>
      </div>
      <p className="mt-8 text-muted-foreground">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
