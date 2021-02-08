const express = require('express');
const app = express()
const router = express.Router();
// const cacheControl = require('express-cache-controller');
const PORT = 3000;
const path = require('path');

const routes = require('./questions/routes/routes.js')
const cors = require('cors');
const compression = require('compression');
const { Questions } = require('./db/index.js');
const { getQuestionsById } = require('./questions/models/models.js');

app.use(router)

// apply middleware
app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// mongoose.connect("mongodb://localhost:27017/atelier", { useNewUrlParser: true, useUnifiedTopology: true })

// app.get('/', (req, res) => {
//   res.send('Hello from server!');
// });

// get all questions for specific product - requires product_id param
app.get('/questions/:product_id', async(req, res) => {
  let id = req.params.product_id;
  if (!id) {
    return res.sendStatus(400);
  }
  let page = parseInt(req.query.page) || 1;
  let count = parseInt(req.query.count) + 1 || 5;

  try {
    let product = await Questions.find({product_id: id}).select('questions').skip((page - 1) * count);
    let questions = product[0].questions;

    questions = questions.filter((question) => {
      return question.reported === 0;
    })

    return res.send(questions);
  } catch (error) {
    return res.status(500).send(error.message);
  }
})

// get all answers for specified question - requires product_id param and question_id query
app.get('/questions/:question_id/answers', async(req, res) => {
  let id = req.params.question_id;
  let targetId = parseInt(req.params.question_id);
  let page = parseInt(req.query.page) || 1;
  let count = parseInt(req.query.count) || 5;

  try {
    let product = await Questions.find({'questions.id': id}).select('questions');
    let answers = [];

    product[0].questions.forEach(question => {
      if (question.id === targetId) {
        answers = question.answers
      }
    })
    answers = answers.filter((answer) => {
      return answer.reported === 0;
    })

    return res.send(answers);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

app.post('/questions', async (req, res) => {
  let id = req.body.product_id;
  let text = req.body.body;
  let name = req.body.name;
  let email = req.body.email;

  let randomNumber = Math.floor(Math.random() * (10000000 - 33521635 + 1) + 33521635);
  let date = new Date();

  var questionData = {
    id: randomNumber,
    product_id: id,
    body: text,
    date_written: date,
    asker_name: name,
    asker_email: email,
    reported: 0,
    helpful: 0
  };


  try {
    await Questions.findOneAndUpdate(
      {product_id: id},
      {$push: {questions: questionData}}
    )

    return res.send('Question submitted.');
  } catch (error) {
    res.status(500).send(error.message);
  }
})

app.post('questions/:question_id/answers', async (req, res) => {
  let id = req.params.question_id;
  let text = req.body.body;
  let name = req.body.name;
  let email = req.body.email;
  let photos = req.body.photos;

  let randomNumber = Math.floor(Math.random() * (25000000 - 8814365 + 1) + 8814365);
  let date = new Date();

  var answerData = {
    id: randomNumber,
    question_id: id,
    body: text,
    date_written: date,
    asker_name: name,
    asker_email: email,
    reported: 0,
    helpful: 0
  };

  try {
    await Questions.findOneAndUpdate(
      {'questions.id': id},
      {$push: {answers: answerData}
    })
    res.send('Answer submitted.');
  } catch (error) {
    res.status(500).send(error.message);
  }
})

// listening
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});


