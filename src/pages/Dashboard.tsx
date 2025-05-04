import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Grid,
  Button,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  School as SchoolIcon,
  History as HistoryIcon,
  PlayArrow as PlayArrowIcon,
  Refresh as RefreshIcon,
  QuestionAnswer as QuestionAnswerIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const subjects = [
  { id: 'physics', name: 'Physics', icon: <SchoolIcon /> },
  { id: 'chemistry', name: 'Chemistry', icon: <SchoolIcon /> },
  { id: 'mathematics', name: 'Mathematics', icon: <SchoolIcon /> },
  { id: 'biology', name: 'Biology', icon: <SchoolIcon /> },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
  };

  const handleStartSession = () => {
    if (selectedSubject) {
      navigate(`/session?subject=${selectedSubject}&mode=learn`);
    }
  };

  const handleRevision = () => {
    if (selectedSubject) {
      navigate(`/session?subject=${selectedSubject}&mode=revision`);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            AI Tutor Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Subjects
              </Typography>
            </ListItem>
            {subjects.map((subject) => (
              <ListItem key={subject.id} disablePadding>
                <ListItemButton
                  selected={selectedSubject === subject.id}
                  onClick={() => handleSubjectSelect(subject.id)}
                >
                  <ListItemIcon>{subject.icon}</ListItemIcon>
                  <ListItemText primary={subject.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Quick Actions
              </Typography>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary="Session History" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <QuestionAnswerIcon />
                </ListItemIcon>
                <ListItemText primary="Ask Questions" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {selectedSubject ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  {subjects.find(s => s.id === selectedSubject)?.name} - Course Overview
                </Typography>
                <Typography variant="body1" paragraph>
                  Welcome to your {subjects.find(s => s.id === selectedSubject)?.name} learning journey!
                  Here you can start new sessions, review previous lessons, and track your progress.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={handleStartSession}
                  >
                    Start New Session
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={handleRevision}
                  >
                    Take Revision
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Last Session Summary
                </Typography>
                <Typography variant="body1" paragraph>
                  Topic: Electrostatics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: 45 minutes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Questions Asked: 8
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Progress: 75%
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Learning Progress
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}>
                    75%
                  </Avatar>
                  <Box>
                    <Typography variant="body1">
                      Overall Progress
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      You're making great progress! Keep it up!
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Select a subject from the sidebar to get started
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Choose a subject to view course details, start new sessions, or take revisions
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard; 