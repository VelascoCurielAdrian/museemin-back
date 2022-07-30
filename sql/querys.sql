--Perfiles 
INSERT INTO public."TipoPerfiles"(nombre) VALUES ('Museemin Web');
INSERT INTO public."TipoPerfiles"(nombre) VALUES ('Museemin APP');
--Usuarios
INSERT INTO public."Usuarios"(nombre, usuario, password, correo,"perfilID")
VALUES ('Adrian Velasco Curiel', 'admin', '321', 'adrian_velascocuriel@hotmail.com',1);
--Secciones
INSERT INTO public."Secciones"(descripcion, "usuarioRegistroID") VALUES ('Inventario', 1);
INSERT INTO public."Secciones"(descripcion, "usuarioRegistroID") VALUES ('Tablero', 1);
INSERT INTO public."Secciones"(descripcion, "usuarioRegistroID") VALUES ('Configuración', 1);
INSERT INTO public."Secciones"(descripcion, "usuarioRegistroID") VALUES ('Catálogos', 1);
--Modulos
INSERT INTO public."Modulos"(descripcion, "usuarioRegistroID", "seccionID") VALUES ('Trabajadores', 1, 4);
INSERT INTO public."Modulos"(descripcion, "usuarioRegistroID", "seccionID") VALUES ('Clientes', 1, 4);
INSERT INTO public."Modulos"(descripcion, "usuarioRegistroID", "seccionID") VALUES ('Proveedores', 1, 4);
INSERT INTO public."Modulos"(descripcion, "usuarioRegistroID", "seccionID") VALUES ('Tareas', 1, 4);
--Perfil Modulos
INSERT INTO public."PerfilModulos"("perfilID", "moduloID", "usuarioRegistroID") VALUES (1,1,1);
INSERT INTO public."PerfilModulos"("perfilID", "moduloID", "usuarioRegistroID") VALUES (1,2,1);
INSERT INTO public."PerfilModulos"("perfilID", "moduloID", "usuarioRegistroID") VALUES (1,3,1);
INSERT INTO public."PerfilModulos"("perfilID", "moduloID", "usuarioRegistroID") VALUES (1,4,1);

