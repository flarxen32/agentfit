# Contributing to AgentFit

Thanks for your interest in contributing! AgentFit is a public, open-source
project and we welcome improvements.

## Development setup

```bash
git clone https://github.com/flarxen32/agentfit.git
cd agentfit
npm install
npm run dev
```

## Before submitting a PR

All pull requests must pass CI:

```bash
npm run lint
npm run typecheck
npm run build
```

## Guidelines

- **TypeScript strict** — all new code must pass `tsc --noEmit`.
- **Linting** — follow the ESLint config; no new warnings.
- **Tests** — scoring engine functions in `lib/engine/` must have unit tests.
- **Copy** — user-facing copy lives in `content/copy.ts`; avoid hardcoding
  strings in components.
- **Commits** — use clear, descriptive commit messages.

## Repo layout

See the [README](./README.md#project-structure) for the directory structure and
where different kinds of changes belong.
