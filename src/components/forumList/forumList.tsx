import {Container,Grid } from "@mui/material";
import {ForumView} from '../forumView/forumView';
import {Forum} from '../../types/Forum';

const ForumList = ({data} : {data: Array<Forum>}) => {
    return (
    <Container style={{ marginTop: "100px" }}>
      <Grid container spacing={3}>
        {data.map((value: Forum) => {
          return (
            <Grid key={value.id} item xs={12} md={4} lg={3}>
              <ForumView forum={value} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
    )
}

export default ForumList;