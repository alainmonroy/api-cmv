<template>
  <v-app>
    <v-main>
      <ClientesCMV/>
    </v-main>
  </v-app>
</template>

<script>
import ClientesCMV from './components/ClientesCMV.vue'

export default {
  name: 'App',

  components: {
    ClientesCMV,
  },

  data: () => ({
    //
  }),
}
</script>
