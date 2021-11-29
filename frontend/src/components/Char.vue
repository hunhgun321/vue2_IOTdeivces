<script>
import { Bar } from "vue-chartjs";
import { mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {},
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>
