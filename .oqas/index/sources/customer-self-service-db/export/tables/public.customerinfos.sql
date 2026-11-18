CREATE TABLE public.customerinfos (
  billing_address_id bigint,
  contact_address_id bigint,
  id bigint NOT NULL,
  customer_id character varying(255),
  firstname character varying(255),
  lastname character varying(255),
  PRIMARY KEY (id),
  FOREIGN KEY (contact_address_id) REFERENCES public.addresses (id),
  FOREIGN KEY (billing_address_id) REFERENCES public.addresses (id),
  CONSTRAINT customerinfos_billing_address_id_key UNIQUE (billing_address_id),
  CONSTRAINT customerinfos_contact_address_id_key UNIQUE (contact_address_id)
);
