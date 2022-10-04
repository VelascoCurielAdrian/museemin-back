-- Table: public.TipoPerfiles
DROP TABLE IF EXISTS public."TipoPerfiles";
CREATE TABLE IF NOT EXISTS public."TipoPerfiles" (
    id integer NOT NULL DEFAULT nextval('"TipoPerfiles_id_seq"' :: regclass),
    nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "fechaRegistro" timestamp with time zone,
    "fechaModificacion" timestamp with time zone,
    CONSTRAINT "TipoPerfiles_pkey" PRIMARY KEY (id)
) TABLESPACE pg_default;

ALTER TABLE
    IF EXISTS public."TipoPerfiles" OWNER to postgres;

-- Table: public.Usuarios
-- DROP TABLE IF EXISTS public."Usuarios";
CREATE TABLE IF NOT EXISTS public."Usuarios" (
    id integer NOT NULL DEFAULT nextval('"Usuarios_id_seq"' :: regclass),
    nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
    usuario character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    correo character varying(50) COLLATE pg_catalog."default" NOT NULL,
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "perfilID" integer NOT NULL,
    CONSTRAINT "Usuarios_pkey" PRIMARY KEY (id),
    CONSTRAINT "Usuarios_perfilID_fkey" FOREIGN KEY ("perfilID") REFERENCES public."TipoPerfiles" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;

ALTER TABLE
    IF EXISTS public."Usuarios" OWNER to postgres;

-- Table: public.Secciones
-- DROP TABLE IF EXISTS public."Secciones";
CREATE TABLE IF NOT EXISTS public."Secciones" (
    id integer NOT NULL DEFAULT nextval('"Secciones_id_seq"' :: regclass),
    descripcion character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "moduloWeb" boolean NOT NULL DEFAULT true,
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "usuarioRegistroID" integer NOT NULL,
    "fechaRegistro" timestamp with time zone,
    "usuarioModificacionID" integer,
    "fechaModificacion" timestamp with time zone,
    CONSTRAINT "Secciones_pkey" PRIMARY KEY (id),
    CONSTRAINT "Secciones_usuarioModificacionID_fkey" FOREIGN KEY ("usuarioModificacionID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "Secciones_usuarioRegistroID_fkey" FOREIGN KEY ("usuarioRegistroID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;

ALTER TABLE
    IF EXISTS public."Secciones" OWNER to postgres;

-- Table: public.Modulos
-- DROP TABLE IF EXISTS public."Modulos";
CREATE TABLE IF NOT EXISTS public."Modulos" (
    id integer NOT NULL DEFAULT nextval('"Modulos_id_seq"' :: regclass),
    descripcion character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "moduloWeb" boolean NOT NULL DEFAULT true,
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "usuarioRegistroID" integer NOT NULL,
    "fechaRegistro" timestamp with time zone,
    "usuarioModificacionID" integer,
    "fechaModificacion" timestamp with time zone,
    "seccionID" integer NOT NULL,
    CONSTRAINT "Modulos_pkey" PRIMARY KEY (id),
    CONSTRAINT "Modulos_seccionID_fkey" FOREIGN KEY ("seccionID") REFERENCES public."Secciones" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "Modulos_usuarioModificacionID_fkey" FOREIGN KEY ("usuarioModificacionID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "Modulos_usuarioRegistroID_fkey" FOREIGN KEY ("usuarioRegistroID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;

ALTER TABLE
    IF EXISTS public."Modulos" OWNER to postgres;

-- Table: public.PerfilModulos
-- DROP TABLE IF EXISTS public."PerfilModulos";
CREATE TABLE IF NOT EXISTS public."PerfilModulos" (
    id integer NOT NULL DEFAULT nextval('"PerfilModulos_id_seq"' :: regclass),
    "perfilID" integer NOT NULL,
    "moduloID" integer NOT NULL,
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "usuarioRegistroID" integer NOT NULL,
    "createdAt" timestamp with time zone,
    "usuarioModificacionID" integer,
    "updatedAt" timestamp with time zone,
    CONSTRAINT "PerfilModulos_pkey" PRIMARY KEY (id, "moduloID"),
    CONSTRAINT "PerfilModulos_moduloID_fkey" FOREIGN KEY ("moduloID") REFERENCES public."Modulos" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "PerfilModulos_perfilID_fkey" FOREIGN KEY ("perfilID") REFERENCES public."TipoPerfiles" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "PerfilModulos_usuarioModificacionID_fkey" FOREIGN KEY ("usuarioModificacionID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "PerfilModulos_usuarioRegistroID_fkey" FOREIGN KEY ("usuarioRegistroID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;

ALTER TABLE
    IF EXISTS public."PerfilModulos" OWNER to postgres;

-- Table: public.Trabajadores
-- DROP TABLE IF EXISTS public."Trabajadores";
CREATE TABLE IF NOT EXISTS public."Trabajadores" (
    id integer NOT NULL DEFAULT nextval('"Trabajadores_id_seq"' :: regclass),
    nombres character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "primerApellido" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "segundoApellido" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    telefono character varying(10) COLLATE pg_catalog."default" NOT NULL,
    correo character varying(50) COLLATE pg_catalog."default" NOT NULL,
    colonia character varying(50) COLLATE pg_catalog."default" NOT NULL,
    calles character varying(200) COLLATE pg_catalog."default" NOT NULL,
    referencia character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "numeroExterior" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "usuarioRegistroID" integer NOT NULL,
    "createdAt" timestamp with time zone,
    "usuarioModificacionID" integer,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    CONSTRAINT "Trabajadores_pkey" PRIMARY KEY (id),
    CONSTRAINT "Trabajadores_usuarioModificacionID_fkey" FOREIGN KEY ("usuarioModificacionID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "Trabajadores_usuarioRegistroID_fkey" FOREIGN KEY ("usuarioRegistroID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;

ALTER TABLE
    IF EXISTS public."Trabajadores" OWNER to postgres;

-- Table: public.Clasificaciones
-- DROP TABLE IF EXISTS public."Clasificaciones";
CREATE TABLE IF NOT EXISTS public."Clasificaciones" (
    id integer NOT NULL DEFAULT nextval('"Clasificaciones_id_seq"' :: regclass),
    descripcion character varying(255) COLLATE pg_catalog."default",
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "usuarioRegistroID" integer NOT NULL,
    "createdAt" timestamp with time zone,
    "usuarioModificacionID" integer,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    CONSTRAINT "Clasificaciones_pkey" PRIMARY KEY (id),
    CONSTRAINT "Clasificaciones_usuarioModificacionID_fkey" FOREIGN KEY ("usuarioModificacionID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "Clasificaciones_usuarioRegistroID_fkey" FOREIGN KEY ("usuarioRegistroID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;

ALTER TABLE
    IF EXISTS public."Clasificaciones" OWNER to postgres;

-- Table: public.Herramientas
-- DROP TABLE IF EXISTS public."Herramientas";
CREATE TABLE IF NOT EXISTS public."Herramientas" (
    id integer NOT NULL DEFAULT nextval('"Herramientas_id_seq"' :: regclass),
    nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
    descripcion character varying(255) COLLATE pg_catalog."default" NOT NULL,
    precio numeric NOT NULL,
    marca character varying(50) COLLATE pg_catalog."default" NOT NULL,
    estado character varying(50) COLLATE pg_catalog."default" NOT NULL,
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "usuarioRegistroID" integer NOT NULL,
    "createdAt" timestamp with time zone,
    "usuarioModificacionID" integer,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    "clasificacionID" integer NOT NULL,
    CONSTRAINT "Herramientas_pkey" PRIMARY KEY (id),
    CONSTRAINT "Herramientas_clasificacionID_fkey" FOREIGN KEY ("clasificacionID") REFERENCES public."Clasificaciones" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "Herramientas_usuarioModificacionID_fkey" FOREIGN KEY ("usuarioModificacionID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "Herramientas_usuarioRegistroID_fkey" FOREIGN KEY ("usuarioRegistroID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;

-- Table: public.PaqueteHerramientas
-- DROP TABLE IF EXISTS public."PaqueteHerramientas";
CREATE TABLE IF NOT EXISTS public."PaqueteHerramientas" (
    id integer NOT NULL DEFAULT nextval('"PaqueteHerramientas_id_seq"' :: regclass),
    descripcion character varying(255) COLLATE pg_catalog."default",
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "usuarioRegistroID" integer NOT NULL,
    "createdAt" timestamp with time zone,
    "usuarioModificacionID" integer,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    CONSTRAINT "PaqueteHerramientas_pkey" PRIMARY KEY (id),
    CONSTRAINT "PaqueteHerramientas_usuarioModificacionID_fkey" FOREIGN KEY ("usuarioModificacionID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "PaqueteHerramientas_usuarioRegistroID_fkey" FOREIGN KEY ("usuarioRegistroID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;

ALTER TABLE
    IF EXISTS public."PaqueteHerramientas" OWNER to postgres;

ALTER TABLE
    IF EXISTS public."Herramientas" OWNER to postgres;

-- Table: public.CapturaPaqueteHerramientas
-- DROP TABLE IF EXISTS public."CapturaPaqueteHerramientas";
CREATE TABLE IF NOT EXISTS public."CapturaPaqueteHerramientas" (
    id integer NOT NULL DEFAULT nextval('"CapturaPaqueteHerramientas_id_seq"' :: regclass),
    descripcion character varying(255) COLLATE pg_catalog."default",
    estado character varying(255) COLLATE pg_catalog."default",
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "usuarioRegistroID" integer NOT NULL,
    "createdAt" timestamp with time zone,
    "usuarioModificacionID" integer,
    "updatedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    "herramientaID" integer NOT NULL,
    "paqueteHerramientaID" integer NOT NULL,
    CONSTRAINT "CapturaPaqueteHerramientas_pkey" PRIMARY KEY (id),
    CONSTRAINT "CapturaPaqueteHerramientas_herramientaID_fkey" FOREIGN KEY ("herramientaID") REFERENCES public."Herramientas" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "CapturaPaqueteHerramientas_paqueteHerramientaID_fkey" FOREIGN KEY ("paqueteHerramientaID") REFERENCES public."PaqueteHerramientas" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "CapturaPaqueteHerramientas_usuarioModificacionID_fkey" FOREIGN KEY ("usuarioModificacionID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "CapturaPaqueteHerramientas_usuarioRegistroID_fkey" FOREIGN KEY ("usuarioRegistroID") REFERENCES public."Usuarios" (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
) TABLESPACE pg_default;

ALTER TABLE
    IF EXISTS public."CapturaPaqueteHerramientas" OWNER to postgres;