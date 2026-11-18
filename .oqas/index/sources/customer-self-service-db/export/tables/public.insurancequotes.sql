CREATE TABLE public.insurancequotes (
  insurance_premium_amount numeric(38,2),
  insurance_premium_currency character varying(3),
  policy_limit_amount numeric(38,2),
  policy_limit_currency character varying(3),
  expiration_date timestamp(6) without time zone,
  id bigint NOT NULL,
  PRIMARY KEY (id)
);
