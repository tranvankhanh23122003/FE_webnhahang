const users = [
    {
        path: "/users",
        component: () => import("../pages/Home.vue"),
        children: [
            {
                path: "", 
                name: "users",
                component: () => import("../pages/Home.vue") 
            }   
        ]
    }
];

export default users;
