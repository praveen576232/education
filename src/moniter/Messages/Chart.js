import "./Chart.css";

import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-ui/core";

import Messages from "./chart/Message";
import FlipMove from "react-flip-move";
import db from "../../database/firebase";

import firebase from "firebase";
import { useStateValue } from "../../statemangement/statemangement";

function Chart({menter}) {
  const [{ user }, dispatch] = useStateValue();

  const [message, setMessage] = useState("");
  const [charts, setCharts] = useState([]);

 
  const sendMessage = (e) => {
    e.preventDefault();

  
      send();
    
    setMessage("");
  };

  const send = () => {
    if( user!== null && menter?.email !== null) {

      db.collection("moniter").doc(menter?.email).collection(user?.email).add({
        msg: message,
        displayName: user?.displayName,
        photourl: user?.photoURL,
        uid: user?.uid,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  useEffect(() => {
  if(user!==null && menter?.email!==null){
  console.log(menter);
  console.log(user);
    db.collection("moniter")
    .doc(menter?.email)
    .collection(user?.email)
    .onSnapshot((snapshot) => {
      if (snapshot) {
        const mydata = snapshot?.docs;

        setCharts(mydata);
      }
    });
  }
  }, [menter]);

  return (
    <div className="chart">
      <div className="chart_header">
        <h4>
          To:{" "}
          <span className="chart_name">
            {menter?.displayName}
          </span>
        </h4>
        <strong>Details</strong>
      </div>

      <div className="chart_message">
        <FlipMove>
          {charts?.map((chart) => (
            <Messages key={chart.id} context={chart.data()} />
          ))}
        </FlipMove>
      </div>

      <div className="chart_input">
        <form>
          <input
            placeholder="iMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button onClick={sendMessage}>Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Chart;
