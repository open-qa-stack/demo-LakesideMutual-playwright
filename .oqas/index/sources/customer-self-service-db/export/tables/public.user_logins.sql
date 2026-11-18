CREATE TABLE public.user_logins (
  id bigint NOT NULL,
  authorities character varying(255),
  customer_id character varying(255),
  email character varying(255),
  password character varying(255),
  PRIMARY KEY (id)
);
