
<script>
  import { Gift } from 'phosphor-svelte';
</script>

<style>

.jukebox-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(90deg, #FDE68A 0%, #FECACA 100%);
  color: #7C3AED;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.7rem 0.5rem 0.7rem 0.5rem;
  border-bottom: 2px solid #FBBF24;
  box-shadow: 0 2px 12px 0 rgba(252, 231, 243, 0.12);
  letter-spacing: 0.01em;
  position: relative;
  z-index: 100;
}
.jukebox-icon {
  width: 1.7em;
  height: 1.7em;
  color: #F43F5E;
  flex-shrink: 0;
}
.jukebox-link {
  color: #7C3AED;
  text-decoration: underline;
  transition: color 0.2s;
}
.jukebox-link:hover {
  color: #F43F5E;
}
</style>

<div class="jukebox-banner">
  <Gift class="jukebox-icon" weight="fill" />
  <span>
    THANK YOU Jukebox for the <a class="jukebox-link" href="https://www.jukeboxprint.com/custom-stickers" target="_blank" rel="noopener noreferrer">custom stickers</a>
  </span>
</div>
