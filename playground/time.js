
var moment = require('moment');

var timeStamp = moment().valueOf();
console.log(timeStamp);
var createdAt = 1234;
var date =moment(createdAt);

console.log(date.format('MMM Do, YYYY '));
console.log(date.format('HH: MM A '));

module.exports = {timeStamp}