import React from "react";
import { Typography, Container, Button } from "@mui/material";
import { styled } from "@mui/system";
import InvestmentImage from "../../assets/images/Investment.jpg";
import { useNavigate } from "react-router-dom";

const HeroWrapper = styled("div")({
  position: "relative",
  textAlign: "center",
  color: "#fff",
  backgroundImage: `url(${InvestmentImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "600px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
});

const ContentBox = styled("div")({
  backgroundColor: "rgba(90, 40, 125)",
  padding: "24px",
  borderRadius: "8px",
  backdropFilter: "blur(5px)",
  width: "100%",
  maxWidth: "520px",
  wordWrap: "break-word",
  textAlign:'left',
  '@media (max-width: 768px)': {
    maxWidth: "80%", // Adjust as needed for smaller screens
  },
});

const HeroButton = styled(Button)({
  marginTop: "16px",
  color: "#fff",
  borderColor: "#fff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});



const Hero = () => {
  const navigate = useNavigate();
  const handleClick =()=>{
    navigate('/Signup');
  }
  return (
    <HeroWrapper style={{marginTop :"63px"}}>
      <Container style={{position:'absolute', left:'3%', bottom:'15%'}}>
        <ContentBox>
          <Typography variant="h4" style={{ marginBottom: "16px" }}>
            Discover Smart Investment Opportunities
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "24px" }}>
            Start building your financial future with secure and intelligent
            investment choices.
          </Typography>
          <HeroButton onClick = {handleClick} variant="outlined">Get Started</HeroButton>
        </ContentBox>
      </Container>
    </HeroWrapper>
  );
};

export default Hero;