
import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";


import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function ThemeToggleButton( {setDarkMode}: {setDarkMode: Function}) {
  const [alignment, setAlignment] = React.useState('Dark');

  const handleChange = (event: any, newAlignment: React.SetStateAction<string>) => {
    setAlignment(newAlignment);
    setDarkMode(newAlignment === 'Dark');
  };

  return (
      <div
      style={{
        flex: 1,
      }}
      >
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="Dark">
            <Typography
              sx= {{
                fontWeight: 'bold',
                color: 'white'
              }}
            >
              Dark
            </Typography>
          </ToggleButton>
          <ToggleButton value="Light">
            <Typography
                sx= {{
                  fontWeight: 'bold',
                  color: 'white'
                }}
              >
                Light
            </Typography>
          </ToggleButton>

        </ToggleButtonGroup>
      </div>
  );
}

export default function NavBar({href = "home", setDarkMode}: {href: string,setDarkMode: Function}){
    //Mogulega bæta favorited forums í nav bar
    const toolBars = {
        "Home": {url: '/'},
        "My forums": {url: 'myforums'},
    }
    return(
        <AppBar 
              position="relative"
              elevation={0}
              sx= {{
                backgroundColor: 'purple',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ThemeToggleButton setDarkMode={setDarkMode}/>
              <Box
                flex={2}
                display='flex'
                flexDirection='row'
              >
                {Object.entries(toolBars).map(([name,url]) => {
                    return (
                    <>
                        <Link href={url.url}>
                          <Toolbar
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              backgroundColor: name === href ?'#6D0578' : 'purple',
                              cursor: 'pointer',
                              marginBottom: 1,
                              marginTop: 1,
                            }}
                          >
                            <Typography
                              sx= {{
                                fontWeight: 'bold',
                                color: 'white',
                                textDecoration: 'none',
                              }}
                            >
                              {name}
                            </Typography>
                          </Toolbar>
                        </Link>
                    </>
                    )
                })}
              </Box>
            </AppBar>
    )
}