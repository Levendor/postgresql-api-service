const { PORT } = require('./common/config');
const { createApp } = require('./app');

const app = createApp();

app.listen(PORT, () =>
  process.stdout.write(`App is running on http://localhost:${PORT}\n`)
);
