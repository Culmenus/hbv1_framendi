import { Forum as TForum } from "../../types/Forum";
import { Button, Typography } from "@mui/material";


import { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import { User } from "../../types/User";

import * as React from "react";
import { Thread as TThread } from "../../types/Thread";
import CustomizedMenus from "./StyledMenu";
import ThreadComponent from "../thread/Thread";
import { useAddThreadMutation } from "../../app/services/backendConnection";
import Modal from "./Modal";

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
  const [creating, setCreating] = useState<boolean>(false);
  const [threads, setThreads] = useState<Array<TThread>>(forum.threads);
  const [sendThread, {data: newThread,isLoading, isSuccess}] = useAddThreadMutation();
  React.useEffect(()=> {
    if(newThread){
      setThreads((threads) => [...threads, newThread])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newThread])
  const addThread = (thread: TThread) => {
    sendThread({thread, forumId: forum.id.toString()})
  }
  const createThread = () => {
    setCreating(true);
    let thr: TThread = {
        title: "asdf",
        description: "awef",
        messages: [],
        lastUpdated: new Date(),
    }
    addThread(thr);
    console.log(creating);
  }
  if (creating) {
    return (<><Modal/></>);
  } 
  return (
    <>
      <Button onClick={createThread}>Create new thread</Button>
      {threads.map((thread: TThread, i: number) => {
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
            </ListItem>
            <CustomizedMenus />
          </List>
        )
      })}
      

    </>
  )
}
