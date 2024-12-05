<template>
  <v-container>
    <v-row class="flex justify-center">
      <v-col cols="12" md="12">
        <v-card class="mt-10 w-full">
          <v-card-title class="d-flex px-3 py-5">
            <v-btn class="text-capitalize mx-1" color="info" @click="goBack">
              <v-icon>mdi-arrow-left</v-icon>
              Volver
            </v-btn>
            <span class="text-h5 ml-4">Detalles del hotel</span>
          </v-card-title>

          <v-divider />

          <v-card-text>
            <v-row>
              <v-col cols="12" md="2">
                <v-card-title class="text-h6">Nit</v-card-title>
                <v-card-text>{{ hotelData.nit }}</v-card-text>
              </v-col>
              <v-col cols="12" md="3">
                <v-card-title class="text-h6">Hotel</v-card-title>
                <v-card-text>{{ hotelData.name }}</v-card-text>
              </v-col>
              <v-col cols="12" md="3">
                <v-card-title class="text-h6">Dirección</v-card-title>
                <v-card-text>{{ hotelData.address }}</v-card-text>
              </v-col>
              <v-col cols="12" md="3">
                <v-card-title class="text-h6">Ciudad</v-card-title>
                <v-card-text>{{ hotelData.city }}</v-card-text>
              </v-col>
              <v-col cols="12" md="3">
                <v-card-title class="text-h6">
                  Habitaciones máximas
                </v-card-title>
                <v-card-text>{{ hotelData.max_rooms }}</v-card-text>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-text class="pa-0">
            <v-col cols="12" md="12" class="pa-4">
              <v-card class="w-full">
                <v-card-title class="d-flex justify-space-between px-3">
                  <span class="text-h5">Tipos de habitaciones</span>

                  <v-btn
                    class="text-capitalize mx-1"
                    color="success"
                    @click="openDialog"
                  >
                    <v-icon>mdi-plus</v-icon>
                    Crear tipo
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
                  :items="hotelData.rooms"
                  :search="search"
                  :loading="loadingData"
                >
                  <template #item.actions="{ item }">
                    <div class="d-flex justify-center">
                      <v-btn
                        class="text-capitalize mx-1"
                        color="error"
                        size="small"
                        @click="validateDeleteRoom(item)"
                      >
                        <v-icon>mdi-delete</v-icon>
                        Eliminar
                      </v-btn>
                    </div>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" max-width="800">
      <v-card>
        <v-card-title class="headline ml-2">
          Crear un tipo de habitación
        </v-card-title>

        <v-divider />

        <v-card-text>
          <pre>formRoom: {{ formRoom }}</pre>
          <pre>validateForm: {{ validateForm }}</pre>
          <v-form v-model="validateForm" @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="formRoom.quantity"
                  label="Cantidad"
                  :rules="requiredRule"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="formRoom.type"
                  :items="['Estándar', 'Junior', 'Doble']"
                  label="Tipo de habitación"
                  :rules="requiredRule"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="formRoom.accommodation"
                  :items="['Sencilla', 'Doble', 'Triple', 'Cuádruple']"
                  label="Acomodación"
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
import { useRoute, useRouter } from 'vue-router';

import { getHotelById } from '@/services/hotelService';
import { createRoom, deleteRoom } from '@/services/roomService';
import { alertSuccess } from '@/utils/alertUtil';

const route = useRoute();
const router = useRouter();

const hotelId = ref(route.params.id);
const showDialog = ref(false);
const validateForm = ref(false);
const search = ref('');
const loadingData = ref(false);
const DEFAULT_DATA = {
  nit: null,
  name: null,
  address: null,
  city: null,
  max_rooms: null,
  rooms: [],
};
const hotelData = reactive({ ...DEFAULT_DATA });

const DEFAULT_FORM_ROOM = {
  quantity: null,
  type: null,
  accommodation: null,
};
const formRoom = reactive({ ...DEFAULT_FORM_ROOM });
const saving = ref(false);
const requiredRule = ref([
  (v) => !!v || 'Campo requerido',
  (v) => (v && v.length >= 1) || 'Mínimo 1 caracter',
]);

onMounted(() => {
  fetchHotelById();
});

const fetchHotelById = async () => {
  loadingData.value = true;
  const response = await getHotelById(hotelId.value);
  if (!response) {
    return;
  }
  hotelData.nit = response.nit;
  hotelData.name = response.name;
  hotelData.address = response.address;
  hotelData.city = response.city;
  hotelData.max_rooms = response.max_rooms;
  hotelData.rooms = response.rooms;
  loadingData.value = false;
};

const goBack = () => router.push('/');

const headers = ref([
  { title: 'Id', value: 'id', align: 'center' },
  { title: 'Cantidad', value: 'quantity', align: 'center' },
  { title: 'Tipo', value: 'type' },
  { title: 'Acomodación', value: 'accommodation' },
  { title: 'Acciones', value: 'actions', align: 'center' },
]);

const openDialog = () => {
  showDialog.value = true;
  clearForm();
};

const closeDialog = () => {
  showDialog.value = false;
  clearForm();
};

const clearForm = () => {
  Object.assign(formRoom, DEFAULT_FORM_ROOM);
};

const submitForm = async () => {
  if (!validateForm.value) {
    return;
  }
  saving.value = true;
  const response = await createRoom(hotelId.value, formRoom);
  saving.value = false;
  closeDialog();
  if (!response) {
    return;
  }
  await fetchHotelById();
  alertSuccess('Tipo de habitación creado correctamente');
};

const validateDeleteRoom = async (item) => {
  const response = await deleteRoom(item.id);
  if (!response) {
    return;
  }
  await fetchHotelById();
  alertSuccess('Tipo de habitación eliminada correctamente');
};
</script>

<style scoped>
.swal2-custom-zindex {
  z-index: 2000 !important; /* Ajusta el valor según sea necesario */
}
</style>
