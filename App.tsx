import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Select, MenuItem, Card, CardContent, Grid, Divider } from '@mui/material';
import Sidebar from './components/Sidebar';
import DeleteIcon from '@mui/icons-material/Delete';

const App = () => {
  const [users] = useState([
    { id: '1', name: 'John Doe', skillsOffered: ['Python', 'Java'], skillsWanted: ['UI/UX'], banned: false },
    { id: '2', name: 'Jane Smith', skillsOffered: ['Photoshop', 'Spammy Skill'], skillsWanted: ['Marketing'], banned: false },
  ]);
  const [swaps] = useState([
    { id: 's1', requester: 'John Doe', recipient: 'Jane Smith', status: 'Pending', skillOffered: 'Python', skillWanted: 'UI/UX' },
    { id: 's2', requester: 'Jane Smith', recipient: 'John Doe', status: 'Accepted', skillOffered: 'Photoshop', skillWanted: 'Marketing' },
  ]);
  const [message, setMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [report] = useState({
    userActivity: 10,
    feedbackLogs: 5,
    swapStats: { Pending: 2, Accepted: 1, Rejected: 0 },
  });

  const handleSkillRejection = (userId: string, field: string, index: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      const updatedSkills = [...user[field]];
      updatedSkills.splice(index, 1);
      console.log(`Rejected ${field} for ${user.name}:`, updatedSkills);
    }
  };

  const handleBanUser = (userId: string) => {
    console.log(`Banned user with ID: ${userId}`);
  };

  const handleSendMessage = () => {
    console.log('Message sent:', message);
    setMessage('');
    alert('Message sent to all users!');
  };

  const filteredSwaps = selectedStatus === 'All' ? swaps : swaps.filter(s => s.status === selectedStatus);

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#0073b1', fontWeight: 'bold' }}>
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Manage Skills */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 1, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#0073b1' }}>Manage Skills</Typography>
                {users.map(user => (
                  <Box key={user.id} sx={{ mb: 2, p: 2, backgroundColor: 'white', borderRadius: 1 }}>
                    <Typography variant="subtitle1">{user.name}</Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">Skills Offered:</Typography>
                      {user.skillsOffered.map((skill, index) => (
                        <Box key={index} sx={{ display: 'inline-flex', alignItems: 'center', mr: 1, mb: 1 }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>{skill}</Typography>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleSkillRejection(user.id, 'skillsOffered', index)}
                            sx={{ minWidth: 'auto', padding: '2px 6px' }}
                          >
                            Reject
                          </Button>
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">Skills Wanted:</Typography>
                      {user.skillsWanted.map((skill, index) => (
                        <Box key={index} sx={{ display: 'inline-flex', alignItems: 'center', mr: 1, mb: 1 }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>{skill}</Typography>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleSkillRejection(user.id, 'skillsWanted', index)}
                            sx={{ minWidth: 'auto', padding: '2px 6px' }}
                          >
                            Reject
                          </Button>
                        </Box>
                      ))}
                    </Box>
                    {!user.banned && (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleBanUser(user.id)}
                        sx={{ mt: 1 }}
                      >
                        Ban User
                      </Button>
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Monitor Swaps */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 1, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#0073b1' }}>Monitor Swaps</Typography>
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as string)}
                  sx={{ mb: 2, minWidth: 120 }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Accepted">Accepted</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
                {filteredSwaps.map(swap => (
                  <Box key={swap.id} sx={{ mb: 2, p: 2, backgroundColor: 'white', borderRadius: 1 }}>
                    <Typography variant="body2">{swap.requester} -> {swap.recipient} ({swap.status})</Typography>
                    <Typography variant="caption">Offered: {swap.skillOffered}, Wanted: {swap.skillWanted}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Send Message */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 1, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#0073b1' }}>Send Platform Message</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2, backgroundColor: 'white' }}
                  placeholder="Enter message (e.g., feature updates, downtime alerts)"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendMessage}
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Reports */}
          <Grid item xs={12}>
            <Card sx={{ boxShadow: 1, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#0073b1' }}>Reports</Typography>
                <Typography variant="body2">User Activity: {report.userActivity}</Typography>
                <Typography variant="body2">Feedback Logs: {report.feedbackLogs}</Typography>
                <Typography variant="body2">Swap Stats: {JSON.stringify(report.swapStats)}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => alert('Download simulated (check console for data)')}
                >
                  Download Report
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default App;