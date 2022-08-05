<template>
  <div id="app">
    <nav>
      <router-link to="/spellbook">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/vue">About Vue</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding-top: 20px;
  padding-bottom: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;
    padding: 0.5em;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
