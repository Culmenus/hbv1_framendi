import { Forum as TForum } from "../../types/Forum";
import { Button, Typography } from "@mui/material";


import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { User } from "../../types/User";

import { Thread as TThread } from "../../types/Thread";
import CustomizedMenus from "./StyledMenu";

export default function ForumComponent({
  forum,
  setSelectedThread,
  user,
  bgColor,
}: {
  forum: TForum;
  setSelectedThread: Function;
  user: User | undefined;
  bgColor: string;
}) {
  const createThread = () => {
    
  }
  return (
    <>
      {forum.threads.map((thread: TThread, i: number) => {
        console.log(thread)
        return (
          <List
            key={i}
            onClick={() => {
              setSelectedThread(thread);
            }}
            sx={{
              width: "100%",
              maxWidth: 500,
              borderBottom: 1,
              marginBottom: 2,
              padding: 0,
              backgroundColor: bgColor,
              cursor: "pointer",
            }}
          >
            {/*TODO: Pop up á thread component? eða senda á '/threads/id' ? */}
            <ListItem alignItems="center">
              <ListItem
                alignItems="flex-start"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 2,
                }}
              >
                <ListItemAvatar>
                  <Avatar>{user?.username[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      {user?.username}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{
                        color: "grey",
                        fontSize: 8,
                      }}
                    >
                      YYYY/MM/DD hh:mm:ss
                    </Typography>
                  }
                />
              </ListItem>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {thread.title}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline", flex: 2 }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {thread.description}
                    </Typography>
                  </React.Fragment>
                }
              />
              {user?.id /*=== thread.user?.id */? 
              <CustomizedMenus /> : null}
            </ListItem>
          </List>
        )
      })}
      <Button onClick={createThread}>Create new thread</Button>

    </>
  )
}
