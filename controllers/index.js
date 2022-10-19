const { gql } = require('apollo-server-express');
const { mergeSchemas, makeExecutableSchema } = require('@graphql-tools/schema');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const { requireTypes } = require('./../helpers/general');
const types = requireTypes();

const schemas = fs.readdirSync(__dirname).reduce((newArray = [], file) => {
	if (file.indexOf('.') !== 0 && file !== basename) {
		const { typeDefs, resolvers } = require(`./${file}`);
		newArray = [
			...newArray,
			makeExecutableSchema({
				typeDefs: gql`
					${typeDefs}
					${types}
				`,
				resolvers,
			}),
		];
	}
	return newArray;
}, []);

module.exports = mergeSchemas({ schemas });
