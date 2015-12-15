import * as requests from 'superagent';

export default function fetch(url, options={}) {
  let method = requests.get;
  let query = options.query || {};

  if (options.method && options.method.toLowerCase() === 'post') {
    method = requests.post;
  }

  return new Promise((resolve, reject) => {
    method(url)
      .query(query)
      .end((err, res) => {
        // If there is an error or the res is not ok, return the error (reject it)
        if(err) {
          var message = `Fetching ${url} returned a status ${err.status}. Detail: ${JSON.stringify(err)}`
          reject(Error(message));
        }
        else if (!res.ok) {
          var message = `Fetching ${url} returned a status ${res.status}. Detail: ${JSON.stringify(res.body)}`
          reject(Error(message));
        }
        else {
          // If res.body is empty, try to parse the res.text
          if (!Object.keys(res.body).length) {
            try {
              res.body = JSON.parse(res.text);
            }
            catch (err) {
              // If a SyntaxError is thrown, this string cannot become an object.
              // Return it as is
              if (err instanceof SyntaxError) {
                res.body = res.text;
              }
            }
          }
          // Return the res.body
          resolve(res.body);
        }
      });
  });
}