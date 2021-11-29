<template>
  <div id="area">
    This is area view
    <button @click="show_store">See the store state</button>
    <div>
      -->
      <select v-model="type" class="type">
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Date">Date</option>
      </select>
      <input :type="which_type()" class="type" v-model="input_data" />
    </div>
    <div>
      type is {{ typeof type }} with value {{ type }} and input type
      <span style="color: red">!!!{{ typeof input_data }}!!!</span> with value
      {{ input_data }}
    </div>
    <char-bar :chart-data="chartdata"></char-bar>
  </div>
</template>

<script>
import CharBar from "../components/Char.vue";

export default {
  name: "Area",
  components: {
    CharBar,
  },
  data() {
    return {
      backgroundColors: ['#7FFFD4','#FF8C00','#FFD700','#ADFF2F'],
      //this part is what passing in==============
      chartdata: {
        labels: ["January", "February"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20],
          },
        ],
      },
      //=========================================
      type: "",
      input_data: "",
      testing_char_data: [
        {
          //weekly mon->sunday
          fan: [20, 25, 26, 16, 46, 49, 56],
          light: [46, 56, 79, 25, 46, 16, 37],
          "air conditioner": [25, 46, 7, 49, 59, 26, 16],
        },
        {
          //date 24hours
          fan: [
            4, 5, 6, 4, 8, 9, 7, 25, 1, 5, 3, 2, 1, 5, 4, 6, 8, 9, 7, 5, 1, 2,
            5, 5,
          ],
          light: [
            6, 5, 1, 2, 8, 4, 9, 6, 10, 21, 23, 25, 16, 46, 23, 45, 25, 12, 15,
            12, 21, 21, 24, 15,
          ],
          "air conditioner": [255, 56, 59, 42, 46],
        },
        {
          //monthly 12months
          fan: [26, 25, 46, 15, 56, 15, 12, 13, 15, 14, 15, 12],
          light: [6, 5, 1, 2, 8, 4, 9, 6, 10, 21, 23, 25, 25],
          "air conditioner": [25, 16, 79, 59, 15, 21, 16, 16],
        },
      ],
    };
  },
  computed: {},
  watch:{
    input_data(new_val,old_val){
      //for testing
      let testing_data = ''
      if(this.type.includes('Weekly')){testing_data = this.testing_char_data[0]}
      else if(this.type.includes('Monthly')){testing_data = this.testing_char_data[2]}
      else if(this.type.includes('Date')){testing_data = this.testing_char_data[1]}
      //
      console.log(`%cold data: ${old_val}`,'color:blue')
      this.alter_char_data(new_val,testing_data)
    }
  },
  methods: {
    create_datasets(data){
      let return_data = []
      let index = 0
      for(let dev_type in data){
        return_data.push({
          label: dev_type,
          backgroundColor: this.backgroundColors[index],
          data: data[dev_type],
        })
        index += 1
      }
      return return_data
    },
    which_type() {
      if (this.type.includes("Weekly")) {
        return "week";
      } else if (this.type.includes("Monthly")) {
        return "month";
      } else if (this.type.includes("Date")) {
        return "date";
      }
    },
    getDateOfWeek(w, y) {
      var d = 1 + (w - 1) * 7; // 1st of January + 7 days for each week

      return new Date(y, 0, d+3);
    },
    alter_char_data(type, data) {// type <= input_data; data <= testing_char_data
      if (/\d{4}-\d+$/.test(type)) {
        //monthly
        this.chartdata.labels = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        console.log("Input data is ", type, " with data ", this.create_datasets(data));
        this.chartdata.datasets = this.create_datasets(data)
      } else if (/\d{4}-\d+-\d+/.test(type)) {
        //date
        this.chartdata.labels = [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24,
        ];
        console.log("Input data is ", type, " with labels ", this.chartdata.labels);
      } else if (/\d{4}-W\d+/.test(type)) {
        //week
        
        this.chartdata.labels = [];
        for(let i = 0; i<7; i++){
          let to_day = this.getDateOfWeek(type.slice(-2), type.slice(0, 4))
          to_day = to_day.setDate(to_day.getDate()+i).toLocaleString()
          this.chartdata.labels.push(to_day.getFullYear() + '/' + ("0" + (to_day.getMonth() + 1)).slice(-2) + '/' + ("0" + to_day.getDate()).slice(-2))
        }

        console.log(
          "Input data is ",
          type,
          " with start date ",
          this.getDateOfWeek(type.slice(-2), type.slice(0, 4))
        );
        this.chartdata.datasets = this.create_datasets(data)
      }
      //console.warn(data);
    },

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

<style scoped>
.type {
  border-style: solid;
  border-width: 2px;
}
</style>
