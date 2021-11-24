import { Box, Container, Typography } from "@mui/material";
import { Message, MessageDto } from "../../types/Message";
import { simpleFormattedDate } from "../../utils/DateUtils";
type Props = {
  msg: MessageDto;
  myID: number | null;
};
export function MessageComponent({
  msg: { userID, username, message, createdAt },
  myID,
}: Props) {
  const align = userID === myID ? "end" : "start";
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={align}
      sx={{
        // backgroundColor: userID === myID ? "blue" : "gray",
        margin: 1,
        borderTop: 1,
        borderColor: "gray",
        width: "95%",
        padding: 0,
      }}
    >
      <Typography
        color={userID === myID ? "darkcyan" : "gray"}
        variant="caption"
      >
        {username || "Óþekktur notandi"}
      </Typography>
      <Typography style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>
        {message}
      </Typography>
      <Typography color="gray" variant="caption">
        {simpleFormattedDate(createdAt)}
      </Typography>
    </Box>
  );
}

export default MessageComponent;
