<template>
    <div class="app">
        <Navbar />
        <form @submit.prevent="login">
            <h2>Login</h2>
            <br>
            <label for="email">Username:</label>
            <input type="email" id="email" placeholder="Email address..." v-model="email" />
            <br><br>
            <label for="pw">Password:</label>
            <input id="pw" type="password" placeholder="password..." v-model="password" />
            <br><br>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from '../components//Navbar.vue'
import auth from '../firebaseDb'

export default {
    name: 'Login',
    components: {
        Navbar
    },
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
            .then(() => {
                    localStorage.setItem("log_user", JSON.stringify(this.email))
                    this.$router.push('/subscriptionsList');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>
