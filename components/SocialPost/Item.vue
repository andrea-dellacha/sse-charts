<template>
  <div class="upf-card">
    <div class="upf-card__title">
      Nb of {{ socialLabel }} post : {{ chartData.length }}
    </div>
    <Bubble
      :id="chartKey"
      :data="convertToChartData(chartKey, chartData)"
      :options="options"
      class="bubbleChart"
      >Chart couldn't be loaded.</Bubble
    >
  </div>
</template>

<script setup lang="ts">
import { Bubble } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  LinearScale,
  PointElement,
  Legend,
  type ChartOptions,
} from "chart.js";

ChartJS.register(Title, Legend, LinearScale, PointElement);

const dayjs = useDayjs();

const props = defineProps<{
  chartData: SocialPostType[];
  chartKey: string;
}>();

const MAX_ALLOWED_BUBBLE_RADIUS = 10;

const socialLabel = computed(
  () =>
    postMetadata.find((post) => post.key === props.chartKey)?.label ??
    props.chartKey
);

const options: ChartOptions<"bubble"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: `${socialLabel.value} activity by Day and Hour`,
    },
  },
  scales: {
    x: {
      min: -1,
      max: 24,
      ticks: {
        stepSize: 1,
        callback: numberToHour,
        font: {
          size: 10,
        },
      },
    },
    y: {
      min: -1,
      max: 7,
      ticks: {
        callback: numberToDayOfWeek,
        font: {
          size: 14,
        },
      },
    },
  },
};

function numberToHour(hour: string | number): string {
  if (typeof hour !== "number" || [-1, 24].includes(hour)) return "";
  return hour === 0 ? "12am" : hour === 12 ? "12pm" : hour.toString();
}

function numberToDayOfWeek(value: string | number): string {
  return dayOfWeek.find((day) => day.id === value)?.label ?? "";
}

function convertToChartData(key: string | number, data: SocialPostType[]) {
  const dataFormatted = data.map((post) => {
    return {
      y: dayjs.unix(post.timestamp).day(),
      x: parseInt(dayjs.unix(post.timestamp).format("HH")),
    };
  });

  const dataReduced = Object.values(
    dataFormatted.reduce(
      (
        a: {
          [key: string]: BubbleChartItem;
        },
        b
      ) => {
        a[`${b.x}_${b.y}`] = Object.assign(b, {
          r: (a[`${b.x}_${b.y}`] || { r: 0 }).r + 1,
        });
        return a;
      },
      {}
    )
  );

  // Scaling bubble radius
  const maxRadius = Math.max(...dataReduced.map((o) => o.r));
  dataReduced.forEach((dataPoint) => {
    dataPoint.r = Math.round(
      (dataPoint.r / maxRadius) * MAX_ALLOWED_BUBBLE_RADIUS
    );
  });

  return {
    datasets: [
      {
        data: dataReduced,
        backgroundColor:
          postMetadata.find((post) => post.key === key)?.color ??
          "rgb(255, 99, 132)",
      },
    ],
  };
}
</script>

<style lang="scss" scoped>
.bubbleChart {
  min-width: 650px;
  height: auto;
  position: relative;
}

@media only screen and (max-width: 650px) {
  .bubbleChart {
    min-width: unset;
  }
}
</style>
