import { Divider, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

const emptyEmailError = "Email cannot be empty.";

export default function AddFriend() {
  const { userData } = useContext(UserContext);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 550,
        height: 160,
        p: 1,
        m: 8,
        boxShadow: 3,
      }}
    >
      <Typography variant="h6" component="div" sx={{ p: 1 }}>
        User Data
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body1" component="div" sx={{ p: 1 }}>
        <div>Username : {userData.username}</div>
        <div>User ID : {userData._id}</div>
        <div>Email : {userData.email}</div>
      </Typography>
    </Paper>
  );
}
