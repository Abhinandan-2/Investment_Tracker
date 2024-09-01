import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import environmentalImage from '../../assets/ESG-e-environmental.jpg';
import socialImage from '../../assets/esg-s-social-2022-m.jpg';
import governanceImage from '../../assets/esg-g-governance-m.jpg';
import './Esg.css'
function EsgCards() {
  const cards = [
    {
      image: environmentalImage,
      title: "Environmental: the 'E' in ESG",
      description: "Environmental factors refer to the impact that a company has on the natural environment.",
    },
    {
      image: socialImage,
      title: "Social: the 'S' in ESG",
      description: "Social factors are those that affect people – whether employees, customers or society at large.",
    },
    {
      image: governanceImage,
      title: "Governance: the 'G' in ESG",
      description: "Governance factors relate to whether a company manages its business in a responsible way.",
    }
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={4} key={index}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={card.title}
                height="200"
                image={card.image}
              />
              <CardContent>
                <Typography variant="h6">
                  {card.title}
                </Typography>
                <Typography>
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default EsgCards;
