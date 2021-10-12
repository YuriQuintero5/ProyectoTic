<template>
	<v-footer id="core-footer" color="primary" app absolute padless>
		<v-container>
			<v-row class="d-flex align-center mb-2">
				<div class="ma-2">
					<span v-for="link in links" :key="link.name">
						<a :href="link.Link" class="ma-2" target="_blank">{{
							link.name
						}}</a>
					</span>
				</div>
				<v-spacer />
				<span class="font-weight-light copyright">
					&copy;
					{{ new Date().getFullYear() }}
					PAWEB
				</span>
			</v-row>
		</v-container>
	</v-footer>
</template>

<script>
export default {
	data: () => ({
		links: [
			{ name: "Inicio", Link: "/" },
			{
				name: "Terceros",
				Link: "/tercero",
			},
			{
				name: "Equipos",
				Link: "/equipo",
			},
		],
	}),
};
</script>

<style>
#core-footer {
	z-index: 0;
}
</style>
