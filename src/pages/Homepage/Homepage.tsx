// veit ikki á þetta kannski að vera Index.tsx?
import { Container, Grid, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { useGetAllForumsQuery } from "../../app/services/backendConnection";
import { ForumView } from "../../components/forumView/forumView";
import { darkTheme } from "../PageMisc";
import { mockForums } from "./fakecontent";
const Homepage: React.FC = () => {
  const [forums, setForums] = useState(mockForums);
  const { data, isLoading, isError, isSuccess } = useGetAllForumsQuery();
  //TODO loading
  if (!data || isLoading) {
    return <p>loading!</p>;
  }
  //TODO login again? or simply error
  if (!isSuccess) {
    return <p>log in?</p>;
  }
  return (
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
  );
};

export default Homepage;
