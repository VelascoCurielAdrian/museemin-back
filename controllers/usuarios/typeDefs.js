module.exports = `
  type Query{
    getUsuarioAuth: Usuario!
  }
  
  type Mutation {
    crearUsuario(input: UsuarioDatos!): Response!
    authenticarUsuario(input: UsuarioAuth!): Token!
  }
`;