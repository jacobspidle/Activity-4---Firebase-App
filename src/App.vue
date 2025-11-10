<template>
  <div id="app">
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  color: #2c3e50;
  background: #f7f9fb;
  min-height: 100vh;
}

/* padding for page content */
main {
  padding: 2rem 1rem;
  max-width: 1100px;
  margin: 0 auto;
}
</style>
