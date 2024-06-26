const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// mongoose.connect('mongodb+srv://as763649:@nand763649@cluster0.cwmgpb5.mongodb.net/dummytodoData?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  
mongoose.connect('mongodb://127.0.0.1:27017/dummytodoData', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection error:', err.message));

const schemaOb = new mongoose.Schema({
  title: String,
  notes: String,
  id: String
});

const ModelCl = mongoose.model('todoInfo', schemaOb);

app.use(express.json());
app.use(cors({
  origin:["https://deploy-mern-1whq.vercel.app"],
          methods:["POST","GET","DELETE"],
          credentials:true
}));

app.post('/connectexpress', async (req, res) => {
  const { title, notes, id } = req.body;
  
  const modelObj = new ModelCl({ title, notes, id });

  try {
    const doc = await modelObj.save();
    res.json(doc);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving document', error: error.message });
  }
});

app.get('/connectexpress', async (req, res) => {
  try {
    const dataFetching = await ModelCl.find({});
    res.json(dataFetching);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching documents', error: error.message });
  }
});

app.delete('/connectexpress', async (req, res) => {
  console.log('Request body:', req.body);
  const { id } = req.body;

  try {
    console.log('ID to delete:', id);

    const deletedDocument = await ModelCl.findOneAndDelete({ id });

    if (deletedDocument) {
      res.json({ success: true, message: 'Document deleted successfully', data: deletedDocument });
    } else {
      res.status(404).json({ success: false, message: 'Document not found' });
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ success: false, message: 'Error deleting document', error: error.message });
  }
});


app.listen(8000, () => { console.log('Server running on port 8000') });
