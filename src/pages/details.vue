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
            <span class="text-h5 ml-4">Detalles {{ hotelId }}</span>
          </v-card-title>

          <v-divider />

          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-card-title class="text-h6">Nombre</v-card-title>
                <v-card-text>{{ hotelData.name }}</v-card-text>
              </v-col>
              <v-col cols="12" md="4">
                <v-card-title class="text-h6">Dirección</v-card-title>
                <v-card-text>{{ hotelData.address }}</v-card-text>
              </v-col>
              <v-col cols="12" md="4">
                <v-card-title class="text-h6">Teléfono</v-card-title>
                <v-card-text>{{ hotelData.phone }}</v-card-text>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <v-card-text class="pa-0">
            <v-col cols="12" md="12" class="pa-1">
              <v-card class="w-full">
                <v-card-title class="d-flex justify-space-between px-3">
                  <span class="text-h5">Tipos de algo</span>
                  <v-btn class="text-capitalize mx-1" color="success">
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
                />
              </v-card>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const hotelId = ref(route.params.id);
const search = ref('');

onMounted(() => {
  console.log('hotelId', hotelId.value);
});

const goBack = () => router.push('/');

const headers = ref([
  { title: 'ID', value: 'id' },
  { title: 'Nombre', value: 'name' },
  { title: 'Precio', value: 'price' },
]);
const hotelData = {
  id: 1,
  name: 'Hotel 1',
  address: 'Calle 1',
  phone: '123456789',
  rooms: [
    { id: 1, name: 'Habitación 1', price: 100 },
    { id: 2, name: 'Habitación 2', price: 200 },
  ],
};
</script>
