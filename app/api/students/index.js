const { Router } = require('express');
const { Student } = require('../../models');

const router = new Router();
router.get('/', (req, res) => res.status(200).json(Student.get()));
router.post('/', (req, res) => {
  try {
    const student = Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/:studentId', (req, res) => {
  try {
    res.status(200).json(Student.getById(req.params.studentId))
  } catch (err){
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.delete('/:studentId', (req, res) => {
  try {
    res.status(200).json(Student.delete(req.params.studentId))
  } catch (err){
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.put('/:studentId', (req, res) => {
  try {
    res.status(200).json(Student.update(req.params.studentId,req.body))
  } catch (err){
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
