module.exports = `
  type Query{
    getUsuarioAuth: Usuario!
    getModulos: Modulos!
  }
  
  type Mutation {
    crearUsuario(input: UsuarioDatos!): Response!
    authenticarUsuario(input: UsuarioAuth!): Token!
  }
`;
