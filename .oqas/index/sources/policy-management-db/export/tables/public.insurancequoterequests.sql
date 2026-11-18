CREATE TABLE public.insurancequoterequests (
  customer_info_id bigint,
  date timestamp(6) without time zone,
  id bigint NOT NULL,
  insurance_options_id bigint,
  insurance_quote_id bigint,
  policy_id character varying(255),
  PRIMARY KEY (id),
  FOREIGN KEY (insurance_options_id) REFERENCES public.insuranceoptions (id),
  FOREIGN KEY (insurance_quote_id) REFERENCES public.insurancequotes (id),
  FOREIGN KEY (customer_info_id) REFERENCES public.customerinfos (id),
  CONSTRAINT insurancequoterequests_customer_info_id_key UNIQUE (customer_info_id),
  CONSTRAINT insurancequoterequests_insurance_options_id_key UNIQUE (insurance_options_id),
  CONSTRAINT insurancequoterequests_insurance_quote_id_key UNIQUE (insurance_quote_id)
);
