<script lang="ts">
	let { class: className = '', pageBreak = false, children } = $props();
</script>

<section
	class="mx-auto max-w-4xl font-serif text-[#3a2a1a] {className}"
	class:page-break={pageBreak}
>
	<div class="space-y-6 text-lg leading-relaxed">
		{@render children()}
	</div>
</section>
