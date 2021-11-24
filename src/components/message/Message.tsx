import { Box, Container, Typography } from "@mui/material";
import { Message } from "../../types/Message";

type Props = {
  msg: Message;
};
export function MessageComponent({
  msg: { sentBy, message, createdAt },
}: Props) {
  const myID = 1;
  console.log(sentBy);
  return (
    <Box
      justifyContent={sentBy?.id === myID ? "flex-end" : "flex-start"}
      sx={{
        backgroundColor: "blue",
        margin: 1,
        width: "50%",
        borderRadius: 5,
        padding: 2,
      }}
    >
      <Typography>{sentBy?.username || "Óþekktur notandi"}</Typography>
      <Typography style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>
        {message}
      </Typography>
      <Typography>{createdAt}</Typography>
    </Box>
  );
}

export default MessageComponent;
