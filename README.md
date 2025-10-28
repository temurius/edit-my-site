# Edit-My-Site AI

Monorepo with Angular 18 client and Express backend to visually edit site sections using AI and create pull requests (mocked).

## Quick Start

1. Copy `server/.env.example` to `server/.env` and set values (optional for mocks).
2. Install deps at repo root:
   - `npm install`
3. Run both client and server:
   - `npm run start`

Client: http://localhost:4200

Server: http://localhost:4000

## Structure

- `client/` Angular 18 app
  - Core services (Auth, AI, API interceptor)
  - Shared UI (Material + Tailwind)
  - Feature modules: Editor, Dashboard, Auth
- `server/` Express TypeScript API
  - `/api/edit` mock AI response
  - `/api/pull-request` mock PR creation

## Notes

- Tailwind configured with glassmorphism utility classes.
- NgRx added for editor state, easy to extend.
- Material used for inputs, lists, dialogs.
- GSAP powers widget panel animation.
- highlight.js via ngx-highlightjs for diff.

## Next Steps

- Integrate real OpenAI Responses API in `server/src/services/aiService.ts`.
- Add GitHub App integration in `server/src/services/githubService.ts`.
- Wire approvals flow in Dashboard with real data.

