# Touchline Training

A Vue single-page application for organizing football training sessions, players, and drills.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with `npm run build`.

## Pages

- **Overview**: squad totals and upcoming sessions.
- **Sessions**: create, view, update, and delete training sessions; search and filter by status.
- **Players**: manage player details and availability; jersey numbers must be unique.
- **Drills**: manage a reusable practice library and filter by category.
- **Project setup**: requirements, setup steps, and a map of the Vue concepts used.

Session, player, and drill data is saved in browser local storage. Use **Reset demo data** on Project Setup to restore the sample records.

## Vue concepts demonstrated

- Vue single-file components and lazy-loaded Vue Router routes.
- `ref`, `reactive`, `computed`, and deep `watch` for reactive state and persistence.
- `v-if`, `v-for`, `v-model`, `:key`, and event directives such as `@click` and `@submit.prevent`.
- Reusable components with props and emits.
- CRUD workflows for sessions, players, and drills.
