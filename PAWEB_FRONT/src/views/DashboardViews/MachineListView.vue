<template>
	<v-container>
		<v-col class="d-flex justify-center">
			<v-sheet color="background">
				<header>
					<span
						class="text-h3 text-uppercase d-flex text-center"
						style="color: #ffc107"
						>Equipos registrados</span
					>
					<p>
						En esta sección puede consultar todos los equipos registrados.
					</p>
				</header>
			</v-sheet>
		</v-col>
			<v-data-table
				:headers="headers"
				:items="userList"
				sort-by="id"
				class="elevation-1 secondary"
				:mobile-breakpoint="0"
				:search="search">
				<template v-slot:top>
					<v-toolbar color="primary" flat>
						<v-toolbar-title>Equipos</v-toolbar-title>
						<v-divider class="mx-4" inset vertical></v-divider>

						<v-text-field
							v-model="search"
							append-icon="mdi-magnify"
							label="Buscar"
							single-line
							hide-details
							class="ma-2 px-8"
							color="secondary"
						></v-text-field>
						<v-btn color="primary" @click="get"> Actualizar </v-btn>
					</v-toolbar>
				</template>
				<!-- TABLE ACTIONS -->
				<template v-slot:[`item.actions`]="{ item }">
					<v-icon small class="mr-2" @click="manageReview(item)" v-if="reviewBtn">
						mdi-clipboard
					</v-icon>
					<v-icon small class="mr-2" @click="createFail(item)" color="red darken-2">
						mdi-bug
					</v-icon>
				</template>
				<template #[`item.avatar`]="{ item }">
					<v-avatar>
						<img :src="item.avatar" :alt="item.first_name" />
					</v-avatar>
				</template>
			</v-data-table>
	</v-container>
</template>

<script>
import SecureLS from "secure-ls";
export default {
	data: () => ({
		ls: new SecureLS(),
		reviewBtn: false,
		max25chars: (v) => v.length <= 25 || "Input too long!",
		pagination: {},
		userList: [],
		rowsAmount: [
			15,
			20,
			25,
			{ text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 },
		],
		search: "",
		headers: [
			{ text: "Acciones", value: "actions", sortable: false },
			{ text: "Serial", value: "serial" },
			{ text: "Nombre", value: "machineName" },
			{ text: "Marca", value: "brand" },
			{ text: "Fabricante", value: "manufacturer" },
			{ text: "Activo", value: "active" },
			{ text: "Estado", value: "status" },
			{ text: "Fecha de orden", value: "orderDate" },
		],
		editedIndex: -1,
	}),
	// called when page is created before dom to load data from api
	created() {
		this.get();
		const role = this.ls.get('userInfo').role
		if (role == 'Coordinador técnico' || role == 'Administrador') {
			this.reviewBtn = true;
		}
	},

	methods: {
		get() {
			this.$store
				.dispatch('getAllMachines', 'Default') 
				.then((response) => {
						console.log(response)
						this.userList = response.data;
					})
				.catch((err) => console.log(err))
		},
		manageReview(item) {
			this.$router.push({ name: 'revision', params:{ id: item.id }})
		},
		createFail(item) {
			this.$router.push({ name: 'Fallo', params:{ id: item.id }})
		},
	},
};
</script>

<style>
table.v-table thead tr {
	color: red !important;
}
tbody tr:nth-of-type(odd) {
	background-color: rgba(0, 0, 0, 0.05);
}
</style>
