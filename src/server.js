
const express = require('express');
var request = require("request");
const fetch = require("node-fetch");
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

function getConstructedUrls (postIdList) {
  const promiseList = []
  const relatedPostsLimit = Math.min(postIdList.length, 3)
  for(let index=0; index<relatedPostsLimit; index++){
    const postDetails = postIdList[index].fields
    promiseList.push(fetch(`https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/${postDetails.post_id}`))
  }
  return promiseList
}

app.post("/related-posts/", async (req, res) => {
  const headers = {
    'Content-Type':'application/x-www-form-urlencoded'
  }

  const options = {
    url: 'https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/7941/related?pretty:true',
    method: 'POST',
    headers: headers
  }

  request(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const parsedResponse = JSON.parse(body)
        const posts = parsedResponse.hits
        console.log(posts)
        return Promise.all(getConstructedUrls(posts)).then(function (responses) {
          return Promise.all(responses.map(function (response) {
            return response.json();
          }));
        }).then(function (data) {
          return res.send({
            success: true,
            message: "Successfully fetched a list of post", 
            posts: data
          });
        }).catch(function (error) {
          console.log(error);
          return error
        });
      } else {
        console.log(error);
      }
   });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);