<template>
<<<<<<< HEAD
	
	
</template>
=======
	<v-container fluid :style="$vuetify.breakpoint.mdAndUp ? 'width: 1660px' : 'width: 100%' ">
		<v-col class="d-flex justify-center">
				<v-sheet color="background">
					<header>
						<span
							class="text-h3 text-uppercase d-flex text-center"
							style="color: #ffc107"
							>Bienvenido a PAWEB</span
						>
						<article class="d-flex justify-center mt-2">
							<p class="text-center">
								Sistema de gestión de equipos.
							</p>
						</article>
					</header>
				</v-sheet>
			</v-col>
	</v-container>
</template>

<script>
	export default {
		data: () => ({
		}),
		methods: {
			throwError: function () {
				throw new Error('Sentry Error')
			},
		},
	}
</script>

<style>
@media only screen and (min-width: map-get()$grid-breakpoints, 'xl')) {
.container {
max-width: 1440px !important;
}
}
</style>
>>>>>>> c052e6ed0449d8aad9c79c62a06cc479ba730d44
