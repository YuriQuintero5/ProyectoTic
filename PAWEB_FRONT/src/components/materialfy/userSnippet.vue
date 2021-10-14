<template>
	<!-- userSnippet.vue menu -->
	<v-card color="primary" min-width="250">
		<v-container>
			<v-row justify="center" class="mb-1">
				<v-col cols="3" justify-center>
					<router-link to="user">
						<v-avatar size="70">
							<img :src="getAvatar" alt="User Avatar" />
						</v-avatar>
					</router-link>
				</v-col>
				<v-col cols="9" align-self="auto">
					<v-card-title class="pa--20"> {{ ls.get('userInfo').user }} </v-card-title>
					<v-card-subtitle>
						<v-divider />
						{{ ls.get('userInfo').role }}
					</v-card-subtitle>
				</v-col>
			</v-row>
			<!-- these controls the search displaying in userSnippet -->
			<v-divider />
			<v-card v-if="showBottom">
				<v-divider />
				<!-- this changes the background color based on theme -->
				<v-row
					justify="center"
					:style="
						$vuetify.theme.dark ? 'background:#757575 ' : 'background:#78909C'
					"
				>
					<v-col class="d-flex justify-center">
						<v-btn icon :color="buttonColor" block @click="logout">
							Salir
							<v-icon >mdi-power</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-container>
	</v-card>
</template>

<script>
import { mapGetters } from "vuex";
import SecureLS from 'secure-ls'

export default {
	name: "UserSnippet",
	props: {
		buttonColor: { default: "tertiary" },
		showBottom: { default: true },
		showSearch: { default: true },
		showBtn: { default: true },
	},
	data() {
		return {
			ls: new SecureLS(),
			message: null,
		};
	},
	computed: {
		...mapGetters(["getAvatar"]),
	},
	methods: {
		logout: function () {
			this.$store.dispatch("logout").then(() => {
				this.$router.push("/login");
			});
		},
	},
};
</script>

<style></style>
