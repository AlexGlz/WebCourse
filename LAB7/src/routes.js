const express = require("express");
const router = express.Router();
const users = require('./controllers/users')
const people = require('./controllers/people')

/////////////CREATE
///POST/persons
router.post('/persons',people.postPeople)
/////////////READ
///GET/persons
router.get('/persons',people.getPeople)
///GET/persons/:id
router.get('/persons/:id',people.getPerson)
/////////////UPDATE
///PATCH /persons/:id
router.patch('/persons/:id',people.updatePerson)
/////////////DELETE
///DELETE /person/:id
router.delete('/persons/:id',people.deletePerson)

module.exports = router