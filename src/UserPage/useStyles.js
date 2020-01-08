import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 500,
    maxWidth: 800
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",

    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  username: {
    fontWeight: 1000
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 300
  },
  inline: {
    display: "inline"
  }
}));
