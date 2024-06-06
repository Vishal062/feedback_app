import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if(connection.isConnected) {  //Checking DB is already connected or not || choking
    console.log("Already connected to DB");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {})
    connection.isConnected = db.connections[0].readyState;  //
    
    console.log('DB is connected');
    return 
  } catch (error) {
    console.log('Db connection is failed', error)
    process.exit(1);
  }
};

export default dbConnect;