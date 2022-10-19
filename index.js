const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./controllers');
const jwt = require('jsonwebtoken');
const { graphqlUploadExpress } = require('graphql-upload-minimal');

async function startServer() {
	const server = new ApolloServer({
		schema,
		context: async ({ req }) => {
			const token = req.headers.authorization || '';
			try {
				const UserData = await jwt.verify(
					token.replace('Bearer ', ''),
					process.env.SECRET,
				);

				return {
					UserData,
				};
			} catch (e) {
				return e;
			}
		},
		csrfPrevention: true,
		cache: 'bounded',
	});

	await server.start();
	const app = express();
	app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
	server.applyMiddleware({ app });
	await new Promise((r) => app.listen({ port: 4000 }, r));
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startServer();
