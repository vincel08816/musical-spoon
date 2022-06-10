import { Button, Divider, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

export default function SendMessage() {
  const { isLoading, isLoggedIn, userData } = useContext(UserContext);
  const [error, setError] = useState();
  // const [message, setMessage] = useState("");
  // const [reciever, setReciever] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/chat/message", {
        members: ["629ba72464490aa479cd342a", "629ba86f037fbe1293fa4560"],
        message: "Test message",
      });
    } catch (error) {
      console.error(error);
      setError("Unable to add friend.");
    }
  };

  if (!isLoading && !isLoggedIn) return <Navigate to="/" />;

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 600,
        height: 300,
        p: 3,
        m: 10,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" component="div" sx={{ p: 2 }}>
        Send Message
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {error && (
        <Typography
          color="error"
          variant="body2"
          sx={{ margin: "-10px 0 10px 10px" }}
        >
          {error}
        </Typography>
      )}

      {/* <TextField
        label="Recieving User"
        name="reciever"
        onChange={(e) => setReciever(e.target.value)}
        value={reciever}
        style={{ margin: "20px 0" }}
      />

      <TextField
        label="Message"
        name="message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        style={{ margin: "20px 0" }}
      /> */}
      <Button
        variant="contained"
        sx={{
          padding: "10px",
          fontSize: "16px",
        }}
        onClick={sendMessage}
      >
        Send message
      </Button>
    </Paper>
  );
}
