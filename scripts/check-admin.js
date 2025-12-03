// Check what's in the database
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

async function checkAdmin() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    console.log('📍 URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    console.log('📊 Database:', mongoose.connection.db.databaseName);

    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📁 Collections in database:');
    collections.forEach(col => console.log('  -', col.name));

    // Check admins collection
    const adminsCollection = mongoose.connection.db.collection('admins');
    const adminCount = await adminsCollection.countDocuments();
    console.log('\n👥 Total admins in "admins" collection:', adminCount);

    if (adminCount > 0) {
      const admins = await adminsCollection.find({}).toArray();
      console.log('\n📋 Admin documents:');
      admins.forEach(admin => {
        console.log('  ID:', admin._id);
        console.log('  Email:', admin.email);
        console.log('  Password:', admin.password);
        console.log('  ---');
      });
    }

    // Try to find the specific admin
    const specificAdmin = await adminsCollection.findOne({ email: 'ecocartadmin@gmail.com' });
    console.log('\n🔍 Looking for ecocartadmin@gmail.com:', specificAdmin ? 'FOUND' : 'NOT FOUND');
    if (specificAdmin) {
      console.log('Full document:', JSON.stringify(specificAdmin, null, 2));
    }

    await mongoose.connection.close();
    console.log('\n✅ Done');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkAdmin();
