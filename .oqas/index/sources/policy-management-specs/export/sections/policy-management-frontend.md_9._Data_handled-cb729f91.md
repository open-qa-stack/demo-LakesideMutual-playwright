## 9. Data handled

The application stores nothing; it displays and submits data owned by the Policy Management backend.

| Entity | Attributes used | Origin |
|---|---|---|
| Policy | policyId, customer (identifier or embedded customer), creationDate, policyPeriod, policyType, deductible, insurancePremium, policyLimit, insuringAgreement.agreementItems | `PMB-API-03`, `PMB-API-14`, `PMB-API-16`; written by `PMB-API-15`, `PMB-API-17` |
| Customer | customerId, firstname, lastname, birthday, streetAddress, postalCode, city, email, phoneNumber | `PMB-API-01`, `PMB-API-02` |
| Insurance quote request | id, date, statusHistory, customerInfo (names, contact and billing address), insuranceOptions (startDate, insuranceType, deductible), insuranceQuote, policyId | `PMB-API-11`, `PMB-API-12`; answered by `PMB-API-13` |
| Risk factor | riskFactor | `PMB-API-19` |
