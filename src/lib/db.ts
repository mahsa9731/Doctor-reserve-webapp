import { MongoClient, Db } from 'mongodb';

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