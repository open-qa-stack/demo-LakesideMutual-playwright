CREATE TABLE public.interactionlogs_interactions (
  interaction_log_aggregate_root_customer_id character varying(255) NOT NULL,
  interactions_id character varying(255) NOT NULL,
  FOREIGN KEY (interactions_id) REFERENCES public.interactions (id),
  FOREIGN KEY (interaction_log_aggregate_root_customer_id) REFERENCES public.interactionlogs (customer_id),
  CONSTRAINT interactionlogs_interactions_interactions_id_key UNIQUE (interactions_id)
);
