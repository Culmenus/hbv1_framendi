// veit ikki á þetta kannski að vera Index.tsx?
import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { ForumView } from "../../components/forumView/forumView";
import { mockForums } from "./fakecontent";
const Homepage: React.FC = () => {
  const [forums, setForums] = useState(mockForums);
  return (
    <Container>
      <Grid container spacing={3}>
        {forums.map((value) => {
          return (
            <Grid item xs={12} md={4} lg={3}>
              <ForumView forum={value} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Homepage;
