<template>
  <div class="v-popup">
    <div class="v-popup__body">
      <div class="v-popup__header">{{ modalTitle }}</div>
      <div class="v-popup__content"><slot></slot></div>
      <div class="v-popup__footer">
        <button @click="closePopup" class="v-popup__btn v-popup__btn_cancel">
          Cancel
        </button>
        <button @click="confirmEdit" class="v-popup__btn v-popup__btn_add">
          {{ btnName }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    btnName: String,
    modalTitle: String,
  },
  emits: ["closePopup", "confirmEdit"],
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
    confirmEdit() {
      this.$emit("confirmEdit");
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.v-popup {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  &__body {
    position: fixed;
    z-index: 1;
    display: grid;
    top: 50px;
    left: 50%;
    top: 50%;
    gap: 20px;
    padding: 30px;
    width: 400px;
    transform: translate(-50%);
    box-shadow: 0px 0px 155px #7eb5a6;
    background-color: #e8d0b3;
    border: 3px solid #7eb5a6;
    border-radius: 5px;
  }
  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    label {
      display: flex;
      // justify-content: space-between;
      flex-direction: column;
      input {
        width: 100%;
      }
    }
  }

  &__btn {
    padding: 8px;
    color: #fff;
    &_add {
      background: rgb(67, 233, 95);
    }
    &_cancel {
      background: rgb(230, 68, 68);
    }
  }
}
</style>
