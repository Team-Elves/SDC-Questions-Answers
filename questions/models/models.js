const { Questions } = require('../../mongoDB/db/index.js')

async function getQuestionsById(id, callback) {
  try {
    var query = Questions.where({product_id: id});
    await query.findOne(function (err, questions) {
      if (err) {
        callback(err)
      } else {
        callback(null, questions)
      }
    })
  } catch (err) {
    console.error('Could not retrieve questions: ', err);
  }
}


module.exports = { getQuestionsById };