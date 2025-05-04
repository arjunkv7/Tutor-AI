import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';

const subjects = [
  { id: 'physics', name: 'Physics', color: '#2196f3' },
  { id: 'chemistry', name: 'Chemistry', color: '#4caf50' },
  { id: 'mathematics', name: 'Mathematics', color: '#f44336' },
  { id: 'biology', name: 'Biology', color: '#9c27b0' },
];

const SubjectSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleSubjectSelect = (subjectId: string) => {
    navigate(`/session?subject=${subjectId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Select Your Subject
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4 }}>
        Choose a subject to start your AI tutoring session
      </Typography>
      <Grid container spacing={3}>
        {subjects.map((subject) => (
          <Grid item xs={12} sm={6} md={3} key={subject.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
              onClick={() => handleSubjectSelect(subject.id)}
            >
              <Box
                sx={{
                  height: 120,
                  backgroundColor: subject.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h2" sx={{ color: 'white' }}>
                  {subject.name.charAt(0)}
                </Typography>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {subject.name}
                </Typography>
                <Typography>
                  Interactive AI tutoring for CBSE Class 12 {subject.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SubjectSelection; 