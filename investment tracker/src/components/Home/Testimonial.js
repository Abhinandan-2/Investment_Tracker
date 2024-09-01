import React from 'react';
import { Typography, Box, Grid, Avatar, Container } from '@mui/material';
import Testimonial1 from '../../assets/images/Testimonial1.jpg';
import Testimonial2 from '../../assets/images/Testimonial2.jpg';

const Testimonials = () => {
  const testimonialData = [
    {
      id: 1,
      name: 'Ananya Sharma',
      avatarUrl: Testimonial2,
      feedback: 'I am extremely satisfied with the Investment Tracker app. It helped me make informed decisions about my investments. Kudos to the team!',
    },
    {
      id: 2,
      name: 'Raj Kapoor',
      avatarUrl: Testimonial1,
      feedback: 'Investment Tracker simplified my portfolio management. The ESG education section is excellent and provided valuable insights. Highly recommended!',
    },
    {
      id: 3,
      name: 'Priya Patel',
      avatarUrl: Testimonial2,
      feedback: 'The apps user-friendly interface and real-time stock updates have made my investment journey stress-free. Great work, Investment Tracker team!',
    },
  ];

  return (
    <Box id="testimonials" sx={{ backgroundColor: '#f2ecfd', py: 6, marginTop:'24px'}}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Testimonials
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {testimonialData.map((testimonial) => (
            <Grid item key={testimonial.id} xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar src={testimonial.avatarUrl} alt={testimonial.name} sx={{ width: 150, height: 150, mx: 'auto' }} />
                <Typography variant="h6" gutterBottom>
                  {testimonial.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {testimonial.feedback}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
