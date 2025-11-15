<template>
  <div class="app">
    <Navbar />
    <form @submit.prevent="register">
      <h2>Register</h2>
      <br>

      <label for="email">Email:</label>
      <input 
        type="email" 
        id="email" 
        placeholder="Email address..." 
        v-model="email" 
        required
      />
      <br><br>

      <label for="pw">Password:</label>
      <input 
        id="pw" 
        type="password" 
        placeholder="Password..." 
        v-model="password"
        required
      />
      <br><br>

      <div class="form-group">
        <button type="submit">Register</button>
        <button type="button" @click="cancelOperation">Back to Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Register",
  components: { Navbar },

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    register() {
      const auth = getAuth();   // ✅ FIXED — get real auth instance

      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          alert("Successfully registered! Please login.");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    cancelOperation() {
      this.$router.push("/");
    },
  },
};
</script>
