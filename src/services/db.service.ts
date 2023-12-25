import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null };
}

class DbService {
  async connect() {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) throw new Error('MONGO_URI is not defined.');
    if (cached.conn) return cached.conn;
    cached.conn = await mongoose.connect(MONGO_URI);
    return cached.conn;
  }
}

export default new DbService();
