import { Box, Container, Typography } from "@mui/material";
import { Message, MessageDto } from "../../types/Message";

type Props = {
  msg: MessageDto;
  myID: number | null;
};
export function MessageComponent({
  msg: { userID, username, message, createdAt },
  myID,
}: Props) {
  return (
    <Box
      justifyContent={userID === myID ? "flex-end" : "flex-start"}
      sx={{
        backgroundColor: userID === myID ? "gray" : "blue",
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
