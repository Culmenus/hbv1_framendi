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
import { NullLiteral } from "typescript";


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
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
					<Avatar sx={{ width: 254, height: 254 }}>
						
					</Avatar>
					<Typography component="h1" variant="h5">
            {user?.username}
          </Typography>
				</Box>
			</Container>
		</ThemeProvider>
	)
}