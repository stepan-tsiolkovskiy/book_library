import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: process.env.DEVELOP_STAGING }));

app.use('/api', (req, res) => {
  res.send('Welcome to the API!');
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
