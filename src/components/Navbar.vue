<template>
  <nav class="navbar navbar-expand-lg">
    <span class="navbar-brand">Subscriptions</span>

    <ul class="nav justify-content-center">
      <li class="nav-item" v-if="!loggedIn">
        <a class="nav-link" @click="register">Register</a>
      </li>
      <li class="nav-item" v-else>
        <a class="nav-link" @click="logout">Logout</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "Navbar",
  data() {
    return {
      loggedIn: false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.loggedIn = !!user;
    });
  },
  methods: {
    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        this.$router.push("/");
      } catch (err) {
        alert(err.message);
        this.$router.push("/");
      }
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
* { box-sizing: border-box; }

/* Navbar styling */
.navbar {
  background: #22313f;
  padding: 0.75rem 1rem;
  border-radius: 14px;
  margin-bottom: 1.25rem;
}

.navbar-brand {
  color: #42B883;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.nav-link {
  color: #e9eef3;
  margin-left: 0.75rem;
  cursor: pointer;
}

.nav-link:hover { text-decoration: underline; }
</style>
