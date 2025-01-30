<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list dense>
        <v-list-item @click="showClienteCuentasCMV">
          <v-list-item-content>
            <v-list-item-title>Cuentas Clientes CMV</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="showClientesCMV">
          <v-list-item-content>
            <v-list-item-title>Edición de Clientes CMV</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Gestión de Clientes CMV</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <div :key="currentView">
            <ClienteCuentasCMV v-if="currentView === 'cuentas'" />
            <ClientesCMV v-if="currentView === 'clientes'" />
          </div>
        </transition>

        <v-btn
          v-if="currentView === 'cuentas'"
          @click="showClientesCMV"
          color="primary"
          class="mt-4"
          elevation="2"
          block
        >
          Ir a Edición
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ClienteCuentasCMV from './components/ClienteCuentasCMV.vue';
import ClientesCMV from './components/ClientesCMV.vue';

export default {
  name: 'App',
  components: {
    ClienteCuentasCMV,
    ClientesCMV,
  },
  data() {
    return {
      drawer: false,         
      currentView: 'cuentas', 
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    showClienteCuentasCMV() {
      this.currentView = 'cuentas'; 
    },
    showClientesCMV() {
      this.currentView = 'clientes'; 
    }
  }
};
</script>

<style scoped>
.v-navigation-drawer {
  width: 250px;
}

.v-btn {
  max-width: 200px;
  margin: 0 auto;
}

.v-main {
  padding: 20px;
}

.v-container {
  max-width: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
