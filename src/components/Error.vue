<template>
    <div class="message-error" id="message-error">
      <div class="message">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    message: {
      type: String,
      required: true,
    },
  });
  </script>
  
  <style>
  .message-error {
    display: flex;
    justify-content: center;
    align-self: center;
    height: 30px;
    width: 250px;
    /* position: absolute; */
    /* top: 20px; */
    justify-items: center;
    background-color: rgba(255, 0, 0, 0.2);
    border: 1px red solid;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0;
    transition: 0.5s;
  }
  .message {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  