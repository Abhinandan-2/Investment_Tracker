import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import './Esg.css'
function EsgEvolution() {
  return (
    <Box bgcolor="white" p={5}>
      <Typography variant="h3" align="center">
        The Evolution of ESG: A Modern Business Imperative
      </Typography>
      <Typography align="center" mt={2}>
        Influential voices in the business world, including Anne Finucane of Bank of America and Andrea Illy of illycaffè, have spotlighted the transformative journey of ESG:
      </Typography>

      <Grid container spacing={4} mt={4}>
        {[
          {
            icon: '➡️',
            title: 'From Optional to Essential',
            description: 'Once considered a supplementary luxury, ESG has now cemented its place as an indispensable cornerstone of modern business.'
          },
          {
            icon: '🌍',
            title: 'Beyond Financial Growth',
            description: "Today's vision of success encompasses not just fiscal prosperity but the enrichment of social and environmental landscapes."
          },
          {
            icon: '💡',
            title: 'Redefining Profit',
            description: "In the forward-thinking realms of ESG, profit is not just an end in itself. It's a powerful tool, channelized to achieve wider societal aspirations and sustainable impact."
          }
        ].map((item, index) => (
          <Grid item xs={4} key={index}>
            <Card variant="elevation" elevation={3} sx={{ height: '100%', transition: '0.3s', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="h5" align="center">{item.icon} {item.title}</Typography>
                <Typography mt={2}>{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default EsgEvolution;
