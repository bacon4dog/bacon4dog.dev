<script>
	import '@unocss/reset/tailwind.css';
	import 'virtual:uno.css';
	import { navigating } from '$app/stores';
</script>

{#if $navigating}
	<div class="loading-overlay">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			class="loading-spinner"
		>
			<path
				fill="none"
				stroke="currentColor"
				stroke-dasharray="16"
				stroke-dashoffset="16"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3c4.97 0 9 4.03 9 9"
			>
				<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
				<animateTransform
					attributeName="transform"
					dur="1.5s"
					repeatCount="indefinite"
					type="rotate"
					values="0 12 12;360 12 12"
				/>
			</path>
		</svg>
	</div>
{/if}

<slot />

<style lang="scss">
	:global(body) {
		background-color: black;
		width: 100vw;
		height: 100vh;
	}

	:global {
		@font-face {
			font-family: 'LXGW WenKai TC';
			src: url('/fonts/LXGWWenKaiTC-Medium-subset.woff2') format('woff2');
			font-weight: 500;
			font-display: swap;
		}

		.lxgw-wenkai-tc {
			font-family:
				'LXGW WenKai TC',
				system-ui,
				-apple-system,
				sans-serif;
			font-weight: 500;
		}
	}

	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		background: rgba(0, 0, 0, 0.5);
		z-index: 9999;
	}

	.loading-spinner {
		color: white;
		width: 48px;
		height: 48px;
	}
</style>
