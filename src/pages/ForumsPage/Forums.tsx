import React, { useEffect, useState } from "react";
//import Thread from '../thread/Thread'
import { useParams } from "react-router-dom";
//import ThreadComponent from '../thread/Thread';
import { Forum as TForum } from "../../types/Forum";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "../../pages/PageMisc";
import Container from "@mui/material/Container";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Paper, styled, Theme, Typography } from "@mui/material";
import ThreadComponent from "../../components/thread/Thread";
import { User } from "../../types/User";
import { Role } from "../../types/Role";
import { Thread as TThread } from "../../types/Thread";
import { Grid } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars-2";
import ForumComponent from "../../components/forum/Forum";
import {
  useGetForumQuery,
  useGetLoggedInQuery,
} from "../../app/services/backendConnection";

const Forum = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  const { data: user, isLoading: userLoading } = useGetLoggedInQuery();
  const [selectedValue, setSelectedValue] = React.useState("");
  const [selectedThread, setSelectedThread] = useState<TThread | null>(null);
  const [bgColor, setBgColor] = useState<string>("#1F1F1F");
  const [theme, setTheme] = useState<Theme>(darkTheme);

  const [forum, setForum] = useState<TForum | undefined>(undefined);
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetForumQuery({
    id: id ?? "",
  });
  useEffect(() => {
    if (isDarkTheme) {
      setBgColor("#1F1F1F");
      setTheme(darkTheme);
    }
  }, [isDarkTheme]);
  useEffect(() => {
    if (data) {
      setForum(data);
    }
    if (isDarkTheme) {
      setBgColor("#1F1F1F");
      setTheme(darkTheme);
    }
  }, [data, isDarkTheme]);
  return (
    <Container
      component="main"
      style={{
        marginTop: "100px",
      }}
    >
      <Typography variant="h5">{forum?.name}</Typography>
      <Grid container spacing={5}>
        <Grid item xs={6} md={4}>
          <Scrollbars style={{ height: "80vh" }}>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {forum ? (
                <ForumComponent
                  forum={forum}
                  setSelectedThread={setSelectedThread}
                  user={user}
                  bgColor={bgColor}
                />
              ) : null}
            </Box>
          </Scrollbars>
        </Grid>
        {selectedThread ? (
          <Grid item xs={6} md={8}>
            <ThreadComponent thread={selectedThread} />
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
};

export default Forum;
