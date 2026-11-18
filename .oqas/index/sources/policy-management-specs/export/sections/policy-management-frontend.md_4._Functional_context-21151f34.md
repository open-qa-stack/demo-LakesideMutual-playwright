## 4. Functional context

The application talks only to the Policy Management backend, whose URL is given by `VUE_APP_POLICY_MANAGEMENT_BACKEND` (observed value `http://localhost:8090`). Customer data shown here is read by the backend from Customer Core. Quote requests shown here are created by customers in the Customer Self-Service frontend and forwarded by the Customer Self-Service backend; the customer's decision on a quote is made there as well. These flows are described in the [system overview](../../system/overview-sfd.md).
