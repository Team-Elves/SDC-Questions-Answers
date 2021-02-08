const express = require('express');
const router = express.Router();
const { Questions } = require('../../mongoDB/db/index.js')

router.get('/questions/:product_id', async(req, res) => {
  // let page = db.Questions.find({req.params.id})
  let id = req.params.product_id;
  if (!id) {
    return res.sendStatus(400);
  }
  let count;
  try {
    let questions = await Questions.find({product_id: id});
    questions.forEach(question => delete question._id);
    return res.send(questions);
  } catch (error) {
    // return idtest();
    return res.status(500).send(id);
  }
})

module.exports = { router };