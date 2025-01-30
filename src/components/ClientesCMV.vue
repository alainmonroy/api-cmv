<template>
  <v-container class="pa-4">
    <v-row align="center" class="mb-4">
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
          style="width: 100%;" />
      </v-col>

      <v-col cols="auto">
        <v-btn
          @click="toggleNuevoCliente"
          color="primary"
          elevation="2"
          round
          small>
          Agregar Cliente
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          @click="toggleEditarCliente"
          color="warning"
          :disabled="!selectedClients.length"
          elevation="2"
          round
          small>
          Editar Cliente
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          @click="eliminarCliente"
          color="error"
          :disabled="!selectedClients.length"
          elevation="2"
          round
          small>
          Eliminar Cliente
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="clientes"
      item-key="id_Cliente"
      :search="search"
      v-model:select-all="selectAll"
      class="mt-4"
      :items-per-page="itemsPerPage"
      elevation="2"
      rounded
      item-value="id_Cliente">
      <template v-slot:item="{ item }">
        <tr>
          <td>
            <v-checkbox
              v-model="selectedClients"
              :value="item.id_Cliente"
              color="primary"
              hide-details/>
          </td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.apellido_Paterno }}</td>
          <td>{{ item.apellido_Materno }}</td>
          <td>{{ item.rfc }}</td>
          <td>{{ item.curp }}</td>
          <td>{{ formatDate(item.fecha_Alta) }}</td>
        </tr>
      </template>
    </v-data-table>

    <v-row
      v-if="nuevoClienteVisible"
      class="mt-4"
      v-show="nuevoClienteVisible"
      transition="fade">
      <v-col cols="12" md="6">
        <v-text-field v-model="nuevoCliente.nombre" label="Nombre" required outlined />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="nuevoCliente.apellido_Paterno" label="Apellido Paterno" required outlined />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="nuevoCliente.apellido_Materno" label="Apellido Materno" required outlined />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="nuevoCliente.rfc" label="RFC" required outlined />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="nuevoCliente.curp" label="CURP" required outlined />
      </v-col>
      <v-col cols="12" md="6">
        <v-select v-model="nuevoCliente.NombreCuenta" :items=tiposCuenta label="Tipo de Cuenta" required outlined/>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="nuevoCliente.saldo" label="Saldo" type="number" required outlined />
      </v-col>

      <v-col cols="12">
        <v-btn
          @click="agregarCliente"
          color="success"
          class="mr-4"
          elevation="2"
          rounded>
          Guardar Cliente
        </v-btn>
        <v-btn @click="cancelarNuevoCliente" color="secondary" elevation="2" rounded>
          Cancelar
        </v-btn>
      </v-col>
    </v-row>

    <v-row
      v-if="editarClienteVisible"
      class="mt-4"
      v-show="editarClienteVisible"
      transition="fade">
      <v-col cols="12" md="6">
        <v-text-field v-model="clienteEdicion.nombre" label="Nombre" required outlined />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="clienteEdicion.apellido_Paterno" label="Apellido Paterno" required outlined />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="clienteEdicion.apellido_Materno" label="Apellido Materno" required outlined />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="clienteEdicion.rfc" label="RFC" required outlined />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="clienteEdicion.curp" label="CURP" required outlined />
      </v-col>
      <v-col cols="12" md="6">
        <v-select v-model="clienteEdicion.NombreCuenta" :items=tiposCuenta label="Tipo de Cuenta" required outlined/>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="clienteEdicion.saldo" label="Saldo" type="number" required outlined />
      </v-col>
      <v-col cols="12">
        <v-btn
          @click="actualizarCliente"
          color="success"
          class="mr-4"
          elevation="2"
          rounded>
          Actualizar Cliente
        </v-btn>
        <v-btn @click="cancelarEdicion" color="secondary" elevation="2" rounded>
          Cancelar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  name: 'ClientesCMV', 
  data() {
    return {
      search: "",
      clientes: [],
      selectedClients: [],
      selectAll: false,
      indeterminate: false,
      itemsPerPage: 5,
      nuevoClienteVisible: false,
      editarClienteVisible: false,
      tiposCuenta: [  
        'CrediProntoCMV',
        'PersonalCMV',
        'AbicuentaCMV'
    ],
      nuevoCliente: {
        nombre: '',
        apellido_Paterno: '',
        apellido_Materno: '',
        rfc: '',
        curp: '',
        NombreCuenta: '',
        saldo: ''
      },
      clienteEdicion: {
        id: null,
        nombre: '',
        apellido_Paterno: '',
        apellido_Materno: '',
        rfc: '',
        curp: '',
        NombreCliente: '',
        saldo: ''
      },
      headers: [
        { text: "Seleccionar", align: "start", value: "select", class: "gray" },
        { text: "Nombre", align: "center", value: "nombre", class: "gray" },
        { text: "Apellido Paterno", align: "center", value: "apellido_Paterno", class: "gray" },
        { text: "Apellido Materno", align: "center", value: "apellido_Materno", class: "gray" },
        { text: "RFC", value: "rfc", align: "center", class: "gray" },
        { text: "CURP", value: "curp", align: "center", class: "gray" },
        { text: "Fecha de Alta", align: "center", value: "fecha_Alta", class: "gray" },
      ],
    };
  },
  created() {
    this.obtenerClientes();
  },
  methods: {
    async obtenerClientes() {
      try {
        const response = await axios.get('/CMV/Lista');
        this.clientes = response.data.response;       
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    toggleNuevoCliente() {
      this.nuevoClienteVisible = !this.nuevoClienteVisible;
    },
    toggleEditarCliente() {
      if (this.selectedClients.length === 1) {
        const clientId = this.selectedClients[0];
        const client = this.clientes.find(c => c.id_Cliente === clientId);
        this.clienteEdicion = { ...client };
        this.editarClienteVisible = true;
      } else {
        alert("Por favor, seleccione un solo cliente para editar.");
      }
    },
    async agregarCliente() {  
      try {        
        await axios.post('/CMV/InsertarCliente', this.nuevoCliente);
        this.obtenerClientes();
        this.cancelarNuevoCliente();
        alert("Se añadió un cliente nuevo");
      } catch (error) {
        alert("Error al añadir el cliente")
      }
    },
    async actualizarCliente() {
      try {
        await axios.put(`/CMV/EditarCliente`, this.clienteEdicion);
        this.obtenerClientes();
        this.cancelarEdicion();
        alert("Cliente actualizado correctamente");
      } catch (error) {
        alert("Error al editar el cliente");
      }
    },
    async eliminarCliente() {
      const confirmDelete = confirm("¿Está seguro de que desea eliminar este cliente?");
      if (confirmDelete) {
        try {
          for (const clientId of this.selectedClients) {
            await axios.delete(`/CMV/BorrarCliente?idCliente=${clientId}`);
          }
          this.obtenerClientes();
          alert("Cliente(s) eliminado(s) correctamente.");
        } catch (error) {
          alert("Error al eliminar al cliente");
        }
      }
    },
    cancelarNuevoCliente() {
      this.nuevoClienteVisible = false;
      this.nuevoCliente = { nombre: '', apellido_Paterno: '', apellido_Materno: '', rfc: '', curp: '' };
    },
    cancelarEdicion() {
      this.editarClienteVisible = false;
      this.clienteEdicion = { id: null, nombre: '', apellido_Paterno: '', apellido_Materno: '', rfc: '', curp: '' };
    },
  }
};
</script>

<style scoped>
.v-data-table {
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
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
</style>
