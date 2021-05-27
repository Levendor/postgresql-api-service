import { PORT } from './common/config.js';
import { createApp } from './app.js';

const app = createApp();

app.listen(PORT, () =>
  process.stdout.write(`App is running on http://localhost:${PORT}\n`)
);
