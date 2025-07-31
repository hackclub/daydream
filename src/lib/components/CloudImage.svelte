<script lang="ts">
  export let src: string;
  export let alt: string = '';
</script>

<div class="cloud-wrapper max-sm:w-[120vw] max-sm:-translate-x-[calc(1rem+10vw)]">
  <img {src} {alt} />
</div>

<style>
  .cloud-wrapper {
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 48px;
    mask-image: 
      linear-gradient(white, white),
      url('/clouds-loop-mask-2.png'),
      url('/clouds-loop-mask-1.png'),
      url('/clouds-loop-mask-3.png'),
      url('/clouds-loop-mask-4.png'),
      url('/cloud-corner-1.png'),
      url('/cloud-corner-2.png'),
      url('/cloud-corner-3.png'),
      url('/cloud-corner-4.png');
    mask-position: 
      center,
      top left,
      bottom left,
      left top,
      right top,
      bottom left,
      top left,
      top right,
      bottom right;
    mask-size: 
      auto auto,
      auto 72px,
      auto 72px,
      72px auto,
      72px auto,
      100px 100px,
      100px 100px,
      100px 100px,
      100px 100px;
    mask-repeat: 
      no-repeat,
      repeat-x,
      repeat-x,
      repeat-y,
      repeat-y,
      no-repeat,
      no-repeat,
      no-repeat,
      no-repeat;
    -webkit-mask-image: 
      linear-gradient(white, white),
      url('/clouds-loop-mask-2.png'),
      url('/clouds-loop-mask-1.png'),
      url('/clouds-loop-mask-3.png'),
      url('/clouds-loop-mask-4.png'),
      url('/cloud-corner-1.png'),
      url('/cloud-corner-2.png'),
      url('/cloud-corner-3.png'),
      url('/cloud-corner-4.png');
    -webkit-mask-position: 
      center,
      top left,
      bottom left,
      left top,
      right top,
      bottom left,
      top left,
      top right,
      bottom right;
    -webkit-mask-size: 
      auto auto,
      auto 72px,
      auto 72px,
      72px auto,
      72px auto,
      100px 100px,
      100px 100px,
      100px 100px,
      100px 100px;
    -webkit-mask-repeat: 
      no-repeat,
      repeat-x,
      repeat-x,
      repeat-y,
      repeat-y,
      no-repeat,
      no-repeat,
      no-repeat,
      no-repeat;
    mask-type: luminance;
    mask-mode: luminance;
    mask-composite: exclude, add, add, add, add, add, add, add, add;
    height: 100%;
  }
  
  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
    margin: 0;
  }
</style>
