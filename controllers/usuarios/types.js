module.exports = `
  type Usuario {
    id: ID!
    nombre: String!
    usuario: String!
    correo: String,
    perfilID: ID!
    perfil: tipoPerfil
  }

  type tipoPerfil {
    id: ID!
    nombre: String!
    activo: Boolean!
    estatus: Boolean!
  }

  type Secciones {
    id: ID!
    descripcion: String!
    usuarioRegistroID: ID!
  }

  type Modulos {
    id: ID!
    descripcion: String!
    moduloWeb: Boolean!
    usuarioRegistroID: ID!
    seccionID: ID!
  }

  type Response {
    status: String!
  }

  type Token {
    mensaje: String!
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
