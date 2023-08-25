<template>
  <MscopeNav v-show="currentTool === toolsNames[0]" />
  <MsightNav v-show="currentTool === toolsNames[1]" />
  <MsourceNav v-show="currentTool === toolsNames[2]" />
</template>

<script>
import MscopeNav from "./MscopeNav.vue";
import MsightNav from "./MsightNav.vue";
import MsourceNav from "./MsourceNav.vue";
export default {
  components: {
    MscopeNav,
    MsightNav,
    MsourceNav,
  },
  data() {
    return {
      toolsNames: ["MScope", "MSight", "MSource"],
      currentTool: "",
    };
  },
  watch: {
    $route: {
      handler: function () {
        let mainRouteName = this.$route.matched[0].name;
        if (this.currentTool !== mainRouteName) {
          this.currentTool = mainRouteName;
        }
      },
    },
  },
};
</script>
