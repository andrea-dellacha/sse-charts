<template>
  <div>
    <h2>SSE status: {{ status }}</h2>
    <div class="chart-filter">
      <div
        v-for="filter in keyFilters"
        class="chart-filter__tag"
        :class="{ '--active': filter.active }"
        @click="filter.active = !filter.active"
      >
        {{ getLabel(filter.key) }}:
        {{ getLength(filter.key) }}
      </div>
    </div>
    <div class="bubbleChart">
      <template v-for="(value, key) in socialPostsList" :key="key">
        <SocialPostItem
          v-if="shouldShowChart(key as string)"
          :chart-data="value"
          :chart-key="(key as string)"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEventSource } from "@vueuse/core";

const socialPostsList = ref<{ [key: string]: SocialPostType[] }>({});
const keyFilters = ref<{ key: string; active: boolean }[]>([]);

const { status, data } = useEventSource("https://stream.upfluence.co/stream");

watch(
  () => data.value,
  (newItem) => {
    if (newItem) {
      const parsedItem = JSON.parse(newItem);
      const key: string = Object.keys(parsedItem)[0];
      const socialPost: SocialPostType = {
        id: parsedItem[key].id,
        timestamp: parsedItem[key].timestamp,
      };

      if (socialPostsList.value[key] !== undefined) {
        socialPostsList.value[key].push(socialPost);
      } else {
        socialPostsList.value[key] = [socialPost];
        keyFilters.value.push({ key: key, active: true });
      }
    }
  },
  { immediate: true, deep: true }
);

function getLabel(chartKey: string): string {
  return postMetadata.find((post) => post.key === chartKey)?.label ?? chartKey;
}

function getLength(chartKey: string): number {
  return socialPostsList.value[chartKey].length ?? 0;
}

function shouldShowChart(chartKey: string) {
  return (
    keyFilters.value.find((filter) => filter.key === chartKey)?.active ?? true
  );
}
</script>
<style lang="scss" scoped>
.chart-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: $spacing-xxx-sm;

  margin-bottom: $spacing-x-sm;

  .chart-filter__tag {
    background-color: $upf-gray-dark;
    color: white;
    padding: $spacing-xxx-sm $spacing-xx-sm;
    border-radius: $border-radius-md;
    cursor: pointer;
    &.--active {
      background-color: $color-primary-500;
    }
  }
}
.bubbleChart {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: $spacing-xxx-sm;
}
</style>
