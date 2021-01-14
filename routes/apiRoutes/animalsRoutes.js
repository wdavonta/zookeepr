const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('/../../data/animals');



// in our URL --> https://localhost/3001/api/animals
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

  // in our URL --> https://localhost/3001/api/animals/15
  router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals); // --> findById(5, animals)
    // Data validation 
    if (result) {
      res.json(result);
    } else {
      // response with an ERROR CODE 
        res.send(404);
    }
  });

  router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
  
    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
      res.status(400).send('The animal is not properly formatted.');
    } else {
      const animal = createNewAnimal(req.body, animals);
      res.json(animal);
    }
  });

  module.exports  = router;