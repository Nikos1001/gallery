
const axios = require('axios');

var fs = require('fs'),
request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const endpoint = 'https://api.pushshift.io/reddit/search/submission/?subreddit=art&sort=desc&sort_type=score&size=1000&after=1d';

axios.get(endpoint).then(data => {
    const paintings = data['data']['data'];
    // console.log(paintings);
    for(let i = 0; i < paintings.length; i++) {
        download(paintings[i].url, `paintings/${i}.png`, ()=>{});
    }
});