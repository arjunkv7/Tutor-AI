import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Tabs,
  Tab,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Drawer,
  AppBar,
  Toolbar,
  ListItemButton,
  IconButton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DescriptionIcon from '@mui/icons-material/Description';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import HistoryIcon from '@mui/icons-material/History';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const drawerWidth = 240;

const subjects = [
  {
    id: 'physics',
    name: 'Physics',
    icon: <SchoolIcon />,
    title: 'Physics - Current Electricity',
    chapter: 'CBSE Class 12 • Chapter 2 • Est. 60 mins',
    topic: 'Current Electricity',
    subjectLine: 'Physics • CBSE Class 12',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: <SchoolIcon />,
    title: 'Chemistry - Solutions',
    chapter: 'CBSE Class 12 • Chapter 2 • Est. 60 mins',
    topic: 'Solutions',
    subjectLine: 'Chemistry • CBSE Class 12',
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: <SchoolIcon />,
    title: 'Mathematics - Integrals',
    chapter: 'CBSE Class 12 • Chapter 7 • Est. 60 mins',
    topic: 'Integrals',
    subjectLine: 'Mathematics • CBSE Class 12',
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: <SchoolIcon />,
    title: 'Biology - Human Reproduction',
    chapter: 'CBSE Class 12 • Chapter 3 • Est. 60 mins',
    topic: 'Human Reproduction',
    subjectLine: 'Biology • CBSE Class 12',
  },
];

const progress = 65;

const lastSessionConcepts = [
  'Introduction to Solutions',
  'Concentration Units',
  'Vapor Pressure Depression',
];

const upNextConcepts = [
  'Boiling Point Elevation',
  'Osmotic Pressure',
];

const Dashboard2: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('chemistry');
  const navigate = useNavigate();

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
  };

  const handleResumeSession = () => {
    navigate(`/session?subject=${selectedSubject}&mode=learn`);
  };

  const subjectData = subjects.find((s) => s.id === selectedSubject) || subjects[0];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{ mr: 2 }}>
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
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, maxWidth: 1100, mx: 'auto' }}>
        <Toolbar />
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            {subjectData.title}
          </Typography>
          <Button variant="outlined" startIcon={<HelpOutlineIcon />} sx={{ mr: 2 }}>
            Raise Hand
          </Button>
          <Button variant="contained" startIcon={<FullscreenIcon />}>
            Fullscreen Mode
          </Button>
        </Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
          {subjectData.chapter}
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={4}>
              <Typography variant="h6">{subjectData.topic}</Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {subjectData.subjectLine}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress variant="determinate" value={progress} size={70} thickness={5} />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h6" component="div" color="primary">
                      {`${progress}%`}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Last studied 2 days ago
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    1h remaining
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Time Invested
              </Typography>
              <Paper sx={{ p: 2, textAlign: 'center', mt: 1 }} variant="outlined">
                <Typography variant="h6">2h</Typography>
                <Typography variant="caption" color="text.secondary">
                  Completed
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Duration
              </Typography>
              <Paper sx={{ p: 2, textAlign: 'center', mt: 1 }} variant="outlined">
                <Typography variant="h6">3h</Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Duration
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
              <Button variant="contained" startIcon={<PlayArrowIcon />} sx={{ minWidth: 160 }} onClick={handleResumeSession}>
                Resume Session
              </Button>
              <Button variant="outlined" startIcon={<DescriptionIcon />} sx={{ minWidth: 120 }}>
                Take Test
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Overview" />
            <Tab label="Concepts" />
            <Tab label="Activities" />
          </Tabs>
        </Box>
        {/* Tab Content */}
        {tab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Last Session Summary
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  In your last session, you covered key concepts related to solutions and colligative properties. You learned about freezing point depression and its applications in everyday scenarios.
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Key Concepts Covered:
                </Typography>
                <List>
                  {lastSessionConcepts.map((concept) => (
                    <ListItem key={concept}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText primary={concept} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Up Next
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Continue your learning journey with these upcoming concepts. The next session will focus on boiling point elevation and osmotic pressure.
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Upcoming Concepts:
                </Typography>
                <List>
                  {upNextConcepts.map((concept) => (
                    <ListItem key={concept}>
                      <ListItemText primary={concept} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        )}
        {tab === 1 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Concepts</Typography>
            <Typography variant="body2" color="text.secondary">
              (Concepts content goes here)
            </Typography>
          </Paper>
        )}
        {tab === 2 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">Activities</Typography>
            <Typography variant="body2" color="text.secondary">
              (Activities content goes here)
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard2; 