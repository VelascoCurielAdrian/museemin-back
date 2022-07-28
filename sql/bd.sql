-- Table: public.TipoPerfiles

-- DROP TABLE IF EXISTS public."TipoPerfiles";

CREATE TABLE IF NOT EXISTS public."TipoPerfiles"
(
    id integer NOT NULL DEFAULT nextval('"TipoPerfiles_id_seq"'::regclass),
    nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    CONSTRAINT "TipoPerfiles_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."TipoPerfiles"
    OWNER to postgres;

-- Table: public.Usuarios

-- DROP TABLE IF EXISTS public."Usuarios";

CREATE TABLE IF NOT EXISTS public."Usuarios"
(
    id integer NOT NULL DEFAULT nextval('"Usuarios_id_seq"'::regclass),
    nombre character varying(50) COLLATE pg_catalog."default" NOT NULL,
    usuario character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(50) COLLATE pg_catalog."default" NOT NULL,
    correo character varying(50) COLLATE pg_catalog."default" NOT NULL,
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "perfilID" integer NOT NULL,
    CONSTRAINT "Usuarios_pkey" PRIMARY KEY (id),
    CONSTRAINT "Usuarios_perfilID_fkey" FOREIGN KEY ("perfilID")
        REFERENCES public."TipoPerfiles" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Usuarios"
    OWNER to postgres;

-- Table: public.Secciones

-- DROP TABLE IF EXISTS public."Secciones";

CREATE TABLE IF NOT EXISTS public."Secciones"
(
    id integer NOT NULL DEFAULT nextval('"Secciones_id_seq"'::regclass),
    descripcion character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "moduloWeb" boolean NOT NULL DEFAULT true,
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "usuarioRegistroID" integer NOT NULL,
    "createdAt" timestamp with time zone,
    "usuarioModificacionID" integer,
    "updatedAt" timestamp with time zone,
    CONSTRAINT "Secciones_pkey" PRIMARY KEY (id),
    CONSTRAINT "Secciones_usuarioModificacionID_fkey" FOREIGN KEY ("usuarioModificacionID")
        REFERENCES public."Usuarios" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Secciones_usuarioRegistroID_fkey" FOREIGN KEY ("usuarioRegistroID")
        REFERENCES public."Usuarios" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Secciones"
    OWNER to postgres;


-- Table: public.Modulos

-- DROP TABLE IF EXISTS public."Modulos";

CREATE TABLE IF NOT EXISTS public."Modulos"
(
    id integer NOT NULL DEFAULT nextval('"Modulos_id_seq"'::regclass),
    descripcion character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "moduloWeb" boolean NOT NULL DEFAULT true,
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "usuarioRegistroID" integer NOT NULL,
    "createdAt" timestamp with time zone,
    "usuarioModificacionID" integer,
    "updatedAt" timestamp with time zone,
    "seccionID" integer NOT NULL,
    CONSTRAINT "Modulos_pkey" PRIMARY KEY (id),
    CONSTRAINT "Modulos_seccionID_fkey" FOREIGN KEY ("seccionID")
        REFERENCES public."Secciones" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Modulos_usuarioModificacionID_fkey" FOREIGN KEY ("usuarioModificacionID")
        REFERENCES public."Usuarios" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "Modulos_usuarioRegistroID_fkey" FOREIGN KEY ("usuarioRegistroID")
        REFERENCES public."Usuarios" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Modulos"
    OWNER to postgres;

-- Table: public.PerfilModulos

-- DROP TABLE IF EXISTS public."PerfilModulos";

CREATE TABLE IF NOT EXISTS public."PerfilModulos"
(
    id integer NOT NULL DEFAULT nextval('"PerfilModulos_id_seq"'::regclass),
    "perfilID" integer NOT NULL,
    "moduloID" integer NOT NULL,
    activo boolean NOT NULL DEFAULT true,
    estatus boolean NOT NULL DEFAULT true,
    "usuarioRegistroID" integer NOT NULL,
    "createdAt" timestamp with time zone,
    "usuarioModificacionID" integer,
    "updatedAt" timestamp with time zone,
    CONSTRAINT "PerfilModulos_pkey" PRIMARY KEY (id, "moduloID"),
    CONSTRAINT "PerfilModulos_moduloID_fkey" FOREIGN KEY ("moduloID")
        REFERENCES public."Modulos" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "PerfilModulos_perfilID_fkey" FOREIGN KEY ("perfilID")
        REFERENCES public."TipoPerfiles" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "PerfilModulos_usuarioModificacionID_fkey" FOREIGN KEY ("usuarioModificacionID")
        REFERENCES public."Usuarios" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "PerfilModulos_usuarioRegistroID_fkey" FOREIGN KEY ("usuarioRegistroID")
        REFERENCES public."Usuarios" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."PerfilModulos"
    OWNER to postgres;

    