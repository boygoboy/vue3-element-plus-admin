<template>
  <svg class="svg-class" :class="svgclassName">
    <use :href="svgiconName"></use>
  </svg>
</template>

<script>
import { ref, computed } from "vue";
export default {
  name: "scgIcon",
  props: {
    iconName: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const svgclassName = ref(props.className);
    const svgiconName = computed(() => {
      return `#icon-${props.iconName}`;
    });
    return {
      svgclassName,
      svgiconName,
    };
  },
};
</script>

<style lang="scss" scoped>
.svg-class {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
