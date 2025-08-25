import { Morphofolio } from "./Morphofolio";
import { ThemeProvider } from "./ThemeProvider";

function Home() {
  return (
    <ThemeProvider defaultTheme="light">
      <Morphofolio />
    </ThemeProvider>
  );
}

export default Home;
