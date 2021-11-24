import { ThemeProvider } from "@material-ui/styles";
import { Container, CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../app/auth";
import { darkTheme } from "../PageMisc";
import { User } from "../../types/User";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function UpdatePassword() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
						<TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function NestedList() {
	const [open, setOpen] = React.useState(true);
	const user: User | null = useAppSelector(selectCurrentUser);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Change password" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
				<UpdatePassword />
      </Collapse>
    </List>
  );
}


export default function Userpage() {
	const navigate = useNavigate();
	const user: User | null = useAppSelector(selectCurrentUser);
	console.log(user);


	return (
		<ThemeProvider theme={darkTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
          sx={{
            marginTop: 16,
						marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
					<Avatar sx={{ width: 254, height: 254 }}>

					</Avatar>
					<Typography sx={{marginTop:2, marginBottom:1}}component="h1" variant="h5">
            {user?.username}
          </Typography>
					<NestedList/>
				</Box>
			</Container>
		</ThemeProvider>
	)
}