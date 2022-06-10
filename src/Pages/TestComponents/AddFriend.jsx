import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

const emptyEmailError = "Email cannot be empty.";

export default function AddFriend() {
  const { isLoading, isLoggedIn } = useContext(UserContext);
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState();

  useEffect(() => {
    email && setEmailError(email.length > 0 ? "" : emptyEmailError);
  }, [email]);

  const add = async (e) => {
    e.preventDefault();
    if (!email) return setEmailError(emptyEmailError);

    try {
      const result = await axios.post("/users/friend", { email });
      alert(result?.data);
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
        Add Friend
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

      <TextField
        label="Email Address"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        error={Boolean(emailError)}
        helperText={emailError}
        style={{ margin: "20px 0" }}
      />
      <Button
        variant="contained"
        sx={{
          padding: "10px",
          fontSize: "16px",
        }}
        onClick={add}
      >
        Add Friend
      </Button>
    </Paper>
  );
}
