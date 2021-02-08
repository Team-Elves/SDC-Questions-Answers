const { response } = require('express');
const { createReadStream, createWriteStream, write } = require('fs');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { db, Question, Answer, Photo, Product } = require('./index.js');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);


// template IFFE .csv import - change filepath and model as needed

let uri = 'mongodb://localhost:27017/atelier';
let log = data => console.log(JSON.stringify(data, undefined, 2));

// (async function() {
//   try {
//     const connection = await mongoose.connect(uri);
//     // await Promise.all(Object.entries(connection.models).map(([k,m] => m.remove())));

//     // let headers = Object.keys(Question.schema.paths)
//     //   .filter(k => [])

//     await new Promise((resolve, reject) => {
//       let buffer = [];
//       let counter = 0;

//       let stream = createReadStream(path.join(__dirname, '../csv/products.csv'))
//         .pipe(csv())
//         .on('error', reject)
//         .on('data', async document => {
//           stream.pause();
//           buffer.push(document);
//           counter++;
//           log(document);
//           try {
//             if (counter > 1000) {
//               await Product.insertMany(buffer);
//               buffer = [];
//               counter = 0;
//             }
//           } catch {
//             stream.destroy(e);
//           }
//           stream.resume();
//         })
//         .on('end', async () => {
//           try {
//             if (counter > 0) {
//               await Product.insertMany(buffer);
//               buffer = [];
//               counter = 0;
//               resolve();
//             }
//           } catch {
//             stream.destroy(e);
//           }
//         })
//     })
//   } catch(err) {
//     console.error(err);
//   } finally {
//     process.exit();
//   }
// })()

