import "../styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "../contexts/auth";
import { AppPropsWithLayout } from "../types";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
