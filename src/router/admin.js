const users = [
    {
        path: "/users",
        component: () => import("../layout/client/Home.vue"),
        children: [
            {
                path: " ", 
                name: "users-home",
                component: () => import("../layout/client/Home.vue") 
            }   ,
            {
                path: "contact", 
                name: "users-contact",
                component: () => import("../layout/client/Contact.vue")
            }  
        ]
    }
];

export default users;
