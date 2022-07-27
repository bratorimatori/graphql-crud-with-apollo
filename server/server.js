const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const resolvers = require('./reslovers');

const port = 3000;
const jwtSecret = Buffer.from('xkMBdsE+P6242Z2dPV3RD91BPbLIko7t', 'base64');
(async () => {
  const typeDefs = gql(
    fs.readFileSync('./schema.graphql', { encoding: 'utf8' })
  );

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.use(
    cors(),
    express.json(),
    expressJwt({
      credentialsRequired: false,
      secret: jwtSecret,
      algorithms: ['HS256'],
    })
  );

  app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const user = db.users.get(name);
    if (!(user && user.password === password)) {
      res.sendStatus(401);
      return;
    }
    const token = jwt.sign({ sub: user.id }, jwtSecret);
    res.send({ token });
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
