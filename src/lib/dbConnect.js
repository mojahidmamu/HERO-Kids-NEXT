import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.URI);
const dbName = process.env.DB_NAME;

const collection = {
    PRODUCTS: 'products',
}

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}
export const dbConnect = (cName) =>  {
   return client.db(dbName).collection(cName);
}
