/**
 * TODO:
 */

const fs = require('fs');

const readFile = () => {
  let data = fs.readFileSync('sentences.txt');
  let sentences = data.toString();

  debugger;
  return sentences;
};

const getWords = (text) => {
  let allSentences = text.split('\n');
  let flatSentence = allSentences.join(' ');
  let words = flatSentence.split(' ');
  words = words.map((word) => word.trim().toLowerCase());

  debugger;
  return words;
};

const countWords = (words) => {
  let map = {};
  words.forEach((word) => {
    if (word in map) {
      map[word] = 1;
    } else {
      map[word] += 1;
    }
  });

  debugger;
  return map;
};

module.exports = { readFile, getWords, countWords };
