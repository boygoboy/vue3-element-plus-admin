<!-- eslint-disable prettier/prettier -->
<template>
  <h1 class="logo">
    <img :src="logoSrc" alt="logo" />
  </h1>
  <el-menu
    :default-active="curentPath"
    background-color="#344a5f"
    text-color="#fff"
    active-text-color="#ffffff"
    router
    :collapse="isCollapse"
    :collapse-transition="true"
  >
    <template v-for="item in routers" :key="item.path">
      <template v-if="!item.hidden">
        <template v-if="hasOnlyChild(item.children)">
          <el-menu-item :index="item.children[0].path">
            <template #title>
              <el-icon>
                <component
                  :is="item.meta && item.meta.icon"
                  style="width: 15px; height: 15px; margin-right: 5px"
                />
              </el-icon>
              <span>
                {{ item.children[0].meta && item.children[0].meta.title }}
              </span>
            </template>
          </el-menu-item>
        </template>

        <template v-else>
          <el-sub-menu
            v-if="item.children && item.children.length > 0"
            :index="item.path"
          >
            <template #title>
              <el-icon>
                <!-- <component
                  :is="item.meta && item.meta.icon"
                  style="width: 15px; height: 15px; margin-right: 5px"
                /> -->
                <svg-icon :icon-name="item.meta&&item.meta.icon" class-name="aside-icon"></svg-icon>
              </el-icon>
              <span>
                {{ item.meta && item.meta.title }}
              </span>
            </template>
            <template v-for="child in item.children" :key="child.path">
              <el-menu-item v-if="!child.hidden" :index="child.path">
                {{ child.meta && child.meta.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </template>
  </el-menu>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { ref, computed, reactive, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  name: "Aside",
  props: {},
  components: {},
  setup(props) {
    const { options } = useRouter();
    const routers = options.routes;
    const store = useStore();
    const data = reactive({
      logoSrc: computed(() =>
        store.state.app.collapse
          ? require("@/assets/images/logo-min.png")
          : require("@/assets/images/logo.png")
      ),
      isCollapse: computed(() => store.state.app.collapse),
    });
    const hasOnlyChild = (children) => {
      if (!children) {
        return false;
      }
      const filterChildren = children.filter((item) => item.hidden == false);
      if (filterChildren.length == 1) {
        return true;
      }
      return false;
    };
    const { path } = useRoute();
    const curentPath = computed(() => {
      return path;
    });

    return {
      routers,
      hasOnlyChild,
      curentPath,
      ...toRefs(data),
    };
  },
};
</script>

<style scoped  lang="scss">
.aside-icon {
  margin-right: 5px;
  margin-top: -2px;
  font-size: 18px;
}
.logo {
  padding: 14px 0;
  border-bottom: 1px solid #2d4153;
  img {
    margin: auto;
  }
}
</style>
