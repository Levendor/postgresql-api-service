import { PORT } from './common/config';
import { createApp } from './app';

const app = createApp();

app.listen(PORT, () =>
  process.stdout.write(`App is running on http://localhost:${PORT}\n`)
);
