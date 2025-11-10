import Login from '../views/Login.vue';
import SubscriptionsList from '../components/SubscriptionsList.vue';
import CreateUpdate from '../components/CreateUpdate.vue';
import Register from '../views/Register.vue';

import db from '../firebaseDb'; // ignore warning that 'db' is not used
import { getAuth } from "firebase/auth";
import auth from '../firebaseDb'

import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/subscriptionsList',
        name: 'SubscriptionsList',
        component: SubscriptionsList,
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: CreateUpdate,
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/create',
        name: 'create',
        component: CreateUpdate,
        meta: {
            authRequired: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        auth = getAuth();
        if (auth.currentUser) {
            next();
        } else {
            alert('You must be logged in to see this page');
            next({
                path: '/',
            });
        }
    } else {
        next();
    }
});
export default router;
