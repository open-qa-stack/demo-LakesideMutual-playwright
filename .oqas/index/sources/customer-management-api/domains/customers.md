# Customers (`customers`)

Consultation, listing and profile management for customers and their associated profile data.

## Customers

Consultation, listing, and profile management for customers and associated profile data.

| Operation | Role | Parameters | Sends | Returns |
|---|---|---|---|---|
| `GET /customers/{customerId}` | Retrieves a customer profile by customer ID. | Required path parameter `customerId`. | — | `200 CustomerDto` |
| `PUT /customers/{customerId}` | Updates the profile of the customer identified by the path parameter. | Required path parameter `customerId`. | `CustomerProfileDto` | `200 CustomerDto` |
| `GET /customers` | Lists customers with optional filtering and pagination. | Optional query parameters `filter`, `limit`, `offset`. | — | `200 PaginatedCustomerResponseDto` |
| `GET /error` | Framework error dispatch endpoint exposed by the API. | — | — | `200` |
| `PUT /error` | Framework error dispatch endpoint exposed by the API. | — | — | `200` |
| `POST /error` | Framework error dispatch endpoint exposed by the API. | — | — | `200` |
| `DELETE /error` | Framework error dispatch endpoint exposed by the API. | — | — | `200` |
| `OPTIONS /error` | Framework error dispatch endpoint exposed by the API. | — | — | `200` |
| `HEAD /error` | Framework error dispatch endpoint exposed by the API. | — | — | `200` |
| `PATCH /error` | Framework error dispatch endpoint exposed by the API. | — | — | `200` |

### Schemas

- `CustomerId`: `id` (string).
- `AddressDto`: `streetAddress` (string), `postalCode` (string), `city` (string). Used for entries in a customer's move history.
- `CustomerProfileDto`: `firstname` (string), `lastname` (string), `birthday` (string), `email` (string), `phoneNumber` (string), `moveHistory` (array of `AddressDto`). This is the request body for `PUT /customers/{customerId}`.
- `CustomerDto`: `customerId` (string), `_links` (`Links`). Returned by both customer-specific operations; its listed properties do not include the profile fields.
- `Links`: Holds hypermedia links for customer resources and paginated responses.
- `PaginatedCustomerResponseDto`: `filter` (string), `limit` (integer), `offset` (integer), `size` (integer), `customers` (array of `CustomerDto`), `_links` (`Links`). Returned by `GET /customers`.
- `Link`: `href` (string), `hreflang` (string), `title` (string), `type` (string), `deprecation` (string), `profile` (string), `name` (string), `templated` (boolean). Represents an individual hypermedia link and its metadata.

### Call hints and domain links

- Listing filters and pagination are optional query parameters; no defaults, constraints, or filter syntax are specified.
- `GET /customers` returns `customers` and pagination metadata. `CustomerDto` provides `customerId` and `_links`; `Links` holds the hypermedia links.
- `PUT /customers/{customerId}` sends profile details, including move history, and returns a `CustomerDto`.
- The source also has the `interaction-logs` domain for customer interaction histories and acknowledgement, and the `notifications` domain for unacknowledged notification counts associated with customers.
