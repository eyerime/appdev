# SpeakUp

Anonymous classroom Q&A. Students ask questions without their name attached, upvote what they also want answered, and teachers work down a live queue.

Built with React 19, Vite and Tailwind CSS v4. There is no backend yet, so all data lives in the browser.

## Getting started

```bash
npm install
npm run dev   # http://localhost:5173
npm run build
```

## Demo accounts

| Role    | Username  | Password  | Log in at         |
| ------- | --------- | --------- | ----------------- |
| Teacher | `teacher` | `teacher` | `#/login/teacher` |
| Student | `student` | `student` | `#/login/student` |

Each login form only accepts its own role. Demo room code for students: `HX7-4K2`.

## Routes

| Path                              | Who     | What                           |
| --------------------------------- | ------- | ------------------------------ |
| `#/`                              | anyone  | Landing page                   |
| `#/login/teacher`, `#/login/student` | anyone | Login screens                |
| `#/teacher`                       | teacher | Room dashboard                 |
| `#/teacher/create`                | teacher | Create a room                  |
| `#/teacher/room/:id`              | teacher | Live queue                     |
| `#/teacher/summary/:id`           | teacher | Session summary                |
| `#/teacher/profile`               | teacher | Profile                        |
| `#/student`                       | student | Join a room with a code        |
| `#/student/room/:code`            | student | Ask and upvote questions       |
| `#/components`                    | anyone  | Component library and states   |

## Commit style

This repo uses [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
