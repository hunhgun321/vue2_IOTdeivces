<template>
  <div id="area">
    This is area view
    <button @click="show_store">See the store state</button>
    
  </div>
</template>

<script>
export default {
  name: "Area",
  data() {
    return {
      
    };
  },
  computed: {
    
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
  },
};
</script>
