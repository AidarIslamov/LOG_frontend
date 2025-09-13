import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('layouts/public-layout.tsx', [
    route('login', 'routes/public/login.tsx'),
    route('signup', 'routes/public/signup.tsx'),
  ]),
  layout('layouts/protected-layout.tsx', [
    index("routes/protected/home.tsx"),
    route('round/:uid', 'routes/protected/round.tsx'),
    layout('layouts/admin-role-layout.tsx', [
      route('round', 'routes/protected/role-based/round-create.tsx', {index:true}),
    ])
  ]),
] satisfies RouteConfig;