// veit ikki á þetta kannski að vera Index.tsx?
import { AppBar, Box, Container, Grid, Link, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGetAllForumsQuery } from "../../app/services/backendConnection";
import { ForumView } from "../../components/forumView/forumView";
import NavBar from "../../components/NavBar/NavBar";
import { Forum } from "../../types/Forum";
import { mockForums } from "./fakecontent";
const Homepage= ({forums}: {forums: Array<Forum>}) => {
  //const { data, isLoading, isError, isSuccess } = useGetAllForumsQuery();
  ////TODO loading
  //if (!data || isLoading) {
  //  return <p>loading!</p>;
  //}
  ////TODO login again? or simply error
  //if (!isSuccess) {
  //  return <p>log in?</p>;
  //}
  const [data, setData] = useState(forums);
  return (
      <>
        <Box
          display="flex"
          flexDirection="row"
        >
          <Box flexGrow={0}>
            <NavBar href={"Home"} />
          </Box>
          <Box display="flex" flexDirection="row" flexGrow={1} marginTop={10}>
            <Container>
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
          </Box>
        </Box>
      </>
  );
};

export default Homepage;
