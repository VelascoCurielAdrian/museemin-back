module.exports = `
  type Usuario {
    id: ID!
    nombre: String!
    usuario: String!
    password: String!
    correo: String,
    perfilID: ID!
  }

  type Response {
    status: String!
  }

  type Token {
    token: String!
  }

  input UsuarioDatos {
    nombre: String!
    usuario: String!
    password: String!
    correo: String,
    perfilID: ID!
  }
  
  input UsuarioAuth {
    usuario: String!
    password: String!
  }
`;
