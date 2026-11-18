CREATE TABLE public.insurancepolicies (
  deductible_amount numeric(38,2),
  deductible_currency character varying(3),
  limit_amount numeric(38,2),
  limit_currency character varying(3),
  premium_amount numeric(38,2),
  premium_currency character varying(3),
  creation_date timestamp(6) without time zone,
  end_date timestamp(6) without time zone,
  insuring_agreement_id bigint,
  start_date timestamp(6) without time zone,
  customer_id character varying(255),
  id character varying(255) NOT NULL,
  name character varying(255),
  PRIMARY KEY (id),
  FOREIGN KEY (insuring_agreement_id) REFERENCES public.insuringagreements (id),
  CONSTRAINT insurancepolicies_insuring_agreement_id_key UNIQUE (insuring_agreement_id)
);
