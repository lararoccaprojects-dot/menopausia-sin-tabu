import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Upsell from "./pages/Upsell";
import Downsell from "./pages/Downsell";
import ThankYou from "./pages/ThankYou";
import SymptomSimulator from "./pages/SymptomSimulator";
import Dashboard from "./pages/Dashboard";
import PremiumPack from "./pages/PremiumPack";
import EmotionalWellness from "./pages/EmotionalWellness";
import ResourceGuide from "./pages/ResourceGuide";
import WellnessExercises from "./pages/WellnessExercises";
import Forum from "./pages/Forum";
import IntimacyManual from "./pages/IntimacyManual";
import LongTermHealthPlan from "./pages/LongTermHealthPlan";
import SelfEsteemKit from "./pages/SelfEsteemKit";
import NutritionWorkshop from "./pages/NutritionWorkshop";
import AlternativeTherapies from "./pages/AlternativeTherapies";

function Router() {
  return (
    <Switch>
      {/* Public Pages */}
      <Route path={"/"} component={Home} />
      <Route path={"/upsell"} component={Upsell} />
      <Route path={"/downsell"} component={Downsell} />
      <Route path={"/thank-you"} component={ThankYou} />
      
      {/* Protected Pages - Dashboard */}
      <Route path={"/dashboard"} component={Dashboard} />
      
      {/* Protected Pages - Main Tools */}
      <Route path={"/simulador-sintomas"} component={SymptomSimulator} />
      <Route path={"/guia-recursos"} component={ResourceGuide} />
      <Route path={"/ejercicios-bienestar"} component={WellnessExercises} />
      <Route path={"/foro"} component={Forum} />
      
      {/* Protected Pages - Premium Pack */}
      <Route path={"/premium-pack"} component={PremiumPack} />
      <Route path={"/premium/emotional-wellness"} component={EmotionalWellness} />
      <Route path={"/premium/intimacy-manual"} component={IntimacyManual} />
      <Route path={"/premium/long-term-health"} component={LongTermHealthPlan} />
      <Route path={"/premium/self-esteem"} component={SelfEsteemKit} />
      <Route path={"/premium/nutrition"} component={NutritionWorkshop} />
      <Route path={"/premium/alternative-therapies"} component={AlternativeTherapies} />
      
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
