import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import {Chat} from './chat';
import {Thread as TThread} from '../../types/Thread';
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { createStyles } from "@mui/material";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "48%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
   },
}));
export default function ThreadComponent({
  onClose,
  selectedValue,
  open,
  thread,
}: {
  onClose: Function;
  selectedValue: string;
  open: boolean;
  thread: TThread | null,
}) {
  const classes = useStyles();
  const handleClose = () => {
    onClose(selectedValue);
  };


  if(thread)
    return (
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth = {true}
        maxWidth={false}
        classes={{ paper: classes.dialog}}
         >
       {/* display header */}
        <Chat/>
      </Dialog>
    );
  else
      return(<></>)
}

ThreadComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
