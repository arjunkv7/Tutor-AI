import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import DemoHome from "@/pages/demo-home";
import Session from "@/pages/session";
import LoginPage from "@/pages/login";
import StudentDashboard from "@/pages/student-dashboard";
import ParentDashboard from "@/pages/parent-dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/student-dashboard" component={StudentDashboard} />
      <Route path="/parent-dashboard" component={ParentDashboard} />
      <Route path="/demo-home" component={DemoHome} />
      <Route path="/session/:id">
        {(params) => <Session />}
      </Route>
      <Route path="/demo">
        {() => <Session demo={true} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
