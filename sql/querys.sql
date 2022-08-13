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
--Tabajadores
INSERT INTO "Trabajadores" ("id","nombres","primerApellido","segundoApellido","telefono","correo","colonia","calles","referencia","numeroExterior","usuarioRegistroID") 
VALUES (DEFAULT,'Pedro','Velasco','Curiel','6672466130','adrian@gmail.com','Alturas del sur','elefante','Departamento','322',1);
--Clasificaiciones
INSERT INTO "Clasificaciones" ("id","descripcion","usuarioRegistroID") 
VALUES (DEFAULT,'Herreria',1);
INSERT INTO "Clasificaciones" ("id","descripcion","usuarioRegistroID") 
VALUES (DEFAULT,'Plomeria',1);
INSERT INTO "Clasificaciones" ("id","descripcion","usuarioRegistroID") 
VALUES (DEFAULT,'Hidraulicos',1);
-- Herramientas
INSERT INTO "Herramientas" ("id","nombre","descripcion","precio","marca","estado","usuarioRegistroID","clasificacionID") 
VALUES (DEFAULT,'Maquina de soldar','Okland',2000,'okland','nuevo',1,1);
INSERT INTO "Herramientas" ("id","nombre","descripcion","precio","marca","estado","usuarioRegistroID","clasificacionID") 
VALUES (DEFAULT,'Maquina de corte','Okland',4000,'dewalt','nuevo',1,1);
INSERT INTO "Herramientas" ("id","nombre","descripcion","precio","marca","estado","usuarioRegistroID","clasificacionID") 
VALUES (DEFAULT,'Pulidora','Okland',3000,'Makita','nuevo',1,1);





