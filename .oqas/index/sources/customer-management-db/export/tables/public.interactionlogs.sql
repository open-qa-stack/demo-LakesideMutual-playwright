CREATE TABLE public.interactionlogs (
  customer_id character varying(255) NOT NULL,
  last_acknowledged_interaction_id character varying(255),
  username character varying(255),
  PRIMARY KEY (customer_id)
);
