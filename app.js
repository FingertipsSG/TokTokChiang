const express = require('express');
const app = express(); 
const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route api called api
app.get('/api', (req, res) => {
  const data = [
    {'id': 1, 'message': 'First message'},
    {'id': 2, 'message': 'Second message'},
    {'id': 3, 'message': 'Third message'}
  ]
  res.json(data);
});

// create a hello world api
let helloWorld = '<h1>Hello world!</h1>';
app.get('/', (req, res) => {
  res.send(helloWorld); 
}); 