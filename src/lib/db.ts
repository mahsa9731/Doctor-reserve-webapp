import { MongoClient, Db } from 'mongodb';
import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI as string;
const DB_NAME = "doctorDB";

if (!URI) {
  throw new Error('لطفاً متغیر MONGODB_URI را در فایل .env.local تعریف کنید.');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;


export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(URI);
  await client.connect();
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}


let mongooseCached = (global as any).mongoose;
if (!mongooseCached) {
  mongooseCached = (global as any).mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  if (mongooseCached.conn) return mongooseCached.conn;

  if (!mongooseCached.promise) {
    mongooseCached.promise = mongoose.connect(URI, { bufferCommands: false }).then((m) => m);
  }
  mongooseCached.conn = await mongooseCached.promise;
  return mongooseCached.conn;
}