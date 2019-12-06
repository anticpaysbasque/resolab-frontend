import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import blueGrey from "@material-ui/core/colors/blueGrey";

import Header from "./Header";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[900]
    }
  }
});

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {children}
    </ThemeProvider>
  );
}
