<template>
    <div class="app">
        <Navbar />
        <form @submit.prevent="register">
            <h2>Register</h2>
            <br>
            <label for="email">Username:</label>
            <input type="email" id="email" placeholder="Email address..." v-model="email" />
            <br><br>
            <label for="pw">Password:</label>
            <input id="pw" type="password" placeholder="password..." v-model="password" />
            <br><br>
            <div class="form-group">
                <button type="submit">Register</button>
                <button @click="cancelOperation">Back to Login</button>
            </div>

        </form>
    </div>
</template>
<script>
import { createUserWithEmailAndPassword } from "firebase/auth";
import Navbar from '../components//Navbar.vue'
import auth from '../firebaseDb'

export default {
    name: 'Register',
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
        register() {
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    alert('Successfully registered! Please login.');
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
        cancelOperation() {
            this.$router.push('/')
        },
    },
};
</script>
