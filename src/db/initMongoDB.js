import mongoose from 'mongoose';
import getEnvVar from '../utils/getEnvVar.js';

export default async function initMongoDB() {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    const connectionString = `mongodb+srv://${user}:${pwd}@${url}/${db}?appName=Cluster0`;

    await mongoose.connect(connectionString);

    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
}
