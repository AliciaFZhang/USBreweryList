require('dotenv').config();
const express = require("express");
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');

app.use(express.json());

const URL = process.env.BreweryURL;
//Getting the breweries in a city
app.get('/city/:city', (req, res) => {
  let city = req.params.city;
  axios.get(`${URL}?by_city=${city}`)
  .then(citylist => res.status(200).send(citylist.data))
  .catch(err => res.status(500).send(err));
});

//Getting the nearest breweries
app.get('/dist', (req, res) => {
  const {lat, lng} = req.query;
  axios.get(`${URL}?by_dist=${lat},${lng}`)
  .then(list => res.status(200).send(list.data))
  .catch(err => res.status(500).send(err));
});

//Getting a list of breweries
// app.get('/list', (req, res) => {
//   let city = req.params.city;
//   axios.get(`${URL}`)
//   .then(list => res.status(200).send(list.data))
//   .catch(err => res.status(500).send(err));
// });

//Getting detail info of a specific brewery
// app.get('/detail/:id', (req, res) => {
//   let id = req.params.id;
//   axios.get(`${URL}/${id}`)
//   .then(list => res.status(200).send(list.data))
//   .catch(err => res.status(500).send(err));
// })

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}...`);
})