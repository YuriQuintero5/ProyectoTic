/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */

//import store from "../store";
export default [
  // This section is primarily for the login but it allows you to add external other pages to be rendered outside the dashboard layout like the login
  //if you want to add more external routes make them in the children array
  {
    // using the named route option
    path: "/login",
    meta: {
      name: "External",
      requiresAuth: false,
    },
    component: () => import(`@/views/ExternalView.vue`), // this renders the children in this layout
    children: [
      //any components in this path auto render in External
      {
        path: "", // you leave this blank if you want it to default to the parents path
        name: "login",
        component: () => import(`@/views/LoginView.vue`),
      },
    ],
  },

  {
    path: "/",
    meta: {
      name: "dashboard-view",
      requiresAuth: true,
    },
    component: () => import(`@/views/DashboardView.vue`),
    children: [
      {
        path: "", //defaults to / if left blank
        meta: {
          name: "Dash",
        },
        component: () => import(`@/views/DashboardViews/Dash.vue`),
      },
      {
        path: "tercero", // ends up as /user
		name: 'tercero',
        meta: {
          name: "Tercero",
        },
        component: () => import(`@/views/DashboardViews/TerceroView.vue`),
      },
      {
        path: "equipo", // ends up as /user
        meta: {
          name: "Equipo",
        },
        component: () => import(`@/views/DashboardViews/EquipoView.vue`),
      },
      {
        path: "listar-equipos", // ends up as /user
		name: "Lista de equipos",
        meta: {
          name: "Lista de equipos",
        },
        component: () => import(`@/views/DashboardViews/MachineListView.vue`),
      },
      {
        path: "listar-equipos-almacen", // ends up as /user
		name: "Lista de equipos almacen",
        meta: {
          name: "Lista de equipos",
        },
        component: () => import(`@/views/DashboardViews/WarehouseListView.vue`),
      },
		{
        path: "listar-equipos-cuarentena", // ends up as /user
		name: 'listar equipos cuarentena',
        meta: {
          name: "Lista de equipos",
        },
        component: () => import(`@/views/DashboardViews/QuarantineListView.vue`),
      },
		{
        path: "revision/:id",
		name: 'revision',
        meta: {
          name: "Revisión",
        },
        component: () => import(`@/views/DashboardViews/ReviewView.vue`),
      },
		{
			path: "fallo/:id",
			name: 'Fallo',
			meta: {
				name: "Fallo",
			},
			component: () => import(`@/views/DashboardViews/FailView.vue`),
		},
		{
        path: "asignacion-cliente-equipo/:id",
		name: 'Asignacion cliente equipo',
        meta: {
          name: "Asignacion cliente equipo",
        },
        component: () => import(`@/views/DashboardViews/CustomerAssigmentView.vue`),
      },
    ],
  },
  // This is a catch all aka page not found route. it will send you to the dashboard
  {
    path: "*",
    redirect: {
      name: "catchAll",
      path: "/",
    },
    meta: {
      requiresAuth: true,
    },
  },
  //Error component fallback
  {
    path: "/:catchAll(.*)",
    component: () => import(`@/components/error/NotFound.vue`),
    name: "NotFound",
  },
];
