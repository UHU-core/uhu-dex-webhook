const express = require('express');
const axios   = require('axios');
require('dotenv').config();

const app  = express();
const port = process.env.PORT || 3000;

const headers = {
  Authorization : `Bearer ${process.env.RAILWAY_TOKEN}`,
  'Content-Type': 'application/json'
};

const pause  = async () =>
  axios.post(
    `https://backboard.railway.app/project/${process.env.PROJECT_ID}/service/${process.env.SERVICE_ID}/pause`,
    {}, { headers });

const resume = async () =>
  axios.post(
    `https://backboard.railway.app/project/${process.env.PROJECT_ID}/service/${process.env.SERVICE_ID}/resume`,
    {}, { headers });

app.get('/pause',  async (_, res) => { await pause();  res.send('⏸️ paused');  });
app.get('/resume', async (_, res) => { await resume(); res.send('▶️ resumed'); });
app.get('/status', (_, res) =>      { res.send('✅ webhook alive');        });

app.listen(port, () => console.log(`🚀 running on ${port}`));

