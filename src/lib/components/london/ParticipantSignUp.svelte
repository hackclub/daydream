<script lang="ts">
	import { page } from '$app/stores';

	let eventName = "London";
    
	$: if (!eventName) {
		let slug = $page.url.pathname.split('/')[1] || '';
		eventName = slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");
	}

	function handleFormSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
        alert("Signups for Daydream London are currently closed. Check out our amazing partner events Daydreams Brighton, South Wales (Saturday the 27th), and Cambridge and Manchester (Sunday the 28th)! Bonus points (read) to anyone who attends two UK events!");
	}
</script>



<div class="mt-8 flex flex-col items-center gap-3 z-5 max-md:scale-90">
	<div class="relative rounded-full overflow-hidden" style="padding: 2px 2px 5px 2px;">
		<form on:submit={handleFormSubmit} class="rounded-full bg-white border-2 border-dark font-sans p-2 flex flex-row items-center gap-2 shadow-[0_3px_0_0_theme(colors.dark)] focus-within:border-pink focus-within:shadow-[0_3px_0_0_#E472AB] has-[button:active]:border-dark has-[button:active]:shadow-[0_3px_0_0_theme(colors.dark)] has-[button:focus]:border-dark has-[button:focus]:shadow-[0_3px_0_0_theme(colors.dark)]">
			<input
				type="email"
				name="email"
				placeholder="Enter email to sign up"
				class="w-80 px-3 py-1 text-dark focus:outline-none flex-1"
				required
			/>
			<input type="hidden" name="mailingLists" value="cmd3c94kz0hvz0iwt7ps28cyd" />
			<button type="submit" class="bg-light h-full px-5 py-[0.45rem] rounded-full border-b-2 border-[#B3866A] cursor-pointer hover:border-b-4 hover:transform active:border-b-0 active:transform active:translate-y-0.5 focus:outline-none transition-all duration-100 flex-shrink-0">
				<img src="submit.svg" alt="Go">
			</button>
		</form>
		

	</div>
</div>
