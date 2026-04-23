import { AppProvider } from "./context/ApplicationContext";
import Wizard from "./components/Wizard";

export default function App() {
  return (
    <AppProvider>
      <Wizard />
    </AppProvider>
  );
}