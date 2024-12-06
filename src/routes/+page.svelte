<script lang="ts">
	// Constants and Configuration
	const title = '培根是條狗 | @bacon4dog';
	const author = '@bacon4dog';
	const description =
		'培根是條狗，是一位過著狗一般血汗生活的軟體工程師。雖然職稱是後端工程師，但他實際包辦了從前端開發、後端架構、系統部署、雲端維運到測試自動化的一條龍開發。每個專案的開發週期都短得驚人，需求天天改，系統也經常重寫。面對各種任務與需求變更，「收到」始終是他的標準回覆。名字的由來是因為他天天被煎烤得跟培根一樣，但好在高溫持續煎烤後的培根特別香，就如同他交付的每個專案一樣，總是香氣四溢。';
	const keywords = '培根是條狗, bacon4dog, 軟體工程師, 前端工程師, 後端工程師, 全端工程師';
	const texts = [
		{
			text: '培根是條狗',
			size: 'clamp(3.5rem, 8vw, 80pt)'
		},
		{
			text: '@bacon4dog',
			size: 'clamp(2.75rem, 6vw, 60pt)'
		}
	];
	const morphTime: number = 1;
	const cooldownTime: number = 1;

	// State Variables
	import { onMount } from 'svelte';

	let text1: HTMLSpanElement;
	let text2: HTMLSpanElement;

	let textIndex: number = texts.length - 1;
	let time: Date = new Date();
	let morph: number = 0;
	let cooldown: number = cooldownTime;

	// Animation Functions
	function setMorph(fraction: number): void {
		text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
		text2.style.opacity = `${fraction ** 0.4 * 100}%`;

		fraction = 1 - fraction;
		text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
		text1.style.opacity = `${fraction ** 0.4 * 100}%`;

		const currentText = texts[textIndex % texts.length];
		const nextText = texts[(textIndex + 1) % texts.length];

		text1.textContent = currentText.text;
		text2.textContent = nextText.text;
		text1.style.fontSize = currentText.size;
		text2.style.fontSize = nextText.size;
	}

	function doMorph(): void {
		morph -= cooldown;
		cooldown = 0;

		let fraction: number = morph / morphTime;

		if (fraction > 1) {
			cooldown = cooldownTime;
			fraction = 1;
		}

		setMorph(fraction);
	}

	function doCooldown(): void {
		if (!text1 || !text2) return;

		morph = 0;
		text2.style.filter = '';
		text2.style.opacity = '100%';
		text1.style.filter = '';
		text1.style.opacity = '0%';
	}

	function animate(): void {
		if (!text1 || !text2) return;

		requestAnimationFrame(animate);

		const newTime: Date = new Date();
		const shouldIncrementIndex: boolean = cooldown > 0;
		const dt: number = (newTime.getTime() - time.getTime()) / 1000;
		time = newTime;

		cooldown -= dt;

		if (cooldown <= 0) {
			if (shouldIncrementIndex) {
				textIndex++;
			}
			doMorph();
		} else {
			doCooldown();
		}
	}

	// Initialization
	onMount(() => {
		const currentText = texts[textIndex % texts.length];
		const nextText = texts[(textIndex + 1) % texts.length];

		text1.textContent = currentText.text;
		text2.textContent = nextText.text;
		text1.style.fontSize = currentText.size;
		text2.style.fontSize = nextText.size;
		animate();
	});
</script>

<!-- Meta Tags Section -->
<svelte:head>
	<title>{title}</title>
	<meta charset="utf-8" />
	<meta name="language" content="zh-TW" />
	<meta name="author" content={author} />
	<meta name="robots" content="index, follow" />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<link rel="canonical" href="https://bacon4dog.dev" />
	<link rel="publisher" href="https://github.com/bacon4dog" />
	<meta property="og:url" content="https://bacon4dog.dev" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:author" content="https://github.com/bacon4dog" />
	<meta property="og:publisher" content="https://github.com/bacon4dog" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<!-- Main Content -->
<div class="grid place-items-center w-full h-full">
	<div id="container">
		<a
			href="https://github.com/bacon4dog"
			aria-label="Visit bacon4dog's GitHub profile"
			class="lxgw-wenkai-tc"
		>
			<span bind:this={text1}></span>
			<span bind:this={text2}></span>
		</a>
	</div>
</div>

<!-- SVG Filters -->
<svg id="filters">
	<defs>
		<filter id="threshold">
			<feColorMatrix
				in="SourceGraphic"
				type="matrix"
				values="1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 255 -140"
			/>
		</filter>
	</defs>
</svg>

<style>
	/* Container Styles */
	#container {
		position: relative;
		margin: auto;
		width: fit-content;
		min-width: min-content;
		height: 100pt;
		filter: url(#threshold) blur(0.6px);
		animation: bounce 1s linear infinite;
		display: flex;
		align-items: center;
	}

	/* Text Element Styles */
	span {
		position: absolute;
		width: max-content;
		left: 50%;
		transform: translate(-50%, -50%);
		display: inline-block;
		text-align: center;
		user-select: none;
		color: white;
		top: 50%;
	}

	/* Filter Styles */
	#filters {
		position: absolute;
		visibility: hidden;
	}

	/* Animation Styles */
	@keyframes bounce {
		0%,
		100% {
			transform: translateY(-25%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		50% {
			transform: translateY(0);
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}
</style>
