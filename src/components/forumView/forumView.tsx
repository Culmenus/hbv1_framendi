import { Card, CardMedia, CardContent, Typography, Link } from "@mui/material";
import { Forum } from "../../types/Forum";
type Props = {
  forum: Forum;
};
export function ForumView({ forum }: Props) {
  const imgNum = Math.floor(Math.random() * 17) + 1;
  const img = require(`./cards/img-${imgNum}.jpg`);
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
        </CardContent>
      </Card>
    </Link>
  );
}
