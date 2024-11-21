<script>
    import '@unocss/reset/tailwind.css'
	import 'virtual:uno.css'
</script>

<slot /> 

<style lang="scss"> 
    :global(body) {
        background-color: black;
        width: 100vw;
        height: 100vh;
    }
</style>
