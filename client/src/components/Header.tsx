import { ThemeProvider } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import AccountMenu from "./AccountMenu";
import { IHeaderProps } from "./interfaces/IHeaderProps";

export default function Header(props: IHeaderProps) {
  const { onDrawerToggle } = props;
  let theme = createTheme({
    palette: {
      primary: {
        light: "#63ccff",
        main: "#101f33",
        dark: "#006db3",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <AppBar color="primary" position="sticky" elevation={0}>
          <Toolbar>
            <Grid container spacing={1} alignItems="center">
              <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs />

              <Grid item>
                <AccountMenu></AccountMenu>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          color="primary"
          position="static"
          elevation={0}
          sx={{ zIndex: 0 }}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography color="inherit" variant="h5" component="h1">
                  {props.title}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </ThemeProvider>
  );
}
