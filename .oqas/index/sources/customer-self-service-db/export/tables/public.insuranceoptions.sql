CREATE TABLE public.insuranceoptions (
  deductible_amount numeric(38,2),
  deductible_currency character varying(3),
  id bigint NOT NULL,
  start_date timestamp(6) without time zone,
  name character varying(255),
  PRIMARY KEY (id)
);
