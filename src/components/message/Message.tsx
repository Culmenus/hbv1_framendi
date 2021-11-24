import { Box, Container, Typography } from "@mui/material";
import { Message, MessageDto } from "../../types/Message";

type Props = {
  msg: MessageDto;
};
export function MessageComponent({
  msg: { userID, username, message, createdAt },
}: Props) {
  const myID = 1;
  return (
    <Box
      justifyContent={userID === myID ? "flex-end" : "flex-start"}
      sx={{
        backgroundColor: "blue",
        margin: 1,
        width: "50%",
        borderRadius: 5,
        padding: 2,
      }}
    >
      <Typography>{username || "Óþekktur notandi"}</Typography>
      <Typography style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>
        {message}
      </Typography>
      <Typography>{createdAt}</Typography>
    </Box>
  );
}

export default MessageComponent;
