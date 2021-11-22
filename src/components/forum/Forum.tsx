import React, { useEffect, useState } from "react";
//import Thread from '../thread/Thread'
import { useParams } from "react-router-dom";
//import ThreadComponent from '../thread/Thread';
import { Forum as TForum } from "../../types/Forum";
import { mockForums } from "../../pages/HomePage/fakecontent";
import { ThemeProvider } from "@emotion/react";
import { defaultTheme } from "../../pages/PageMisc";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ForumIcon from "@mui/icons-material/Forum";
import { ListItemIcon } from "@mui/material";
import ThreadComponent from "../thread/Thread";

const Forum: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const [forum, setForum] = useState<TForum | undefined>(undefined);
  const { id } = useParams();

  // fetcha á id með useState væntanlega
  // fa Threads til baka
  useEffect(() => {
    if (id) setForum(mockForums.find((forum) => forum.id === parseInt(id)));
  }, [id, forum]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {forum?.threads.map((thread, i) => {
            return (
              <List
                onClick={handleClickOpen}
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  borderBottom: 1,
                  marginBottom: 2,
                  backgroundColor: "#F3F3F3",
                  cursor: "pointer",
                }}
              >
                {/*TODO: Pop up á thread component? eða senda á '/threads/id' ? */}
                <ListItem alignItems="center">
                  <ListItemIcon>
                    <ForumIcon
                      sx={{
                        color: "black",
                        fontSize: 30,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={thread.title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        {thread.description}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            );
          })}
          <ThreadComponent
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Forum;
