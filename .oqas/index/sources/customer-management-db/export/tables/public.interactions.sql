CREATE TABLE public.interactions (
  sent_by_operator boolean NOT NULL,
  date timestamp(6) without time zone,
  content character varying(255),
  id character varying(255) NOT NULL,
  PRIMARY KEY (id)
);
