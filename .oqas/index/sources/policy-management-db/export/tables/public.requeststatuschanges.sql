CREATE TABLE public.requeststatuschanges (
  date timestamp(6) without time zone,
  id bigint NOT NULL,
  status character varying(255),
  PRIMARY KEY (id),
  CONSTRAINT requeststatuschanges_status_check CHECK (((status)::text = ANY ((ARRAY['REQUEST_SUBMITTED'::character varying, 'REQUEST_REJECTED'::character varying, 'QUOTE_RECEIVED'::character varying, 'QUOTE_ACCEPTED'::character varying, 'QUOTE_REJECTED'::character varying, 'QUOTE_EXPIRED'::character varying, 'POLICY_CREATED'::character varying])::text[])))
);
