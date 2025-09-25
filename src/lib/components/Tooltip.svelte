<script lang="ts">
  export let content: string;
  
  let showTooltip = false;
  let hoverTimeout: NodeJS.Timeout;
  
  function handleMouseEnter() {
    clearTimeout(hoverTimeout);
    showTooltip = true;
  }
  
  function handleMouseLeave() {
    hoverTimeout = setTimeout(() => {
      showTooltip = false;
    }, 100);
  }
  
  function handleClick() {
    clearTimeout(hoverTimeout);
    showTooltip = !showTooltip;
  }
  
  function handleClickOutside(event: Event) {
    if (showTooltip && !(event.target as Element)?.closest?.('.tooltip-container')) {
      showTooltip = false;
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<svelte:window on:click={handleClickOutside} />

<div class="relative inline-block tooltip-container">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <span 
    class="cursor-help touch-manipulation"
    style="border-bottom: 2px dotted #9ca3af;"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    on:click={handleClick}
    on:keydown={handleClick}
  >
    <slot />
  </span>
  
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 transition-opacity duration-200 ease-in-out max-w-xs sm:max-w-none"
    class:opacity-0={!showTooltip}
    class:opacity-100={showTooltip}
    class:pointer-events-auto={showTooltip}
    class:pointer-events-none={!showTooltip}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
    <div class="text-sm rounded px-3 py-2 shadow-lg whitespace-nowrap sm:whitespace-nowrap break-words sm:break-normal" style="background-color: #f5fbff; color: #15314a;">
      {@html content}
    </div>
    <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style="border-top-color: #f5fbff;"></div>
  </div>
</div>
