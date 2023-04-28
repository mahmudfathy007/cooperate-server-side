const mongoose = require('mongoose');
const fs = require('fs');

// Connect to MongoDB using Mongoose
mongoose.connect(
  'mongodb+srv://MohamedHesham:rypdqPoSNDFVj2Hl@cluster0.sx0zxg0.mongodb.net/MlTest?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function createIDs() {
  // Define a schema for the Ids collection
  const idsSchema = new mongoose.Schema({
    image: Buffer,
    name: String,
  });

  // Create a model for the Ids collection
  const Ids = mongoose.model('Ids', idsSchema);

  // Read all files in the directory
  const directoryPath = 'C:/Users/MAHMOUD/Desktop/images';
  const files = fs.readdirSync(directoryPath);

  // Loop through all files and save them to the database
  for (const file of files) {
    // Check if the file already exists in the database
    const existingId = await Ids.findOne({ name: file });
    if (existingId) {
      console.log('Id already exists in database:', file);
      continue;
    }
    const imageData = fs.readFileSync(directoryPath + '/' + file);
    const newId = new Ids({
      image: imageData,
      name: file,
    });
    await newId.save();
    console.log('New Id saved to database:', file);
  }

  mongoose.connection.close();
}

createIDs();
