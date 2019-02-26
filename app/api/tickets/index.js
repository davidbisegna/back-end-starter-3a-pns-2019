const { Router } = require('express');
const { Ticket, Student } = require('../../models');

function attachStudent(ticket){
  var student = Student.getById(ticket.studentId)
  ticket.student = student
}

const router = new Router();
router.get('/', (req, res) => {
  var tickets = Ticket.get();
  for(let i=0; i<tickets.length; i++){
    attachStudent(tickets[i])
  }
  res.status(200).json(tickets)
});


router.post('/', (req, res) => {
  try {
    const ticket = Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/:ticketId', (req, res) => {
  try {
    var ticket = Ticket.getById(req.params.ticketId)
    attachStudent(ticket)
    res.status(200).json(ticket)
  } catch (err){
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.delete('/:ticketId', (req, res) => {
  try {
    var ticket = Ticket.getById(req.params.ticketId)
    attachStudent(ticket)
    res.status(200).json(Ticket.delete(req.params.ticketId))
  } catch (err){
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.put('/:ticketId', (req, res) => {
  try {
    Ticket.update(req.params.ticketId,req.body)
    var ticket = Ticket.getById(req.params.ticketId)
    attachStudent(ticket)
    res.status(200).json()
  } catch (err){
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
