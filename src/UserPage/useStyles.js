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
  storie: {
    width: 100,
    height: 100,
    borderRadius: "50%"
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
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 600,
      display: "flex"
    }
  }
}));
