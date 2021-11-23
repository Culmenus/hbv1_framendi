import React, { useEffect, useState } from 'react';
//import Thread from '../thread/Thread'
import { useParams } from 'react-router-dom';
//import ThreadComponent from '../thread/Thread';
import { Forum as TForum } from "../../types/Forum";
import { mockForums } from '../../pages/HomePage/fakecontent';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from '../../pages/PageMisc';
import Container from '@mui/material/Container';


import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Paper, styled, Theme } from '@mui/material';
import ThreadComponent from '../../components/thread/Thread';
import {User } from '../../types/User';
import {Role } from '../../types/Role';
import {Thread as TThread} from '../../types/Thread';
import { Grid } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars-2';
import ForumComponent from '../../components/forum/Forum';


const Forum = ({isDarkTheme, user}: {isDarkTheme: boolean, user: User}) => {
  const [currentUser, setCurrentUser] = useState<User>(user);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [selectedThread, setSelectedThread] = useState<TThread | null>(null);
  const [bgColor, setBgColor] = useState<string>("#1F1F1F");
  const [theme, setTheme] = useState<Theme>(darkTheme);



  //const Item = styled(Paper)(({ theme }) => ({
  //  ...theme.typography.body2,
  //  padding: theme.spacing(1),
  //  textAlign: 'center',
  //  color: theme.palette.text.secondary,
  //}));

  const [forum, setForum] = useState<TForum | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    if(isDarkTheme){
      setBgColor("#1F1F1F");
      setTheme(darkTheme);
    }
  },[isDarkTheme])
  useEffect(() => {
    if (id)
      setForum(mockForums.find(forum => forum.id === parseInt(id)));
    if(isDarkTheme){
      setBgColor("#1F1F1F");
      setTheme(darkTheme);
    }
  },[id,forum,isDarkTheme])
  return (
    <ThemeProvider theme={theme}>
        <Container 
          component="main"
          style={{
            marginTop: '100px',
          }}
        >
          <CssBaseline />
          <Grid container spacing={5}>
            <Grid item xs={6}>
                <Scrollbars style={{ height: '80vh'}}>
                  <Box
                    sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {forum? 
                    <ForumComponent 
                        forum= {forum}
                        setSelectedThread={setSelectedThread}
                        user={currentUser}
                        bgColor={bgColor}
                        />
                        : null}
                  </Box>
                </Scrollbars>
            </Grid>
            {selectedThread?
              <Grid item xs={6}>
                  <ThreadComponent
                    thread={selectedThread}
                  />
              </Grid> : null}
          </Grid>
        </Container>
    </ThemeProvider>
  );
}


export default Forum;