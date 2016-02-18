var moment = require('moment');
var now = moment();

console.log(now.format());

// now.subtract(1, 'year')
//
// console.log(now.format());
// // 6:45P M
// console.log(now.format('MMM Do YYYY, h:mma'));

// Unix Timestamp seconds from january 1, 1970
console.log(now.format('X')); // unix
console.log(now.format('x')); // javascript
console.log(now.valueOf());

var timestamp = 1455827169514;

var timestampMoment = moment.utc(timestamp);

console.log(timestampMoment.local().format('h:mma')); // 11:06 AM
