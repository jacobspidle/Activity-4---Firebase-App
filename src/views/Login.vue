<template>
  <div class="app">
    <Navbar />
    <form @submit.prevent="login">
      <h2>Login</h2>
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

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Login",
  components: { Navbar },

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      const auth = getAuth();   // ✅ Correct auth instance

      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          localStorage.setItem("log_user", JSON.stringify(this.email));
          this.$router.push("/subscriptionsList");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
