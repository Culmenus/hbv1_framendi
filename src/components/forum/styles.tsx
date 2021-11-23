import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";


export const useContainerStyles = makeStyles(() =>
  createStyles({

    threadContainer: {
      display: "flex",
      flexDirection: 'row',
      width: '100%',

    },

  })
);