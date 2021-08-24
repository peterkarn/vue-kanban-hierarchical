<template>
  <div>
    <p>task text</p>
    <button @click="showPopup">Show modal</button>
  </div>
  <popup v-if="isPopupVisible" @closePopup="closePopup">
    <p>Task Title</p>
    <p>Task id</p>
    <p>Task Descr</p>
    <p>Task Details</p>
  </popup>
</template>

<script>
import Popup from "./Popup.vue";
export default {
  props: {},
  components: {
    Popup,
  },
  data() {
    return {
      isPopupVisible: false,
    };
  },
  methods: {
    showPopup() {
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
  },
  computed: {},
};
</script>
