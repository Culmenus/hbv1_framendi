// veit ikki á þetta kannski að vera Index.tsx?
import { AppBar, Box, Container, Grid, Link, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGetAllForumsQuery } from "../../app/services/backendConnection";
import { ForumView } from "../../components/forumView/forumView";
import { Forum } from "../../types/Forum";
const FavoriteForums= ({forums, NavBar}: {forums: Array<Forum>, NavBar: JSX.Element}) => {
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

        {NavBar}

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
      </>
  );
};

export default FavoriteForums;
