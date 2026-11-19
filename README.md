# Lakeside Mutual, tested by Open QA Stack

**29 Playwright tests that AI agents planned, wrote and ran on their own, against the four applications of [Lakeside Mutual](https://github.com/open-qa-stack/demo-LakesideMutual), at every level of the test pyramid.**

Nothing in `apps/` was written by hand. [Open QA Stack](https://github.com/open-qa-stack/test-management) mapped the applications from their screens, APIs, databases, specifications and source code, planned the scenarios level by level, wrote each test, ran it against the live applications, and committed it. Every commit `test: add N generated Playwright tests` is one design by the agents. The history keeps the run before this one: this repository shows what the latest version of the tool produces, and is made again at each major one.

| Level | Tests | Passed | Kept failing |
| --- | ---: | ---: | ---: |
| Smoke — the application answers | 4 | 4 | 0 |
| Functional — one behaviour of one screen | 13 | 11 | 2 |
| Business — a journey through several screens | 6 | 4 | 2 |
| Cross-application — an action in one application, its effect in another | 4 | 2 | 2 |
| End-to-end — a journey through three applications | 2 | 1 | 1 |
| **Total** | **29** | **22** | **7** |

9 of them compare a screen with a reference image; the others assert what the page shows. The screens are driven through page objects in `apps/*/pages/`, which the agents wrote from what they saw, and shared fixtures in `apps/shared/fixtures.ts`.

## How it was made

Four requests, in French, to the console of Open QA Stack, one after the other, each building on the tests of the one before:

1. *Test the management of policies in Policy Management: view, create and edit a policy, and handle quote requests.*
2. *Test the management of customers in Customer Management: search a customer, open their profile and edit their details.*
3. *Test the Customer Self-Service: sign in, view one's policies and ask for a quote.*
4. *Test the journeys across applications: a quote request made in the Customer Self-Service, handled in Policy Management, then its effect seen by the customer.*

About 1,240 requests to the model (`gpt-6-luna`) and 68 minutes in all, on one laptop, with the applications running locally. The map of the applications was kept from the run before: nothing that changed since bears on it.

What the agents produced besides the tests is kept in `.oqas/`:

- `index/` — the map of the applications, by domain and by source;
- `designs/` — each plan, as a readable `*.plan.md`, and the state of each design: every run of every test, its verdict, and why a test was kept failing;
- `memory/notes.jsonl` — what the agents noted while they explored.

## The tests kept failing

A test that fails is never weakened to pass: it is kept as it is, with a diagnosis, for a person to decide.

| Test | Kept failing because |
| --- | --- |
| `policy-management/…/policy-edit/edit-policy-prefilled-form` | Unfeasible: the amounts of the form share one accessible name and the dates have none, so that no locator the test charter allows tells them apart — a defect of testability of the application. |
| `customer-management/…/search-open-edit-customer-profile` | The data, says the agent: the profile already shows the address an earlier run wrote, not the one the plan started from. |
| `customer-self-service/…/customer-sign-in-view-policies-and-submit-quote` | The application, says the agent: the quote form does not show the contact address the plan observed. |
| `policy-management/…/quote-response-visible-to-customer`, `cross-app-policy-visible-in-self-service` | The application, says the agent — but the failed runs end on the signed-out page of the Customer Self-Service: the sign-in of the test did not go through, which points at the test rather than at the application. |
| `customer-self-service/…/quote-request-overview` | Unfeasible: its plan clicks the sign-in button a second time, once already signed in. |
| `customer-self-service/…/quote-config-selection-review` | Unfeasible: the agent signed in with the button of the application that fills the demo account, and its plan holds no sign-in a test can replay. |

Four of the seven come from how a test signs in or from data an earlier run changed: gaps of the harness, not of the application.

## Run the tests

Start Lakeside Mutual from [its repository](https://github.com/open-qa-stack/demo-LakesideMutual) with Docker Compose, then:

```sh
npm ci
npx playwright install --with-deps chromium
OQAS_ENVIRONMENT=local CSS_DEMO_USERNAME=admin@example.com CSS_DEMO_PASSWORD=1password npx playwright test
```

The account is the public demo account of Lakeside Mutual, which its login page shows; the tests read it from the environment. The base address of each application comes from `oqas.json`, or from `OQAS_BASE_URL_<APPLICATION>`.

Some tests write data — a quote request, a customer's details: start from a fresh database to see the verdicts above. The reference images were made with Chromium on macOS: on another machine, make them again with `--update-snapshots`.

## Licence

[Eclipse Public License 2.0](LICENSE), as Lakeside Mutual, which the map and the tests quote.
