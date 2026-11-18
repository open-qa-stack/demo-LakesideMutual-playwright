# Lakeside Mutual, tested by Open QA Stack

**30 Playwright tests that AI agents planned, wrote and ran on their own, against the four applications of [Lakeside Mutual](https://github.com/open-qa-stack/demo-LakesideMutual), at every level of the test pyramid.**

Nothing in `apps/` was written by hand. [Open QA Stack](https://github.com/open-qa-stack/test-management) mapped the applications from their screens, APIs, databases, specifications and source code, planned the scenarios level by level, wrote each test, ran it against the live applications, and committed it. Every commit `test: add N generated Playwright tests` is one design by the agents.

| Level | Tests | Passed | Kept failing |
| --- | ---: | ---: | ---: |
| Smoke — the application answers | 4 | 4 | 0 |
| Functional — one behaviour of one screen | 20 | 15 | 5 |
| Business — a journey through several screens | 2 | 1 | 1 |
| Cross-application — an action in one application, its effect in another | 3 | 1 | 2 |
| End-to-end — a journey through three applications | 1 | 1 | 0 |
| **Total** | **30** | **22** | **8** |

8 of them compare a screen with a reference image; the others assert what the page shows. The screens are driven through page objects in `apps/*/pages/`, which the agents wrote from what they saw, and shared fixtures in `apps/shared/fixtures.ts`.

## How it was made

Five requests, in French, to the console of Open QA Stack, one after the other, each building on the tests of the one before:

1. *Test the four applications of Lakeside Mutual, at every level.* Too broad: the agent that plans the functional level gave up, saying it could not trace scenarios without guessing. It was stopped after the smoke tests.
2. *Test the management of policies in Policy Management: view, create and edit a policy, and handle quote requests.*
3. *Test the management of customers in Customer Management: search a customer, open their profile and edit their details.*
4. *Test the Customer Self-Service: sign in, view one's policies and ask for a quote.*
5. *Test the journeys across applications: a quote request made in the Customer Self-Service, handled in Policy Management, then its effect seen by the customer.*

About 1,800 requests to the model (`gpt-6-luna`) and 1 h 40 min in all, on one laptop, with the applications running locally.

What the agents produced besides the tests is kept in `.oqas/`:

- `index/` — the map of the applications, by domain and by source;
- `designs/` — each plan, as a readable `*.plan.md`, and the state of each design: every run of every test, its verdict, and why a test was kept failing;
- `memory/notes.jsonl` — what the agents noted while they explored.

## The tests kept failing

A test that fails is never weakened to pass: it is kept as it is, with a diagnosis, for a person to decide.

| Test | Kept failing because |
| --- | --- |
| `policy-management/…/policy-edit/policy-edit-initial-values` | The application, says the agent: opening the edit address of a policy lands on the list of policies, not on the form. |
| `policy-management/…/quote-response-dialog/quote-response-cancel` | The application, says the agent: the amount fields of the response dialog lack the placeholder *Amount in CHF* the specification gives them. |
| `customer-self-service/…/quote-request-details/quote-rejection-customer-visible` | The test: the agent ran the same failing text again, and the harness closed the scenario. |
| `customer-self-service/…/quote-request-wizard/…-confirmation`, `…-insurance` | The plan: its steps start on a signed-in page but hold no sign-in, and the agent that writes may not add steps. |
| `customer-self-service/…/quote-request-submission/submit-quote-request` | The plan: its steps only look at a request already submitted, which does not match its title. |
| `policy-management/…/quote-response/accepted-quote-visible-to-customer`, `quote-rejection-visible-to-customer` | The plan: the journey ends in the Customer Self-Service, but its scenario gives no account to sign in with. |

Five of the eight come from plans that leave out the sign-in to the Customer Self-Service: a gap of the harness, not of the application. The agents also found that creating a policy fails in Policy Management (*Failed to create policy*), and that the edit and response forms repeat their amount fields without a label that tells them apart.

## Run the tests

Start Lakeside Mutual from [its repository](https://github.com/open-qa-stack/demo-LakesideMutual) with Docker Compose, then:

```sh
npm ci
npx playwright install --with-deps chromium
OQAS_ENVIRONMENT=local CSS_DEMO_USERNAME=admin@example.com CSS_DEMO_PASSWORD=1password npx playwright test
```

The account is the public demo account of Lakeside Mutual, which its login page shows; the tests read it from the environment. The base address of each application comes from `oqas.json`, or from `OQAS_BASE_URL_<APPLICATION>`.

Some tests write data — a quote request, a customer's details — and the exploration rejected two quote requests: start from a fresh database to see the verdicts above. The reference images were made with Chromium on macOS: on another machine, make them again with `--update-snapshots`.

## Licence

[Eclipse Public License 2.0](LICENSE), as Lakeside Mutual, which the map and the tests quote.
