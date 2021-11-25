// veit ikki á þetta kannski að vera Index.tsx?
import {
  AppBar,
  Box,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import {useAppSelector} from "../../app/hooks"
import {selectCurrentUser} from "../../app/auth"
import React, { useState } from "react";
import { useGetAllForumsQuery } from "../../app/services/backendConnection";
import { ForumView } from "../../components/forumView/forumView";
import MiniDrawer from "../../components/NavBar/Drawer";
//import NavBar from "../../components/NavBar/NavBar";
import { Forum } from "../../types/Forum";
//import { mockForums } from "./fakecontent";
import { darkTheme } from "../PageMisc";
import ForumList from "../../components/forumList/forumList";
const Homepage = () => {
  const { data, isLoading, isError, isSuccess } = useGetAllForumsQuery();
  const user = useAppSelector(selectCurrentUser);
  //TODO loading
  if (!data || isLoading) {
    return <p>loading!</p>;
  }
  //TODO login again? or simply error
  if (!isSuccess) {
    return <p>log in?</p>;
  }
  //const [data, setData] = useState<Array<Forum>>(forums);

  return (
    <ForumList  data={data}/>
  );
};

export default Homepage;
