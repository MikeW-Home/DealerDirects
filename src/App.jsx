import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DirectBuy from "./pages/DirectBuy";
import SalesAids from "./pages/SalesAids";
import "./App.css";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Check if user is already authenticated (from localStorage)
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with backend validation
    if (password === "hardware") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    setPassword("");
  };

  // Password protection screen
  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: "100%",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Dealer Directs
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Please enter the password to access the site
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error}
                helperText={error}
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" fullWidth size="large">
                Login
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    );
  }

  // Main app content
  return (
    <Router>
      <div className="App">
        <header className="bg-blue-600 text-white p-4">
          <div className="max-w-7xl mx-auto flex justify-end items-center">
            {/* <h1 className="text-2xl font-bold">Dealer Directs</h1> */}

            <Button variant="outlined" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>
        <main className="p-4">
          <>
            <Link to="/" className="mr-4 text-white">
              Direct Buy
            </Link>
            <Link to="/sales-aids" className="mr-4 text-white">
              Sales Aids
            </Link>
          </>
          <Routes>
            <Route path="/" element={<DirectBuy />} />
            <Route path="/sales-aids" element={<SalesAids />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
