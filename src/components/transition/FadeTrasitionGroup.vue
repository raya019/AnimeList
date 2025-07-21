<template>
  <TransitionGroup
    enter-active-class="transition-opacity duration-700 ease-in-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
  >
    <slot></slot
  ></TransitionGroup>
</template>
