
import { AppBar, Link, Toolbar, Typography } from "@mui/material";


export default function NavBar({href = "home"}: {href: string}){
    //Mogulega bæta favorited forums í nav bar
    const toolBars = {
        "Home": {url: '/'},
        "My forums": {url: 'myforums'},
    }
    return(
        <AppBar 
              position="sticky"
              elevation={0}
              sx= {{
                height: '100vh',
                backgroundColor: 'purple',
                display: 'flex',
                justifyContent: 'center',
                width: '10vw',
              }}
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
              
            </AppBar>
    )
}