<template>
    <v-container class="pa-4">
      <!-- Buscador -->
      <v-row class="mb-4">
        <v-col cols="auto">
          <v-text-field
            v-model="search"
            label="Buscar"
            append-icon="mdi-magnify"
            single-line
            hide-details
            class="mr-16"
            outlined
            dense
            style="width: 100%;"
          />
        </v-col>
      </v-row>
  
      <!-- Data Table -->
      <v-data-table
        :headers="headers"
        :items="clientes"
        item-key="id_Cliente"
        :search="search"
        class="elevation-2"
        :items-per-page="5"
        rounded
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id_Cliente }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.tipoCuenta }}</td>
            <td>{{ item.rfc }}</td>
            <td>{{ item.curp }}</td>
            <td>{{ formatDate(item.registro) }}</td>
            <td>{{ formatSaldo(item.saldo) }}</td>
            <td>{{ formatDate(item.contratacion) }}</td>
            <td>{{ formatDate(item.ultimoMovimiento) }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  import axios from '@/plugins/axios';
  
  export default {
    name: 'ClientesDataTable',
    data() {
      return {
        search: "",
        clientes: [], // Lista de clientes que se obtendrá del backend
        headers: [
          { text: "ID Cliente", align: "center", value: "id_Cliente" },
          { text: "Nombre", align: "center", value: "nombre" },
          { text: "Tipo de Cuenta", align: "center", value: "tipoCuenta" },
          { text: "RFC", align: "center", value: "rfc" },
          { text: "CURP", align: "center", value: "curp" },
          { text: "Fecha de Registro", align: "center", value: "registro" },
          { text: "Saldo", align: "center", value: "saldo" },
          { text: "Fecha de Contratación", align: "center", value: "contratacion" },
          { text: "Último Movimiento", align: "center", value: "ultimoMovimiento" },
        ],
      };
    },
    created() {
      this.obtenerClientes();
    },
    methods: {
      async obtenerClientes() {
        try {
          const response = await axios.get('/CMV/ClienteCuentas'); // Cambia esta ruta por la correcta
          this.clientes = response.data.response; // Asume que la respuesta tiene el formato esperado
        } catch (error) {
          console.error("Error al obtener los clientes:", error);
        }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString(); // Formatea la fecha a formato local
      },
      formatSaldo(saldo) {
        // Verifica si el saldo es un número y es válido
        return saldo && !isNaN(saldo) ? saldo.toFixed(2) : '0.00';
      },
    },
  };
  </script>
  
  <style scoped>
  .v-data-table {
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .v-btn {
    transition: transform 0.2s ease;
  }
  
  .v-btn:hover {
    transform: scale(1.05);
  }
  
  .v-text-field {
    margin-bottom: 1rem;
  }
  
  .v-row {
    margin-top: 1rem;
  }
  
  .v-data-table th,
  .v-data-table td {
    text-align: center;
  }
  </style>
  