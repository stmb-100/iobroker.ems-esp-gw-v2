const request = require('request');

request('http://192.168.0.72/api?device=system&cmd=info', { json: true }, (error, response, body) => {
  if (error) { return console.log(error); }
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  //console.log(response.url);
  //console.log(body.explanation);
  //console.log(body);
  //console.log(body);
  console.log('typeof : ' + typeof body);
  //console.log(body[0].[0]);
  //console.log(body[1]);
});

request('http://192.168.0.72/api?device=system&cmd=settings', { json: true }, (error, response, body) => {
  if (error) { return console.log(error); }
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  //console.log(body.url);
  //console.log(body.explanation);
  //console.log(body);
  //console.log(body);
  console.log(typeof body);
  console.log(body[0]);
  console.log(body[1]);
});

request('http://192.168.0.72/api?device=dallassensor&cmd=info', { json: true }, (error, response, body) => {
  if (error) { return console.log(error); }
  
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.

  //console.log(body.url);
  //console.log(body.explanation);
  //console.log(body);
  //console.log(body);
  console.log(typeof body);
  console.log(body.sensor1.id);
  console.log(body.sensor1.temp);
});

request('http://192.168.0.72/api?device=solar&cmd=info', { json: true }, (error, response, body) => {
  if (error) { return console.log(error); }
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  //console.log(body.url);
  //console.log(body.explanation);
  //console.log(body);
  //console.log(body);
  console.log(typeof body);
  console.log(body[0]);
  console.log(body[1]);
});

request('http://192.168.0.72/api?device=thermostat&cmd=info', { json: true }, (error, response, body) => {
  if (error) { return console.log(error); }
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  //console.log(body.url);
  //console.log(body.explanation);
  //console.log(body);
  //console.log(body);
  console.log(typeof body);
  console.log(body['date/time']);
  //console.log(body[1]);
  let A;
  for (A in body)
  {
    console.log(A +" : " + body[A]);
    //console.log(body[A]);
  }

});
