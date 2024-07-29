const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/dashBoardDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Access MongoDB collection
const db = mongoose.connection;
const collection = db.collection('visualData');

// Define route to fetch data
app.get('/api/data', async (req, res) => {
  try {
    const data = await collection.find().toArray();
    res.send(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/data', async (req, res) => {
  try {
    let dataItem = req.body
    // Insert the data into MongoDB
    const result = await collection.insertOne(dataItem);

    // Send the result back to the client
    res.status(201).json(result);
  } catch (error) {
    console.error('Error inserting data:', error.message);
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/data/:id', async (req, res) => {
  const id = req.params.id;
  console.log(`Received request to delete id: ${id}`);
  
  try {
    const result = await collection.deleteOne({ _id: id });
    
    if (result.deletedCount) {
      res.status(200).json({ message: 'Data deleted successfully' });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    console.error('Error deleting data:', error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/data/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updatedRecord = await collection.updateOne(
      { _id: id},
      { $set: updateData } 
    );

    if (updatedRecord.matchedCount === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.send(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
