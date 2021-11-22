<template>
  <div id="device">
    This is device view
    <button @click="show_store">See the store state</button>
    <v-data-table
      :headers="headers"
      :items="devices"
      sort-by="calories"
      class="elevation-1"
      :search="search"
    >
      <!-- it has defined all necessary info for the table :item for data, :header for column, sort-by for (default) sorting (ascending) the table according to which column when no sorting is defined -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Device Management</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <!-- this is the pop out form 'v-dialog' -->
            <template v-slot:activator="{ on, attrs }">
              <!-- this is for what to trigger the pop out form -->
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                <!--这是把v-menu组件里面的获取到的属性集合attrs(相当于props对象)和事件集合on(相当于事件对象)传入到了v-btn组件中。该语法将一个或多个属性和一个或多个事件绑定到该元素比如，把按钮(v-btn)的点击事件处理绑定到了v-menu上，所以可通过点击按钮(v-btn)然后达到弹出菜单的效果 -->
                New Item
              </v-btn>
            </template>
            <v-card>
              <!-- it is for what is inside the pop out form-->
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Device name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.area"
                        label="Area"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.online"
                        label="Online"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.disabled"
                        label="Disabled"
                      ></v-text-field>
                    </v-col>
                    
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <!-- this pop out form is triggered by a variable state 'dialogDelete' -->
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this device?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-toolbar flat>
          <!-- create a second row on top-->
          <v-text-field
            v-model="search"
            label="Search "
            class="mx-4"
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:item.online="{ item }">
        <!-- bind to 'online' column-->

        <v-icon v-if="item.online" class="self_made_green_circle">
          mdi-circle
        </v-icon>
        <v-icon v-else class="self_made_red_circle"> mdi-circle </v-icon>
      </template>

      <template v-slot:item.disabled="{ item }">
        <!-- bind to 'online' column-->

        <v-icon v-if="item.disabled" class="self_made_green_circle">
          mdi-circle
        </v-icon>
        <v-icon v-else class="self_made_red_circle"> mdi-circle </v-icon>
      </template>

      <template v-slot:item.actions="{ item }">
        <!-- bind to the 'actions' column in header -->
        <!--
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        -->
        <v-btn class="ma-2" outlined color="indigo" @click="editItem(item)">
          Edit
        </v-btn>
        <v-btn color="error" @click="deleteItem(item)"> Delete </v-btn>

        <!-- this is the delete button -->
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Device name",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Area", value: "area" },
      { text: "Online", value: "online" },
      { text: "Disabled", value: "disabled" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    devices: [],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    show_store() {
      console.log(
        "store has \n",
        this.$store.state.username,
        " and ",
        this.$store.state.identity
      );
    },
    initialize() {
      (this.devices = [
        {
          name: "Fan",
          area: "Area 01",
          disabled: false,
          online: true,
        },
        {
          name: "Fan",
          area: "Area 01",
          disabled: false,
          online: true,
        },
        {
          name: "Fan",
          area: "Area 01",
          disabled: false,
          online: true,
        },
        {
          name: "Fan",
          area: "Area 01",
          disabled: false,
          online: true,
        },
        {
          name: "Fan",
          area: "Area 01",
          disabled: false,
          online: true,
        },
        {
          name: "Fan",
          area: "Area 01",
          disabled: false,
          online: true,
        },
        {
          name: "Fan",
          area: "Area 01",
          disabled: true,
          online: true,
        },
        {
          name: "Fan",
          area: "Area 01",
          disabled: false,
          online: true,
        },
        {
          name: "Fan",
          area: "Area 01",
          disabled: false,
          online: true,
        },
        {
          name: "Light",
          area: "Area 02",
          disabled: false,
          online: true,
        },
        {
          name: "Light",
          area: "Area 02",
          disabled: false,
          online: true,
        },
        {
          name: "Light",
          area: "Area 02",
          disabled: false,
          online: true,
        },
        {
          name: "Light",
          area: "Area 02",
          disabled: false,
          online: true,
        },
        {
          name: "Light",
          area: "Area 02",
          disabled: false,
          online: true,
        },
        {
          name: "Light",
          area: "Area 02",
          disabled: false,
          online: true,
        },
        {
          name: "Light",
          area: "Area 02",
          disabled: false,
          online: true,
        },
        {
          name: "Light",
          area: "Area 02",
          disabled: false,
          online: false,
        },
        {
          name: "Light",
          area: "Area 02",
          disabled: false,
          online: true,
        },
        {
          name: "Air conditioner",
          area: "Area 03",
          disabled: false,
          online: true,
        },
        {
          name: "Air conditioner",
          area: "Area 03",
          disabled: false,
          online: true,
        },
        {
          name: "Air conditioner",
          area: "Area 03",
          disabled: false,
          online: true,
        },
        {
          name: "Air conditioner",
          area: "Area 03",
          disabled: false,
          online: true,
        },
        {
          name: "Air conditioner",
          area: "Area 03",
          disabled: false,
          online: true,
        },
        {
          name: "Air conditioner",
          area: "Area 03",
          disabled: false,
          online: true,
        },
        {
          name: "Air conditioner",
          area: "Area 03",
          disabled: false,
          online: true,
        },
        {
          name: "Air conditioner",
          area: "Area 03",
          disabled: false,
          online: true,
        },
      ]),
        (this.desserts = [
          {
            name: "Frozen Yogurt",
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
          },
          {
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
          },
          {
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
          },
          {
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
          },
          {
            name: "Gingerbread",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
          },
          {
            name: "Jelly bean",
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
          },
          {
            name: "Lollipop",
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
          },
          {
            name: "Honeycomb",
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
          },
          {
            name: "Donut",
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
          },
          {
            name: "KitKat",
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
          },
        ]);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      console.log(`The item is \n${JSON.stringify(item)}`);
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style scoped>
.self_made_green_circle {
  color: greenyellow;
}

.self_made_red_circle {
  color: red;
}
</style>
