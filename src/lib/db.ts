import { MongoClient, Db } from 'mongodb';
import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI as string;
const DB_NAME = "doctorDB";

if (!URI) {
  throw new Error('لطفاً متغیر MONGODB_URI را در فایل .env.local تعریف کنید.');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

// ۱. برگشت به ساختار اصلی و قدیمی شما برای حل ارور OTP و هدر
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

// ۲. متد جدید و موازی برای مدل‌های Mongoose (مثل دکترا و نوبت‌دهی) بدون آسیب به کدهای قبلی
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