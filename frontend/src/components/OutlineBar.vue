<template>
<div id="area">
  <v-app-bar app color="primary" dark>
    <!--
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </div>
    -->
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-spacer></v-spacer>
    <v-btn
      text
      class="text-none"
    >
      <span class="h1 mr-2">{{$store.state.username}}</span>
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-app-bar>
   <v-navigation-drawer
      v-model="drawer"
      fixed
      bottom
      temporary
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
      <v-list
        
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
          class="my_drawer_class"
        >
          <v-list-item>
            <v-list-item-title><h1>Users</h1></v-list-item-title>
          </v-list-item>

          <v-list-item @click="to_area">
            <v-list-item-title ><h1>Area</h1></v-list-item-title>
          </v-list-item>
        
          <v-list-item @click="to_device">
            <v-list-item-title ><h1>Devices</h1></v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title><h1>Report</h1></v-list-item-title>
          </v-list-item>

          <v-list-item v-if="$store.state.identity == 'superadmin'">
            <v-list-item-title>School</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

  <h5> This is a page for area</h5>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: "OutlineBar",
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  methods: {
    to_area(){
      this.$router.push({ path: `/${this.$store.state.identity}/area`})
    },
    to_device(){
      this.$router.push({ path: `/${this.$store.state.identity}/devices` })
    }
  },
  watch: {
      group () {
        this.drawer = false
      },
    },
  
};
</script>

<style scoped>

</style>