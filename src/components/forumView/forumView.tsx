import { Card, CardMedia, CardContent, Typography, Link } from "@mui/material";
import { Forum } from "../../types/Forum";
import Rating from '@mui/material/Rating';
import { useAppSelector } from "../../app/hooks";
import {selectCurrentUser} from "../../app/auth";
import {User} from '../../types/User';
import {useEffect, useState} from 'react';
import { useAddToFavoritesMutation, useDeleteFromFavoritesMutation } from "../../app/services/backendConnection";
type Props = {
  forum: Forum;
  homepage?: boolean
};
export function ForumView({ forum }: Props) {
  const imgNum = Math.floor(Math.random() * 17) + 1;
  const img = require(`./cards/img-${imgNum}.jpg`);
  let user: User | null = useAppSelector(selectCurrentUser);
  const [favoriteForums, setfavoriteForums] = useState<Array<Forum>>([]);
  const [addToFavorites, {data: newFavs}] = useAddToFavoritesMutation();
  const [deleteFromFavorites, {data: deletedFavs}] = useDeleteFromFavoritesMutation();
  const [value, setValue] = useState<number | null>(
    favoriteForums.some((value) => value.courseId === forum.courseId) ? 1 : 0
  )
  // const [user, setUser] = useState<user>()
  useEffect(()=> {
    if(user){
      setfavoriteForums(user.favoriteForums)
  
    }

  }, [user])
  useEffect(() => {
    setValue(favoriteForums.some((value) => value.courseId === forum.courseId) ? 1 : 0)

  },[favoriteForums, forum.courseId])
  useEffect(()=> {
    if(newFavs){
      setfavoriteForums(newFavs);
    }
    if(deletedFavs){
      setfavoriteForums(deletedFavs)
    }
  },[newFavs, setfavoriteForums, favoriteForums, deletedFavs]);
  

  return (
    <Link href={`forums/${forum.id}`} underline="hover">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={img.default}
          alt="picture for forum"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {forum.name}
          </Typography>
          <Typography
            style={{
              wordWrap: "break-word",
              whiteSpace: "pre-line",
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 5,
             }}
            variant="body2"
            color="text.secondary"
          >
            {forum.description}
          </Typography>
          
          <Rating 
            max={1}
            value={value}
            onChange={ (e, value) => {
              setValue(value);
              if(value && user){
                //send to backend
                addToFavorites({forum, userID: user.id})
              }else if (user) {
                deleteFromFavorites({forum, userID: user.id})
              }
            }}/>
        </CardContent>
      </Card>
    </Link>
  );
}
