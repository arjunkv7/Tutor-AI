import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Stack,
  Grid,
  Divider,
} from '@mui/material';
import {
  Send as SendIcon,
  Fullscreen as FullscreenIcon,
  PanTool as PanToolIcon,
  VolumeUp as VolumeUpIcon,
  Warning as WarningIcon,
  Mic as MicIcon,
  Chat as ChatIcon,
  Notes as NotesIcon,
} from '@mui/icons-material';

const teacherName = 'Ms. Sharma';
const teacherAvatarUrl = '';

const lessonNotes = `Electrostatics is the study of electric charges at rest. In this lesson, you'll learn about Coulomb's Law, electric field, and potential. Visuals and audio will help you understand the concepts.`;
const topicImages = [
  'https://www.electronics-tutorials.ws/wp-content/uploads/2018/05/elec-elec1.gif',
  'https://www.electronics-tutorials.ws/wp-content/uploads/2018/05/elec-elec2.gif',
];

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'teacher';
  timestamp: Date;
  audioUrl?: string;
  isQuestion?: boolean;
}

const initialTeacherMessages: Message[] = [
  {
    id: 'welcome',
    text: `Hello! I'm ${teacherName}, and I'll be teaching you today. Let's start with the basics of Electrostatics.`,
    sender: 'teacher',
    timestamp: new Date(),
  },
  {
    id: 'q1',
    text: `Can you tell me what happens when two like charges are brought close to each other?`,
    sender: 'teacher',
    timestamp: new Date(),
    isQuestion: true,
  },
];

const TutorSession: React.FC = () => {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get('subject') || 'General';
  const [messages, setMessages] = useState<Message[]>(initialTeacherMessages);
  const [input, setInput] = useState('');
  const [showRaiseHand, setShowRaiseHand] = useState(false);
  const [question, setQuestion] = useState('');
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [lessonPaused, setLessonPaused] = useState(false);
  const [showAudioInput, setShowAudioInput] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      setShowExitDialog(true);
      setLessonPaused(true);
      return '';
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowExitDialog(true);
        setLessonPaused(true);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle student reply to teacher's question
  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: input, sender: 'user', timestamp: new Date() },
        // Simulate teacher's follow-up
        { id: (Date.now() + 1).toString(), text: `Good answer! When two like charges are brought close, they repel each other.`, sender: 'teacher', timestamp: new Date() },
      ]);
      setInput('');
    }
  };

  // Handle student asking a doubt
  const handleAskQuestion = () => {
    if (question.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: question, sender: 'user', timestamp: new Date() },
        { id: (Date.now() + 1).toString(), text: `That's a great question! Let me explain...`, sender: 'teacher', timestamp: new Date() },
      ]);
      setQuestion('');
      setShowRaiseHand(false);
    }
  };

  const handleExitSession = () => {
    setShowExitDialog(false);
    setLessonPaused(false);
    navigate('/dashboard2');
  };

  const handleResumeLesson = () => {
    setShowExitDialog(false);
    setLessonPaused(false);
  };

  const handleEnterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', bgcolor: '#f5f7fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', position: 'relative' }}>
      {/* Exit Warning Dialog */}
      <Dialog open={showExitDialog}>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="warning" /> Pause Lesson?
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to leave? Your lesson will be paused.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResumeLesson} color="primary">Resume Lesson</Button>
          <Button onClick={handleExitSession} color="error">Exit Session</Button>
        </DialogActions>
      </Dialog>

      {/* Main Layout: Lesson + Side Chat/Notes */}
      <Grid container sx={{ width: '100vw', height: '100vh', maxWidth: '100%', m: 0 }}>
        {/* Main Lesson Area */}
        <Grid item xs={12} md={7} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: '#f5f7fa', height: '100vh', overflowY: 'auto' }}>
          {/* Teacher Header */}
          <Stack direction="row" alignItems="center" gap={2} sx={{ mb: 2, width: '100%' }}>
            <Avatar src={teacherAvatarUrl} sx={{ width: 64, height: 64, bgcolor: '#bdbdbd', fontSize: 32 }}>
              {teacherName.split(' ').map((n) => n[0]).join('')}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={600}>{teacherName}</Typography>
              <Typography variant="body2" color="text.secondary">Remote {subject} Teacher</Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="outlined" startIcon={<FullscreenIcon />} onClick={handleEnterFullscreen}>
              Fullscreen Mode
            </Button>
          </Stack>
          {/* Lesson Explanation */}
          <Paper sx={{ p: 3, width: '100%', mb: 3 }}>
            <Stack direction="row" alignItems="center" gap={2}>
              <VolumeUpIcon color="primary" />
              <Typography variant="h6" fontWeight={500}>
                Electrostatics - Introduction
              </Typography>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" sx={{ mb: 2 }}>
              Electrostatics is the study of electric charges at rest. In this lesson, you'll learn about Coulomb's Law, electric field, and potential. Visuals and audio will help you understand the concepts.
            </Typography>
            <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" preload="auto" controls style={{ width: '100%' }} />
            <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
              {topicImages.map((img, idx) => (
                <img key={idx} src={img} alt="Visual" style={{ maxWidth: 200, borderRadius: 8, boxShadow: '0 2px 8px #0001' }} />
              ))}
            </Box>
          </Paper>
          {/* Lesson Notes */}
          <Paper sx={{ p: 2, width: '100%', bgcolor: '#fffde7', mb: 2 }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <NotesIcon color="secondary" />
              <Typography variant="subtitle1" fontWeight={600}>Lesson Notes</Typography>
            </Stack>
            <Typography variant="body2" sx={{ mt: 1 }}>{lessonNotes}</Typography>
          </Paper>
        </Grid>
        {/* Side Panel: Chat/Q&A */}
        <Grid item xs={12} md={5} sx={{ p: 4, bgcolor: '#fff', height: '100vh', borderLeft: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
          <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
            <ChatIcon color="primary" />
            <Typography variant="h6">Doubt & Interactive Q&A</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="contained" color="warning" startIcon={<PanToolIcon />} onClick={() => setShowRaiseHand(true)}>
              Raise Hand
            </Button>
          </Stack>
          {showRaiseHand && (
            <Paper sx={{ p: 2, mb: 2, width: '100%', textAlign: 'center' }}>
              <Typography variant="subtitle1" gutterBottom>Ask your question</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your question..."
                value={question}
                onChange={e => setQuestion(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" onClick={handleAskQuestion} startIcon={<SendIcon />}>Ask</Button>
            </Paper>
          )}
          {/* Chat/Q&A History */}
          <Paper sx={{ p: 2, minHeight: 300, bgcolor: '#f5f7fa', flex: 1, display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
            {messages.length === 0 ? (
              <Typography color="text.secondary" align="center">No messages yet. Use chat or "Raise Hand" to ask a question!</Typography>
            ) : (
              messages.map((msg) => (
                <Box key={msg.id} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1, flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                  <Avatar sx={{ bgcolor: msg.sender === 'teacher' ? 'primary.main' : 'grey.400', ml: msg.sender === 'user' ? 2 : 0, mr: msg.sender === 'teacher' ? 2 : 0 }}>
                    {msg.sender === 'teacher' ? teacherName.split(' ').map((n) => n[0]).join('') : 'U'}
                  </Avatar>
                  <Box sx={{ maxWidth: 350, bgcolor: msg.sender === 'teacher' ? '#e3f2fd' : '#f5f5f5', p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight={msg.sender === 'teacher' ? 600 : 400}>
                      {msg.sender === 'teacher' ? teacherName : 'You'}
                    </Typography>
                    <Typography variant="body1">{msg.text}</Typography>
                    <Typography variant="caption" color="text.secondary">{msg.timestamp.toLocaleTimeString()}</Typography>
                  </Box>
                </Box>
              ))
            )}
          </Paper>
          {/* Chat Input */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <IconButton color="primary" onClick={handleSendMessage}>
              <SendIcon />
            </IconButton>
            <IconButton color={showAudioInput ? 'primary' : 'default'} onClick={() => setShowAudioInput((v) => !v)}>
              <MicIcon />
            </IconButton>
            {showAudioInput && (
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                (Audio input coming soon)
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TutorSession; 