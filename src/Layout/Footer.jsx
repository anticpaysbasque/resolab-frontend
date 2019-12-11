import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Favorite } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: "#eee" /*theme.palette.background.paper,*/,
    marginTop: theme.spacing(10),
    padding: theme.spacing(8, 0)
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography
          variant="h6"
          align="center"
          color="textSecondary"
          component="p"
        >
          <Link href="#">
            Made with <Favorite color="Secondary" /> from Wild Code School
            Biarritz
          </Link>
        </Typography>
      </Container>
    </footer>
  );
};
export default Footer;
