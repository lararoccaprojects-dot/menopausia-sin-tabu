import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SymptomSimulator from "./pages/SymptomSimulator";
import Dashboard from "./pages/Dashboard";
import PremiumPack from "./pages/PremiumPack";
import EmotionalWellness from "./pages/EmotionalWellness";

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path={"/"} component={Home} />
      
      {/* Protected Pages - Dashboard */}
      <Route path={"/dashboard"} component={Dashboard} />
      
      {/* Protected Pages - Main Tools */}
      <Route path={"/simulador-sintomas"} component={SymptomSimulator} />
      
      {/* Protected Pages - Premium Pack */}
      <Route path={"/premium-pack"} component={PremiumPack} />
      <Route path={"/premium/emotional-wellness"} component={EmotionalWellness} />
      
      {/* Error Pages */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
