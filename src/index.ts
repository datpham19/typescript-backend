import "reflect-metadata";
import app from './app';
import config from "./config";

console.log('Starting Express server...');
console.log(`Environment: ${config.appPort}`);
app.listen(config.appPort, () => console.log(`Express is listening at http://localhost:${config.appPort}`));
