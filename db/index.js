const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/atelier", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
  db.on('error', function() {
    console.error('Could not connect to database');
  })
  db.on('open', function() {
    console.log('MongoDB connected');
  })

const questionsSchema = new Schema({
  product_id: Number,
  questions: [ new Schema({
    id: Number,
    product_id: Number,
    body: String,
    date_written: Date,
    asker_name: String,
    asker_email: String,
    reported: Number,
    helpful: Number,
    answers: [ new Schema({
      id: Number,
      question_id: Number,
      body: String,
      date_written: Date,
      answerer_name: String,
      answerer_email: String,
      reported: Number,
      helpful: Number,
      photos: [ new Schema({
        id: Number,
        answer_id: Number,
        url: String
      })]
    })]
  })]
})

const questionSchemaBasic = new Schema(
  {
    id: Number,
    product_id: Number,
    body: String,
    date_written: Date,
    asker_name: String,
    asker_email: String,
    reported: Number,
    helpful: Number
  }
);
// id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful
// const answerSchema = new Schema({
//   id: Number,
//   question_id: Number,
//   body: String,
//   date_written: Date,
//   answerer_name: String,
//   answerer_email: String,
//   reported: Number,
//   helpful: Number
// });

// const photoSchema = new Schema({
//   id: Number,
//   answer_id: Number,
//   url: String
// });

// const questionSchema = new Schema(
//   {
//     id: Number,
//     product_id: Number,
//     body: String,
//     date_written: Date,
//     asker_name: String,
//     asker_email: String,
//     reported: Number,
//     helpful: Number,
//     answers: [new Schema({
//       id: Number,
//       question_id: Number,
//       body: String,
//       date_written: Date,
//       answerer_name: String,
//       answerer_email: String,
//       reported: Number,
//       helpful: Number,
//       photos: [new Schema({
//         id: Number,
//         answer_id: Number,
//         url: String
//       })]
//     })]
//   }
// );

// let productSchema = new Schema({
//   product_id: Number
// })

let Questions = db.model('Question', questionsSchema, 'questions');
// let Question = mongoose.model('Question', questionSchema, 'questions');
// let Answer = mongoose.model('Answer', answerSchema, 'answers');
// let Photo = mongoose.model('Photo', photoSchema, 'photos');
// let Product = mongoose.model('Product', productSchema, 'products');

module.exports = {
  Questions
};