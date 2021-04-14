import {
  Avatar,
  Button,
  Dialog,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import MenterInfo from "./MenterInfo";
import Chart from "./Messages/Chart";
import "./moniter.css";
import { withStyles } from "@material-ui/core/styles";
import db from "../database/firebase";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useStateValue } from "../statemangement/statemangement";
function Moniter() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  let areaOFIntrest =""
  let portfoliolink =""
  let achivenments=""
  let careerGoals=""
  const [moniter, setMoniter] = useState([]);
  const [displayAddmoniter, setdisplayAddmoniter] = useState(true);
  const [chartMoniter, setChartMoniter] = useState();

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

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addMenter = (e) => {
    e.preventDefault();
    console.log(areaOFIntrest);
    console.log(portfoliolink);
    console.log(achivenments);
    console.log(careerGoals);
    if (
      areaOFIntrest != null &&
     
      portfoliolink != null &&
      achivenments != null &&
      careerGoals != null &&
      user != null
    ) {
      db.collection("moniter").doc(user.email).set({
        areaOFIntrest,
        portfoliolink,
        achivenments,
        careerGoals,
        email: user.email,
        displayName: user.displayName,
        photourl: user.photoURL,
      });
      setdisplayAddmoniter(false)
    } else {
      alert("fill the form.");
    }
  };
  useEffect(() => {
    db.collection("moniter").onSnapshot((snapshot) => {
      console.log(snapshot.docs);
      if (snapshot.docs) {
        setMoniter(snapshot.docs);
        snapshot?.docs?.map((doc) => {
          if (doc.id === user?.email) {
            setdisplayAddmoniter(false);
          }
        });
      }
    });
  }, []);
  const chartMenter = (menter) => {
    console.log("click the menter");
    // console.log(menter);
    setChartMoniter(menter.data());
  };
  
 
  return (
    <div className="moniter">
      <div className="moniter_list">
        {displayAddmoniter && (
          <Button onClick={handleClickOpen} className="moniter_Addbutton">
            Join As a Moniter
          </Button>
        )}
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Register for Menter
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
           <form onSubmit={addMenter}>
           <TextField
                // autoFocus
                margin="dense"
                id="name"
                label="Area of interest"
                
              
                onChange={(e)=>areaOFIntrest=e.target.value}
                required
                fullWidth
              />
            <TextField
              // autoFocus
              margin="dense"
              id="website"
              label="Portfolio website link"
              type="text"
             
              onChange={(e) => portfoliolink=e.target.value}
              required
              fullWidth
            />
          
             
              
             
              <TextField
                // autoFocus
                margin="dense"
                id="expertise"
                label="Achievements in the area of expertise."
                type="text"
                
                onChange={(e) => achivenments=e.target.value}
                required
                fullWidth
              />
              <TextField
                // autoFocus
                margin="mentees"
                id="name"
                label="What you look for in mentees?"
                type="text"
                
                onChange={(e) => careerGoals=e.target.value}
                required
                fullWidth
              />
             
   <button type="submit" disabled onSubmit={addMenter}></button>
           </form>
          </DialogContent>
          <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={addMenter} color="primary">
            Ok
          </Button>

          </DialogActions>
        </Dialog>

        <div className="dislaymoniter">
          {moniter &&
            moniter?.length > 0 &&
            moniter.map(
              (item, index) =>
                item.id !== user?.email && (
                  <MenterInfo
                    key={index}
                    data={item.data()}
                    onClick={() => chartMenter(item)}
                  />
                )
            )}
        </div>
      </div>
      <Chart menter={chartMoniter} />
    </div>
  );
}

export default Moniter;
