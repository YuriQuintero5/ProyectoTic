<template>
	<v-footer id="core-footer" color="primary" app absolute padless>
		<v-container>
			<v-row class="d-flex align-center mb-2">
				<div class="ma-2">
					<span>
						PAWEB
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
	}),
};
</script>

<style>
#core-footer {
	z-index: 0;
}
</style>
