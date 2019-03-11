const { Router } = require('express');
const { Ticket, Student } = require('../../models');

function attachStudents(ticket) {
  const newTicket = ticket;
  const students = Student.getAllStudentsById(ticket.studentId);
  const student = Student.getById(ticket.studentId[0]);
  newTicket.students = students;
  newTicket.student = student;
  return newTicket;
}

const router = new Router();
router.get('/', (req, res) => {
  const tickets = Ticket.get();
  for (let i = 0; i < tickets.length; i += 1) {
    tickets[i] = attachStudents(tickets[i]);
  }
  res.status(200).json(tickets);
});

router.get('/:ticketId', (req, res) => {
  try {
    let ticket = Ticket.getById(req.params.ticketId);
    ticket = attachStudents(ticket);
    res.status(200).json(ticket);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/getStudentsTickets/:studentId', (req, res) => {
  try {
    const tickets = Ticket.getTicketsByStudentId(req.params.studentId);
    res.status(200).json(tickets);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
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


router.delete('/:ticketId', (req, res) => {
  try {
    res.status(200).json(Ticket.delete(req.params.ticketId));
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.put('/:ticketId', (req, res) => {
  try {
    Ticket.update(req.params.ticketId, req.body);
    let ticket = Ticket.getById(req.params.ticketId);
    ticket = attachStudents(ticket);
    res.status(200).json(ticket);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
