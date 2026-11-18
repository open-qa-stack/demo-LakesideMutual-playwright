CREATE TABLE public.customer_profile_entity_move_history (
  customer_profile_entity_id bigint NOT NULL,
  move_history_id bigint NOT NULL,
  FOREIGN KEY (customer_profile_entity_id) REFERENCES public.customer_profile_entity (id),
  FOREIGN KEY (move_history_id) REFERENCES public.addresses (id),
  CONSTRAINT customer_profile_entity_move_history_move_history_id_key UNIQUE (move_history_id)
);
