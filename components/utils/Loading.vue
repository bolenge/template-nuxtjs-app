<template>
  <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
</template>

<script>
export default {
  
}
</script>

<style>
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 100%;
    height: auto;
    padding: 0;
    margin: 0;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: inline;
    position: absolute;
    top: 0;
    width: 50%;
    height: 50%;
    border: 4px solid blue;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: blue transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>