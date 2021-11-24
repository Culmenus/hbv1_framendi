import { Card, CardMedia, CardContent, Typography, Link } from "@mui/material";
import { Forum } from "../../types/Forum";
import Rating from '@mui/material/Rating';
import { useAppSelector } from "../../app/hooks";
import {selectCurrentUser} from "../../app/auth";
import {User} from '../../types/User';
import {useEffect, useState} from 'react';
import { useAddToFavoritesMutation } from "../../app/services/backendConnection";
type Props = {
  forum: Forum;
  homepage?: boolean
};
export function ForumView({ forum, homepage= false }: Props) {
  const imgNum = Math.floor(Math.random() * 17) + 1;
  const img = require(`./cards/img-${imgNum}.jpg`);
  const user: User | null = useAppSelector(selectCurrentUser);
  const [favoriteForums, setfavoriteForums] = useState<Array<Forum>>([]);
  const [addToFavorites, {data: newFavs}] = useAddToFavoritesMutation();
  useEffect(()=> {
    if(user){
      setfavoriteForums(user.favoriteForums)
    }
  }, [user, setfavoriteForums])
  useEffect(()=> {
    if(newFavs){
      setfavoriteForums(newFavs);
    }
  },[newFavs, setfavoriteForums]);
  const [value, setValue] = useState<number | null>(
    favoriteForums?.indexOf(forum) ? 0 : 1
  )

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
          {homepage ? 
          <Rating 
            max={1}
            value={value}
            onChange={ (e, value) => {
              setValue(value);
              if(value && user){
                //send to backend
                addToFavorites({forum, userID: user.id})
              }
            }}/> : null }
        </CardContent>
      </Card>
    </Link>
  );
}
