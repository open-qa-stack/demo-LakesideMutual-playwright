CREATE TABLE public.insuringagreements_agreement_items (
  agreement_items_id bigint NOT NULL,
  insuring_agreement_entity_id bigint NOT NULL,
  FOREIGN KEY (agreement_items_id) REFERENCES public.insuranceagreementitems (id),
  FOREIGN KEY (insuring_agreement_entity_id) REFERENCES public.insuringagreements (id),
  CONSTRAINT insuringagreements_agreement_items_agreement_items_id_key UNIQUE (agreement_items_id)
);
