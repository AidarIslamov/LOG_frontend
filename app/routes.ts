import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";


export default [
  layout('layouts/public-layout.tsx', [
    route('login', 'routes/public/login.tsx'),
    route('signup', 'routes/public/signup.tsx'),
  ]),
  layout('layouts/protected-layout.tsx', [
    route('round/:uid?', 'routes/protected/round.tsx'),
    index("routes/protected/home.tsx"),
  ])
] satisfies RouteConfig;