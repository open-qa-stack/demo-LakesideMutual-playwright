CREATE TABLE public.insurancequoterequests_status_history (
  insurance_quote_request_aggregate_root_id bigint NOT NULL,
  status_history_id bigint NOT NULL,
  FOREIGN KEY (insurance_quote_request_aggregate_root_id) REFERENCES public.insurancequoterequests (id),
  FOREIGN KEY (status_history_id) REFERENCES public.requeststatuschanges (id),
  CONSTRAINT insurancequoterequests_status_history_status_history_id_key UNIQUE (status_history_id)
);
