<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="absolute left-0 top-0 flex h-screen w-full justify-center bg-black/30 px-8"
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="mt-32 max-w-screen-md self-start bg-white p-4"
          >
            <slot />

            <button
              type="button"
              class="mt-8 rounded bg-weather-primary px-6 py-2 text-white"
              @click="$emit('close-modal')"
            >
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modalActive: boolean;
}

defineEmits(['close-modal']);

withDefaults(defineProps<Props>(), {
  modalActive: false,
});
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
