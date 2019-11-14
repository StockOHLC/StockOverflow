import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "50px"
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  topicWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px"
  },
  chatBox: {
    width: "85%"
  },
  button: {
    width: "15%"
  }
}));

//make this into a stateful component?
const Chat = props => {
  const classes = useStyles();

  const [textValue, changeTextValue] = useState("");

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h4">
          Chat app
        </Typography>

        {console.log("messages: ", props.messages)}

        <div className={classes.flex}>
          <div className={classes.chatWindow}>
            <List>
              {props.messages
                ? props.messages.map((chat, index) => (
                    <div className={classes.flex} key={index}>
                      <Chip
                        label={chat.username}
                        className={classes.chip}
                      ></Chip>
                      <Typography component="p">{chat.msg}</Typography>
                    </div>
                  ))
                : null}
            </List>
          </div>
        </div>

        <div className={classes.flex}>
          <TextField
            className={classes.chatBox}
            label="Send a chat"
            value={textValue}
            onChange={e => changeTextValue(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              props.sendChatAction({
                username: props.username,
                msg: textValue
              });
              changeTextValue("");
            }}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default Chat;
