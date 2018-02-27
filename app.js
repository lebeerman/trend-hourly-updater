// TODO: INSTALL PRE-REQS: `npm install express cors body-parser morgan monk`

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = (module.exports = express());
const server = http.createServer(app);
const port = parseInt(process.env.PORT || 3000);
const devMode = process.env.NODE_ENV !== 'production';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan(devMode ? 'dev' : 'combined'));
app.use(cors({ origin: true }));

// TODO: ADD (MOUNT) YOUR MIDDLEWARE (ROUTES) HERE
// ^^^ Example: app.use('/v1/kitten', require('./routes/kitten'))
// ^^^ Example: app.use('/cats', require('./routes/kitten'))

app.use(notFound);
app.use(errorHandler);

server
  .listen(port)
  .on('error', console.error.bind(console))
  .on('listening', console.log.bind(console, 'Listening on ' + port));

// hourly trend routes + queries

app.get('/', (request, response) => {
  queries
    .list('hourlytrends')
    .then(trends =>
      queries.list('woeid').then(woeid =>
        response.json({
        })
      )
    )
    .catch(error => console.log(error));
});

app.get('/tweets', (request, response, next) => {
  let params = { id: 23424977 };
  client.get('trends/place', params, (error, tweets, twitterResponse) => {
    if (error) {
      next(error);
    } else {
      console.log(tweets);
      response.send({ tweets });
    }
  });
});

app.get('/tweets/:id', (request, response, next) => {
  var id = { id: request.params.id };
  client.get('trends/place', id, (error, tweets, twitterResponse) => {
    if (error && error.code === 34) {
      res.status(200).send({ tweets: { trends: [] }, error: error.message });
    } else if (error && error.code === 36) {
      res.status(200).send({ tweets: { trends: [] } });
    } else if (error) {
      next(error);
    } else {
      console.log(tweets);
      response.send({ tweets });
    }
  });
});

app.get('/personalLocations', (request, response) => {
  queries
    .list('personalLocations')
    .then(personalLocations => {
      response.json({ personalLocations });
    })
    .catch(error => console.log(error));
});

app.get('/personalLocations/:id', (request, response) => {
  queries
    .read(request.params.id, 'personalLocations')
    .then(personalLocations => {
      personalLocations ? response.json({ personalLocations }) : response.sendStatus(404);
    })
    .catch(console.error);
});

app.get('/woeid', (request, response) => {
  queries
    .list('woeid')
    .then(woeid => {
      response.json({ woeid });
    })
    .catch(error => console.log(error));
});

app.get('/woeid/:id', (request, response) => {
  queries
    .read(request.params.id, 'woeid')
    .then(woeid => {
      woeid ? response.json({ woeid }) : response.sendStatus(404);
    })
    .catch(console.error);
});

app.post('/personalLocations', (request, response) => {
  queries
    .createLocations(request.body)
    .then(personalLocations => {
      response.status(201).json({ personalLocations: personalLocations });
    })
    .catch(console.error);
});

app.delete('/personalLocations/:id', (request, response) => {
  queries
    .deleteLocations(request.params.id)
    .then(() => {
      response.sendStatus(204);
    })
    .catch(console.error);
});

app.put('/personalLocations/:id', (request, response) => {
  queries
    .updateLocations(request.params.id, request.body)
    .then(personalLocations => {
      response.json({ personalLocations: personalLocations[0] });
    })
    .catch(console.error);
});



function notFound(req, res, next) {
  const url = req.originalUrl;
  if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
    // Don't log less important auto requests
    console.error('[404: Requested file not found] ', url);
  }
  res.status(404).send({ error: 'Url not found', status: 404, url });
}

function errorHandler(err, req, res, next) {
  console.error('ERROR', err);
  const stack = devMode ? err.stack : undefined;
  res.status(500).send({ error: err.message, stack, url: req.originalUrl });
}
