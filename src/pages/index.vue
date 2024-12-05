<template>
  <v-container>
    <v-row class="flex justify-center">
      <v-col cols="12" md="12">
        <v-card class="mt-10 w-full">
          <v-card-title class="d-flex justify-space-between px-3 py-5">
            <span class="text-h5">Listado de hoteles</span>
            <v-btn
              class="text-capitalize mx-1"
              color="success"
              @click="openDialog"
            >
              <v-icon>mdi-plus</v-icon>
              Nuevo
            </v-btn>
          </v-card-title>

          <v-divider />

          <v-card-title class="d-flex align-center">
            <v-col class="pa-0" cols="4">
              <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="solo-filled"
                flat
                hide-details
                single-line
                clearable
              />
            </v-col>
          </v-card-title>

          <v-divider />

          <v-data-table
            :headers="headers"
            :items="hotelList.data"
            :search="search"
            :loading="hotelList.loading"
            item-key="nit"
            class="elevation-1"
          >
            <template #item.actions="{ item }">
              <div class="d-flex justify-center">
                <v-btn
                  class="text-capitalize mx-1"
                  color="primary"
                  size="small"
                  @click="viewHotel(item)"
                >
                  <v-icon>mdi-eye</v-icon>
                  Ver detalles
                </v-btn>
                <v-btn
                  class="text-capitalize mx-1"
                  color="error"
                  size="small"
                  @click="validateDeleteHotel(item)"
                >
                  <v-icon>mdi-delete</v-icon>
                  Eliminar
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" max-width="800">
      <v-card>
        <v-card-title class="headline ml-2">
          {{ formHotel.id ? 'Editar' : 'Crear' }} un hotel
        </v-card-title>

        <v-divider />

        <v-card-text>
          <pre>formHotel: {{ formHotel }}</pre>
          <pre>validateForm: {{ validateForm }}</pre>
          <v-form v-model="validateForm" @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formHotel.nit"
                  label="Nit"
                  :rules="requiredRule"
                />
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="formHotel.name"
                  label="Nombre del hotel"
                  :rules="requiredRule"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formHotel.address"
                  label="Dirección"
                  :rules="requiredRule"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formHotel.city"
                  label="Ciudad"
                  :rules="requiredRule"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formHotel.max_rooms"
                  label="Habitaciones máximas"
                  type="number"
                  :rules="requiredRule"
                />
              </v-col>
            </v-row>

            <v-row class="px-3 mt-6">
              <v-spacer />
              <v-btn
                class="mr-3 text-capitalize"
                color="error"
                @click="closeDialog"
              >
                <v-icon>mdi-close</v-icon>
                Cancelar
              </v-btn>
              <v-btn
                class="text-capitalize"
                color="success"
                type="submit"
                :loading="saving"
                :disabled="saving"
              >
                <v-icon>mdi-check</v-icon>
                Guardar cambios
              </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { createHotel, getHotels, deleteHotel } from '@/services/hotelService';
import { alertSuccess } from '@/utils/alertUtil';

const router = useRouter();

const search = ref('');
const showDialog = ref(false);
const saving = ref(false);
const hotelList = reactive({ data: [], loading: false });
const validateForm = ref(false);
const FORM_DEFAULT = {
  nit: null,
  name: null,
  address: null,
  city: null,
  max_rooms: null,
};
const formHotel = reactive({ ...FORM_DEFAULT });
const requiredRule = ref([
  (v) => !!v || 'Campo requerido',
  (v) => (v && v.length >= 1) || 'Mínimo 1 caracter',
]);
const headers = ref([
  { title: 'Nit', value: 'nit', sortable: true },
  { title: 'Hotel', value: 'name', sortable: true },
  { title: 'Dirección', value: 'address', sortable: false },
  { title: 'Ciudad', value: 'city', sortable: true },
  {
    title: 'Habitaciones máximas',
    value: 'max_rooms',
    align: 'center',
    sortable: true,
  },
  { title: 'Acciones', value: 'actions', align: 'center', sortable: false },
]);

onMounted(async () => {
  await fetchHotels();
});

const fetchHotels = async () => {
  try {
    hotelList.loading = true;
    hotelList.data = await getHotels();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    hotelList.loading = false;
  }
};

const openDialog = () => {
  clearForm();
  showDialog.value = true;
};

const submitForm = async () => {
  if (!validateForm.value) {
    return;
  }
  saving.value = true;
  const response = await createHotel(formHotel);
  saving.value = false;
  closeDialog();
  if (!response) {
    return;
  }
  await fetchHotels();
  alertSuccess('Hotel creado correctamente');
};

const validateDeleteHotel = async (item) => {
  const response = await deleteHotel(item.id);
  if (!response) {
    return;
  }
  await fetchHotels();
  alertSuccess('Hotel eliminado correctamente');
};

const clearForm = () => {
  Object.assign(formHotel, FORM_DEFAULT);
  validateForm.value = false;
};

const closeDialog = () => {
  showDialog.value = false;
};

const viewHotel = (item) => {
  router.push(`/details/${item.id}`);
};
</script>

<style scoped>
.swal2-custom-zindex {
  z-index: 9000 !important; /* Ajusta el valor según sea necesario */
}
</style>
