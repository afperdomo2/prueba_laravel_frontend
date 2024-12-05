<template>
  <v-container>
    <v-row class="flex justify-center">
      <v-col cols="12" md="12">
        <v-card class="mt-10 w-full">
          <v-card-title class="d-flex justify-space-between px-3 py-5">
            <span class="text-h5">Listado de elementos</span>
            <v-btn
              class="text-capitalize mx-1"
              color="success"
              @click="openDialog(null)"
            >
              <v-icon>mdi-plus</v-icon>
              Crear nuevo
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

          <pre>showDialog: {{ showDialog }}</pre>

          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            item-key="name"
            class="elevation-1"
          >
            <template #item.options="{ item }">
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
                  color="success"
                  size="small"
                  @click="openDialog(item)"
                >
                  <v-icon>mdi-pencil</v-icon>
                  Editar
                </v-btn>
                <v-btn
                  class="text-capitalize mx-1"
                  color="error"
                  size="small"
                  @click="deleteHotel(item)"
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

    <v-dialog v-model="showDialog" max-width="500">
      <v-card>
        <v-card-title class="headline ml-2">
          {{ formHotel.id ? 'Editar' : 'Crear' }} elemento
        </v-card-title>

        <v-divider />

        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="formHotel.name"
                  label="Name"
                  :rules="rules"
                />
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  v-model="formHotel.price"
                  label="Price"
                  :rules="rules"
                />
              </v-col>
            </v-row>

            <v-row class="px-3">
              <v-spacer />
              <v-btn
                class="mr-3 text-capitalize"
                color="error"
                @click="closeDialog"
              >
                <v-icon>mdi-close</v-icon>
                Cancelar
              </v-btn>
              <v-btn class="text-capitalize" color="success" type="submit">
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

const router = useRouter();

const search = ref('');

const showDialog = ref(false);

const formHotel = reactive({
  id: null,
  name: '',
  price: '',
});

const rules = ref([
  (v) => !!v || 'Campo requerido',
  (v) => (v && v.length >= 3) || 'Mínimo 3 caracteres',
]);

onMounted(() => {
  console.log('onMounted');
});

const openDialog = (item = null) => {
  console.log('🚀item:', item);
  clearForm();
  showDialog.value = true;
  if (!item) {
    return;
  }
  formHotel.id = item.id;
  formHotel.name = 'Hotel galactic';
  formHotel.price = '123123';
};

const submitForm = () => {
  if (!formHotel.name || !formHotel.price) {
    return;
  }
  clearForm();
  closeDialog();
};

const clearForm = () => {
  formHotel.id = null;
  formHotel.name = '';
  formHotel.price = '';
};

const closeDialog = () => {
  showDialog.value = false;
};

const viewHotel = (item) => {
  router.push(`/details/${item.id}`);
};

const deleteHotel = (item) => {
  console.log('delete', item);
};

const headers = ref([
  {
    title: 'Dessert (100g serving)',
    align: 'start',
    sortable: false,
    value: 'name',
  },
  { title: 'Calories', value: 'calories' },
  { title: 'Fat (g)', value: 'fat' },
  { title: 'Carbs (g)', value: 'carbs' },
  { title: 'Protein (g)', value: 'protein' },
  { title: 'Iron (%)', value: 'iron' },
  { title: 'Options', value: 'options', align: 'center' },
]);
const items = ref([
  {
    id: 1,
    name: 'Frozen Yogurt',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%',
  },
  {
    id: 2,
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%',
  },
  {
    id: 3,
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%',
  },
  {
    id: 4,
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%',
  },
  {
    id: 5,
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16%',
  },
  {
    id: 6,
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0%',
  },
  {
    id: 7,
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%',
  },
  {
    id: 8,
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45%',
  },
  {
    id: 9,
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22%',
  },
  {
    id: 10,
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6%',
  },
  {
    id: 11,
    name: 'Chocolate',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6%',
  },
]);
</script>
