CREATE TABLE public.addresses (
  id bigint NOT NULL,
  city character varying(255),
  postal_code character varying(255),
  street_address character varying(255),
  PRIMARY KEY (id)
);
