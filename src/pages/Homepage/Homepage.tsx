// veit ikki á þetta kannski að vera Index.tsx?
import {
  AppBar,
  Box,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import React, { useState } from "react";
import { useGetAllForumsQuery } from "../../app/services/backendConnection";
import { ForumView } from "../../components/forumView/forumView";
import MiniDrawer from "../../components/NavBar/Drawer";
//import NavBar from "../../components/NavBar/NavBar";
import { Forum } from "../../types/Forum";
import { mockForums } from "./fakecontent";
import { darkTheme } from "../PageMisc";
const Homepage = ({ forums }: { forums: Array<Forum> }) => {
  const { data, isLoading, isError, isSuccess } = useGetAllForumsQuery();
  //TODO loading
  if (!data || isLoading) {
    return <p>loading!</p>;
  }
  //TODO login again? or simply error
  if (!isSuccess) {
    return <p>log in?</p>;
  }
  //const [data, setData] = useState<Array<Forum>>(forums);
  return (
    <Container style={{ marginTop: "100px" }}>
      <Grid container spacing={3}>
        {data.map((value) => {
          return (
            <Grid key={value.id} item xs={12} md={4} lg={3}>
              <ForumView forum={value} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Homepage;
