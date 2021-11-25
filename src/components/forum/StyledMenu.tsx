import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDeleteThreadMutation } from "../../app/services/backendConnection";
import { Thread } from "../../types/Thread";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus({
  editing,
  setEditing,
  thread,
  deleteThreadInUI,
  setThreadToEdit,
  setTitle,
  setDescription,
}: {
  editing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
  thread: Thread,
  deleteThreadInUI: Function,
  setThreadToEdit: Function,
  setTitle: Function,
  setDescription: Function,
}) {
  const [deleteThread, { data: isDeleted }] = useDeleteThreadMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    if(isDeleted){
      deleteThreadInUI(thread);
    }
  },[isDeleted])
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls="long-menu"
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit} disableRipple
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div 
          onClick={
            () => {
              setThreadToEdit(thread)
              setTitle(thread.title)
              setDescription(thread.description)
              setEditing(true)
            }
          }>
            <EditIcon />
            Edit
          </div>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleDelete} disableRipple
          sx={{
            width: '100%',
          }}
        >
          {/*trash icon here */}
          <div
            style={{
              width: '100%',
              display:'flex',

              justifyContent: 'center',
            }}
            onClick={
              () => {
                if(thread.id)
                  deleteThread({threadId: thread.id});
              }
            }
          >
            <DeleteForeverIcon />
            Delete
          </div>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
