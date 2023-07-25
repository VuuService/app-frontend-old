<template>
  <div class="chips-container flex overflow-x-auto px-4 py-2 pt-4">
    <slot></slot>
  </div>
</template>
<style lang="css" scoped>
.chips-container {
  /* Hide the scroll bar */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  scrollbar-width: none; /* For Firefox */
}

.chips-container::-webkit-scrollbar {
  display: none; /* For WebKit-based browsers */
}
</style>
