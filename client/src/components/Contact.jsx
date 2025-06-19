import React from "react";
import {
  Container,
  Typography,
  IconButton,
  Card,
  CardContent,
  Box,
  Tooltip,
} from "@mui/material";
import { Call, MailOutline, LinkedIn } from "@mui/icons-material";

const Contact = () => {
  const handleSocialMediaClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fdfbfb, #ebedee)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          borderRadius: "16px",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
          backgroundColor: "#ffffffcc",
          backdropFilter: "blur(10px)",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 2,
              color: "#333",
            }}
          >
            Get in Touch
          </Typography>

          <Typography variant="body1" textAlign="center" mb={3}>
            We'd love to hear from you. Whether it's feedback, questions, or just a hello—reach out!
          </Typography>

          {/* Phone */}
          <Box sx={infoBoxStyle}>
            <Tooltip title="Call Us">
              <IconButton sx={iconButtonStyle}>
                <Call color="primary" />
              </IconButton>
            </Tooltip>
            <Typography variant="body1">+91 1234567890</Typography>
          </Box>

          {/* Email */}
          <Box sx={infoBoxStyle}>
            <Tooltip title="Email Us">
              <IconButton sx={iconButtonStyle}>
                <MailOutline color="secondary" />
              </IconButton>
            </Tooltip>
            <Typography variant="body1">demo@gmail.com</Typography>
          </Box>


        </CardContent>
      </Card>
    </Box>
  );
};

// Styles
const infoBoxStyle = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  mb: 2,
  px: 1,
};

const iconButtonStyle = {
  backgroundColor: "#f0f0f0",
  "&:hover": {
    backgroundColor: "#e0e0e0",
    transform: "scale(1.05)",
  },
  transition: "0.3s ease",
};

export default Contact;
