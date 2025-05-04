import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  IconButton,
  Drawer,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import QuizIcon from '@mui/icons-material/Quiz';
import SendIcon from '@mui/icons-material/Send';

const slides = [
  {
    title: 'Introduction to Solutions',
    content: (
      <>
        <Typography variant="body1" sx={{ mb: 2 }}>
          A solution is a homogeneous mixture of two or more substances. The substance present in the largest amount is called the <b>solvent</b>, while the substance present in a smaller amount is called the <b>solute</b>. Solutions can be solid, liquid, or gas.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Common examples include:
        </Typography>
        <ul style={{ marginTop: 0 }}>
          <li>Salt dissolved in water</li>
          <li>Air (mixture of gases)</li>
          <li>Brass (solid solution of copper and zinc)</li>
        </ul>
      </>
    ),
    image: 'https://www.vedantu.com/seo/content-images/0e2e2e2e-2e2e-2e2e-2e2e-2e2e2e2e2e2e.png',
    imageCaption: 'Figure: Introduction to Solutions',
    checkpoints: [
      'Definition of solution',
      'Solvent and solute',
      'Examples of solutions',
    ],
    notes: 'Remember: A solution is always homogeneous. The solvent is present in the largest amount.',
  },
  {
    title: 'Solvent and Solute',
    content: (
      <>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The <b>solvent</b> is the component of a solution that is present in the greatest amount. The <b>solute</b> is the substance that is dissolved in the solvent. For example, in a saltwater solution, water is the solvent and salt is the solute.
        </Typography>
      </>
    ),
    image: 'https://www.vedantu.com/seo/content-images/2e2e2e2e-2e2e-2e2e-2e2e-2e2e2e2e2e2e.png',
    imageCaption: 'Figure: Solvent and Solute',
    checkpoints: [
      'Identify solvent and solute',
      'Examples: saltwater, sugar in tea',
    ],
    notes: 'Tip: The solvent is usually the component in greater quantity.',
  },
  {
    title: 'Types of Solutions',
    content: (
      <>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Solutions can be classified based on the physical state of the solvent and solute. For example:
        </Typography>
        <ul style={{ marginTop: 0 }}>
          <li>Gas in gas (e.g., air)</li>
          <li>Liquid in liquid (e.g., alcohol in water)</li>
          <li>Solid in solid (e.g., alloys like brass)</li>
        </ul>
      </>
    ),
    image: 'https://www.vedantu.com/seo/content-images/3e3e3e3e-3e3e-3e3e-3e3e-3e3e3e3e3e3e.png',
    imageCaption: 'Figure: Types of Solutions',
    checkpoints: [
      'Classification by state',
      'Examples: air, alcohol in water, brass',
    ],
    notes: 'Solid, liquid, and gas solutions exist in nature and industry.',
  },
];

const quote = `"The depression of freezing point is directly proportional to the molality of the solution. This means that the more solute particles you add, the lower the freezing point becomes. This property is used in everyday applications like adding salt to ice to lower its freezing point, which is useful in making ice cream or de-icing roads in winter."`;

// Simple animated bars for audio visualization
const AudioBars = ({ playing }: { playing: boolean }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 24, justifyContent: 'center', mb: 1 }}>
    {[0, 1, 2, 3, 4].map((i) => (
      <Box
        key={i}
        sx={{
          width: 4,
          height: playing ? `${8 + Math.random() * 16}px` : '8px',
          background: playing ? '#1976d2' : '#b3c6e6',
          borderRadius: 1,
          mx: 0.5,
          transition: 'height 0.2s',
          animation: playing ? `audioBarAnim 1s infinite linear alternate` : 'none',
          animationDelay: `${i * 0.1}s`,
        }}
      />
    ))}
    <style>{`
      @keyframes audioBarAnim {
        0% { height: 8px; }
        100% { height: 24px; }
      }
    `}</style>
  </Box>
);

const Session2: React.FC = () => {
  const [slide, setSlide] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showChat, setShowChat] = useState<'none' | 'question' | 'test'>('none');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAudioPlay = () => setAudioPlaying(true);
  const handleAudioPause = () => setAudioPlaying(false);

  const handleSendChat = () => {
    if (chatInput.trim()) {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'user', text: chatInput },
        { sender: 'ai', text: showChat === 'question' ? 'Thanks for your question! Here is an explanation...' : 'Test response: Good job!' },
      ]);
      setChatInput('');
    }
  };

  // Play/pause audio programmatically (no controls)
  const handleAudioClick = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f7fafd', display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
      {/* Left Sidebar: Buttons & Checkpoints */}
      <Box sx={{ width: 240, bgcolor: '#f4f7fb', color: '#222', display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'center', py: 5, px: 2, gap: 4, boxShadow: 1, borderRight: '1px solid #e3e8ee', minHeight: '100vh' }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<QuestionAnswerIcon />}
            onClick={() => setShowChat('question')}
            fullWidth
            sx={{ borderRadius: 2, fontWeight: 600, fontSize: 15, borderColor: '#b3c6e6', color: '#2a4d7a', background: '#fff', '&:hover': { background: '#eaf1fb' } }}
          >
            Ask a Question
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<QuizIcon />}
            onClick={() => setShowChat('test')}
            fullWidth
            sx={{ borderRadius: 2, fontWeight: 600, fontSize: 15, borderColor: '#b3c6e6', color: '#7a2a4d', background: '#fff', '&:hover': { background: '#fbeaf1' } }}
          >
            Take Test
          </Button>
        </Stack>
        <Paper sx={{ bgcolor: '#f7fafd', color: '#222', p: 2, borderRadius: 2, width: '100%', mt: 4, boxShadow: 0, border: '1px solid #e3e8ee' }}>
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, letterSpacing: 0.5, color: '#2a4d7a' }}>Checkpoints</Typography>
          <List dense>
            {slides[slide].checkpoints.map((cp, idx) => (
              <ListItem key={idx} sx={{ py: 0.5 }}>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={cp} primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1, borderColor: '#e3e8ee' }} />
          <Typography variant="caption" color="#7a2a4d" sx={{ fontWeight: 500 }}>{slides[slide].notes}</Typography>
        </Paper>
      </Box>
      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6, px: { xs: 1, md: 6 }, minWidth: 0, zIndex: 1 }}>
        {/* Explanation/Quote */}
        <Paper elevation={1} sx={{ maxWidth: 800, p: 4, mb: 4, bgcolor: '#fff', color: '#2a4d7a', borderRadius: 3, textAlign: 'center', fontSize: 20, fontWeight: 500, letterSpacing: 0.2, boxShadow: '0 2px 12px #e3e8ee' }}>
          {quote}
        </Paper>
        {/* Slide Card */}
        <Card sx={{ maxWidth: 700, width: '100%', borderRadius: 3, bgcolor: '#fff', color: '#222', mb: 2, mx: 'auto', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 3, gap: 4, boxShadow: '0 4px 24px #e3e8ee' }}>
          {/* Main Slide Content */}
          <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Box sx={{ bgcolor: '#f4f7fb', px: 3, py: 2, borderTopLeftRadius: 12, borderTopRightRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, boxShadow: '0 1px 4px #e3e8ee' }}>
                <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: 0.5, color: '#2a4d7a' }}>{slides[slide].title}</Typography>
                <Typography variant="body2" color="#b3c6e6">Slide {slide + 1} of {slides.length}</Typography>
              </Box>
              {slides[slide].content}
            </Box>
          </Box>
          {/* Visual/Animation */}
          <Box sx={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, justifyContent: 'flex-start' }}>
            <Box sx={{ position: 'relative', width: 220, height: 180, mb: 1, borderRadius: 2, overflow: 'hidden', boxShadow: audioPlaying ? '0 0 0 6px #1976d2' : '0 2px 12px #e3e8ee', transition: 'box-shadow 0.3s, background 0.3s', border: '1px solid #e3e8ee', background: '#f7fafd', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
              {/* Audio Animation on Top */}
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2, mb: 1, zIndex: 2, cursor: 'pointer' }} onClick={handleAudioClick}>
                <AudioBars playing={audioPlaying} />
              </Box>
              <CardMedia
                component="img"
                image={slides[slide].image}
                alt={slides[slide].title}
                sx={{ borderRadius: 2, maxHeight: 140, objectFit: 'contain', bgcolor: audioPlaying ? '#e3f2fd' : '#fff', mt: 1 }}
              />
              {/* Hidden audio element (no controls) */}
              <audio
                ref={audioRef}
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                preload="auto"
                onPlay={handleAudioPlay}
                onPause={handleAudioPause}
                style={{ display: 'none' }}
              />
              <Typography variant="caption" color="#b3c6e6" sx={{ mt: 1, display: 'block', textAlign: 'center', fontWeight: 500 }}>{slides[slide].imageCaption}</Typography>
            </Box>
          </Box>
        </Card>
        {/* Slide Navigation */}
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ width: '100%', maxWidth: 700, mb: 2, gap: 2 }}>
          <Button
            variant="outlined"
            disabled={slide === 0}
            onClick={() => setSlide((s) => Math.max(0, s - 1))}
            sx={{ color: '#1976d2', borderColor: '#b3c6e6', opacity: slide === 0 ? 0.5 : 1, borderRadius: 2, px: 3, fontWeight: 600, letterSpacing: 0.5, background: '#fff', '&:hover': { background: '#eaf1fb' } }}
          >
            &lt; Previous
          </Button>
          <Button
            variant="outlined"
            disabled={slide === slides.length - 1}
            onClick={() => setSlide((s) => Math.min(slides.length - 1, s + 1))}
            sx={{ color: '#1976d2', borderColor: '#b3c6e6', opacity: slide === slides.length - 1 ? 0.5 : 1, borderRadius: 2, px: 3, fontWeight: 600, letterSpacing: 0.5, background: '#fff', '&:hover': { background: '#eaf1fb' } }}
          >
            Next &gt;
          </Button>
        </Stack>
      </Box>
      {/* Right Sidebar: Chat Section (Q&A or Test) */}
      <Drawer
        anchor="right"
        open={showChat !== 'none'}
        onClose={() => setShowChat('none')}
        PaperProps={{ sx: { width: 370, bgcolor: '#fff', color: '#222', p: 3, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, boxShadow: '0 4px 24px #e3e8ee', border: '1px solid #e3e8ee' } }}
        variant="persistent"
      >
        <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
          {showChat === 'question' ? <QuestionAnswerIcon color="primary" /> : <QuizIcon color="secondary" />}
          <Typography variant="h6" fontWeight={700}>{showChat === 'question' ? 'Ask a Question' : 'Take Test'}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="text" onClick={() => setShowChat('none')} sx={{ fontWeight: 600, color: '#1976d2' }}>Close</Button>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ minHeight: 80, mb: 2 }}>
          {chatMessages.length === 0 ? (
            <Typography color="text.secondary">No messages yet. Start the conversation below.</Typography>
          ) : (
            chatMessages.map((msg, idx) => (
              <Box key={idx} sx={{ display: 'flex', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start', mb: 1 }}>
                <Paper sx={{ p: 1.5, bgcolor: msg.sender === 'user' ? '#e3f2fd' : '#f5f5f5', borderRadius: 2, minWidth: 80, maxWidth: 280, boxShadow: '0 2px 8px #e3e8ee' }}>
                  <Typography variant="body2" fontWeight={msg.sender === 'user' ? 600 : 400}>{msg.sender === 'user' ? 'You' : 'AI'}</Typography>
                  <Typography variant="body1">{msg.text}</Typography>
                </Paper>
              </Box>
            ))
          )}
        </Box>
        <Stack direction="row" alignItems="center" gap={1}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={showChat === 'question' ? 'Type your question...' : 'Type your answer...'}
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyPress={e => { if (e.key === 'Enter') handleSendChat(); }}
            sx={{ borderRadius: 2, bgcolor: '#f7fafd' }}
          />
          <IconButton color="primary" onClick={handleSendChat}><SendIcon /></IconButton>
        </Stack>
      </Drawer>
    </Box>
  );
};

export default Session2; 