CREATE TABLE public.customers (
  customer_profile_id bigint,
  id character varying(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (customer_profile_id) REFERENCES public.customer_profile_entity (id),
  CONSTRAINT customers_customer_profile_id_key UNIQUE (customer_profile_id)
);
