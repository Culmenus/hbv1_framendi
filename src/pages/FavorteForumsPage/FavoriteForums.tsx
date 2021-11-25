// veit ikki á þetta kannski að vera Index.tsx?
import {
  AppBar,
  Box,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { selectCurrentUser } from "../../app/auth";
import { useAppSelector } from "../../app/hooks";
import { useGetAllForumsQuery } from "../../app/services/backendConnection";
import ForumList from "../../components/forumList/forumList";
import { ForumView } from "../../components/forumView/forumView";
import { Forum } from "../../types/Forum";
const FavoriteForums = ({NavBar}: {NavBar: JSX.Element}) => {
  const user = useAppSelector(selectCurrentUser);

  if(user) {
    return(
      <>
        {NavBar}
        <ForumList data={user.favoriteForums} />
      </>
    )
  }
  return (
    <>
      {NavBar} 
    </>
  )
};

export default FavoriteForums;
