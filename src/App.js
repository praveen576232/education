import {
  Button,
  Dialog,

  IconButton,
  Typography,
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { useHistory } from "react-router";
import Header from "./Header";
import CloseIcon from "@material-ui/icons/Close";
import { useStateValue } from "./statemangement/statemangement";
import db from "./database/firebase";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { auth } from "./database/firebase";
import Login from "./login/Login";
import Moniter from "./moniter/moniter"
function App() {
  const myhistory = useHistory()
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscrib = auth.onAuthStateChanged((authUser) => {
    
      if (authUser) {

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {
      unsubscrib();
    };
  }, []);
  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    db.collection("learn").onSnapshot((data) => {
      setCourses(data.docs);
    });
  }, []);
  const openCoursesLink = (doc) => {
    if (user !== null) {
      const link = doc?.data()["link"];
      if (link !== null && link !== "") {
        window.open(link, "_self");
      }
    } else {
      alert("please sigin to continue.");
    }
  };
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/moniter">
          {user != null ? (<Moniter></Moniter>) : (<Login />)}
        </Route>
        <Route path="/">
          <div className="app">
            <Header />
            <div className="name">
              <h1>Craft</h1>
              <p>Learn* Moniter* Hier*</p>
            </div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
            >
              <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Courses's List
              </DialogTitle>
              <DialogContent dividers>
                {courses != null && courses?.length > 0 ? (
                  <div className="courseslists">
                    {courses?.map((item, index) => (
                      <Button
                        onClick={() => openCoursesLink(item)}
                        key={index}
                        className="coursesitem"
                      >
                        {item.id}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <CircularProgress className="circle" />
                )}
              </DialogContent>
            </Dialog>
            <div className="buttons">
              <Button onClick={handleClickOpen} className="button-learn">
                Learn
              </Button>
              <Link to="/moniter" className="moniter_link">
              <Button
              
                className="button-moniter"
              >
                Moniter
              </Button>
              </Link>
              <Button className="button-hier">Hier</Button>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
