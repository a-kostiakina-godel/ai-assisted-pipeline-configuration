Create a GitHub Actions workflow at .github/workflows/playwright-tests.yml with the following exact requirements:

Triggers
Run only on pull requests targeting the main branch (pull_request with branches: [ main ]).
Runner & toolchain
Use ubuntu-latest.
Use the latest LTS Node.js via actions/setup-node@v4 with cache: yarn.

Install
Install dependencies with Yarn:
yarn install --immutable --immutable-cache --check-cache
Install Playwright browsers with system deps:
yarn playwright install --with-deps

Test
Run Playwright tests in parallel:
yarn playwright test
Set CI=true in the job env.
Set timeout-minutes: 30 on the job.

Artifacts (always upload)
Upload the HTML report directory (playwright-report) as artifact named playwright-html-report.
Upload Playwright traces (e.g. test-results/\*_/trace_.zip or the default traces folder) as artifact named playwright-traces.
Use if: always() on artifact upload steps.

YAML quality
Single job named playwright-tests.
Minimal permissions (read-only) and concurrency to cancel in-progress runs per PR (use a sensible group expression).
Add a final steps order: checkout → setup-node → yarn install → playwright install → test → artifact uploads.
Include brief comments explaining key steps.

---

Update the workflow file .github/workflows/playwright-tests.yml to add Microsoft Teams notifications with these exact requirements:

Notification behavior
Send a Teams message only when the workflow fails (if: failure()).
Include in the message:
Pull request title
PR author
Branch name
Link to the failed workflow run
Use a Teams webhook URL stored in GitHub Secrets as TEAMS_WEBHOOK_URL.

Implementation details
Use a final step at the end of the existing job so it runs even if earlier steps fail.
Keep the rest of the workflow unchanged.

Deliverable
Output the updated YAML (no explanations or comments).
Deliverables
Updated .github/workflows/playwright-tests.yml with Teams notification step

---

Update .github/workflows/playwright-tests.yml to add a new job named security-scan with the following exact requirements:

Purpose
Run a dependency vulnerability scan using npm audit.

Behavior
Run in parallel with the existing playwright-tests job (no dependency between them).
Fail the workflow if high or critical severity vulnerabilities are detected.
Use continue-on-error: false to ensure the job blocks PRs when vulnerabilities are found.
Generate a concise summary report of vulnerabilities in the GitHub Actions summary (using $GITHUB_STEP_SUMMARY).

Implementation details
Use the same ubuntu-latest runner and Node.js setup as the main job.
Include steps for checkout, setup-node (with npm cache), and the yarn audit command with appropriate severity filters.
Keep YAML formatting consistent with the rest of the workflow.

Deliverable
Output the complete updated YAML with the new security-scan job added. No explanations or comments.
