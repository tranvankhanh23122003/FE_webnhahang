const users = [
    {
        path: "/",
        component: () => import("../layout/client/index.vue"),
        children: [
            {
                path: "", 
                name: "users-home",
                component: () => import("../pages/client/Home.vue") 
            }   ,
            {
                path: "contact", 
                name: "users-contact",
                component: () => import("../pages/client/Contact.vue")
            }  ,
            {
                path: "booking", 
                name: "users-booking",
                component: () => import("../pages/client/Booking.vue")
            }  ,
            {
                path: "news", 
                name: "users-news",
                component: () => import("../pages/client/News.vue")
            } , 
            {
                path: "introduce", 
                name: "users-introduce",
                component: () => import("../pages/client/Introduce.vue")
            }, 
            {
                path: "shoppingCart", 
                name: "users-shoppingCart",
                component: () => import("../pages/client/shoppingCart.vue")
            }, 
            {
                path: "pay", 
                name: "users-pay",
                component: () => import("../pages/client/pay.vue")
            }, 
            {
                path: "category", 
                name: "users-category",
                component: () => import("../pages/client/categoryappetizer.vue")
            }, 
            {
                path: "personalinformation", 
                name: "users-personalinformation",
                component: () => import("../pages/client/personalinformation.vue")
            }, 
            {
                path: "evaluation", 
                name: "users-evaluation",
                component: () => import("../pages/client/evaluation.vue")
            }, 
        ]
    }
];

export default users;
