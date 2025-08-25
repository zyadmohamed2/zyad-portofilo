import { Morphofolio } from "./Morphofolio";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

function Home() {
  return (
    <ThemeProvider defaultTheme="light">
      <Morphofolio />
      <Toaster />
    </ThemeProvider>
  );
}

export default Home;
