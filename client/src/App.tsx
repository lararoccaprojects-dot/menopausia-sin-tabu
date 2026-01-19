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
import ResourceGuide from "./pages/ResourceGuide";
import WellnessExercises from "./pages/WellnessExercises";
import Forum from "./pages/Forum";
import Upsell1EmotionalWellness from "./pages/Upsell1EmotionalWellness";
import Upsell2IntimacyManual from "./pages/Upsell2IntimacyManual";
import Upsell3LongTermHealth from "./pages/Upsell3LongTermHealth";
import Upsell4SelfEsteemKit from "./pages/Upsell4SelfEsteemKit";
import Upsell5NutritionWorkshop from "./pages/Upsell5NutritionWorkshop";
import Upsell6AlternativeTherapies from "./pages/Upsell6AlternativeTherapies";

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
      <Route path={"/premium/emotional-wellness"} component={Upsell1EmotionalWellness} />
      <Route path={"/premium/intimacy-manual"} component={Upsell2IntimacyManual} />
      <Route path={"/premium/long-term-health"} component={Upsell3LongTermHealth} />
      <Route path={"/premium/self-esteem"} component={Upsell4SelfEsteemKit} />
      <Route path={"/premium/nutrition"} component={Upsell5NutritionWorkshop} />
      <Route path={"/premium/alternative-therapies"} component={Upsell6AlternativeTherapies} />
      
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
