// databaseController.js

// Sample data (instead of fetching from a database)
const sampleData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com'
    }
  ];
  
  // GET all records
  const getAllRecords = (req, res) => {
    res.json(sampleData);
  };
  
  module.exports = {
    getAllRecords
  };