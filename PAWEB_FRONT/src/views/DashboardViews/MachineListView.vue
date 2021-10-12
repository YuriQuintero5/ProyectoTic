<!-- https://vuetifyjs.com/en/api/v-data-table/#api-props  -->
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
		<!-- Table -->
				<!-- lets you change the props/options for the data table. vuetify iterates through the arrays you feed the headers & items props
				the headers(array of objects) and items(array of objects)  prop is v-binded into the data () props and passed into the table
				-->
				<!-- Headers array object 'value'(value: "first_name") must be the same name as one of your items array(userList) objects propertys(first_name: George)  -->
				<!-- search: Text input used to filter items, binded to the search data prop which is two way binded via v-model in v-text-field  -->
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
				<!-- the v-table has slots you can use to change column content. We use this for actions column 
				this allows us to pass in the edit and delete icons to the actions column
				we then use the item object passed with scoped slot from v-table(child)-->
				<template v-slot:[`item.actions`]="{ item }">
					<!-- used Dynamic Slot Names with string template to get around linting error -->
					<!-- this is the actions edit button -->
					<v-icon small class="mr-2" @click="editItem(item)">
						mdi-pencil
					</v-icon>
					<!-- this is the actions delete button -->
					<v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
import { genericApi } from "../../plugins/axios";
export default {
	data: () => ({
		snack: false,
		snackColor: "",
		snackText: "",
		max25chars: (v) => v.length <= 25 || "Input too long!",
		pagination: {},
		userList: [],
		rowsAmount: [
			15,
			20,
			25,
			{ text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 },
		],
		dialog: false,
		search: "",
		headers: [
			{ text: "Acciones", value: "actions", sortable: false },
			{ text: "Fecha de orden", value: "orderDate" },
			{ text: "Serial", value: "serial" },
			{ text: "Nombre", value: "machineName" },
			{ text: "Marca", value: "brand" },
			{ text: "Fabricante", value: "manufacturer" },
			{ text: "Desccripción", value: "description" },
			{ text: "Accesorios", value: "accessories" },
			{ text: "Perifericos", value: "peripherals" },
			{ text: "Activo", value: "active" },
			{ text: "Estado", value: "status" },
		],
		editedIndex: -1,
	}),

	computed: {
		//Changes the title of the v-card based on if the editied index is the same as -1
		//the default index is -1 so it assumes if there is no item index then its a new item
		formTitle() {
			return this.editedIndex === -1 ? "New Item" : "Edit Item";
		},
	},

	watch: {
		//when dialog is updated this watcher returns the updated value only if the value is truthy, else it calls this.close() method
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		},
		//once the table list is loaded, load the headers
		/*userList() {
			this.getHeaders();
		},*/
	},
	// called when page is created before dom to load data from api
	created() {
		this.get();
	},

	methods: {
		get() {
			this.$store
				.dispatch('getAllMachines', 22) 
				.then((response) => {
						console.log(response)
						this.userList = response.data;
					})
				.catch((err) => console.log(err))
		},

		// object.assign fills in the empty object with the properties of item
		editItem(item, dialogbox = true) {
			/* sets the index that controls the title text in the new item pop up
			this updates the editedIndex from being -1 to whatever the index of the table item is that you are editing
			this function is called by the @click edit icons in table actions
			*/
			this.editedIndex = this.userList.indexOf(item);
			item.isAdmin = this.checkboxAdmin;
			item.isActive = this.checkboxActive;
			// makes a new object with the same properties as the item object that is able to be accessed easily by methods and others
			this.editedItem = Object.assign({}, item);
			//opens the dialog editing box connected to v-dialog v-model="dialog"
			this.dialog = dialogbox;
		},
		/* This is a dynamic method that handles sending vuex actions to call different axios endpoints with different methods
		you get the index of the item passed in via another method, 
		you use the edited item created in the method that called this one and assign to tableITem to use later
		you then dispatch the updateTableItem action with the new edited from html item
		you then remove the item from the list as well to update the table
		 */
		//this is really only called by delete right now, to create or update we use save(). But it can be expanded with if/switch
		callTableAction(item, endpoint, method) {
			const index = this.userList.indexOf(item);
			let tableItem = this.editedItem;
			this.$store
				.dispatch("updateTableItem", { endpoint, tableItem, method })
				.then(() => {
					this.userList.splice(index, 1); //remove/delete the item from the array the table is using
					this.saveInline(); //calls snackbar noticiation
				})
				.catch((error) => {
					console.log(error);
					this.cancelInline; //calls snackbar noticiation
				});
		},
		// this sets the item, url path endpoint and the type of api method(delete) for calltableAction
		deleteItem(item) {
			//this causes config dialog with 'ok'/'cancel' and if ok is hit this runs
			if (confirm("Are you sure you want to delete this item?")) {
				this.editedItem = Object.assign({}, item);
				let endpoint = `users/delete/${this.editedItem.username}`;
				let method = "delete";
				// calls callTableActions which is a method above that handles calling axios via vuex actions
				this.callTableAction(item, endpoint, method);
			}
		},
		// closes the dialog pop up and resets index until its opened again
		close() {
			this.dialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1; // resets the index that controls the title text in the new item pop up
			}, 300);
		},

		save() {
			//if editedIndex is greater than -1 then the item we are trying to save is an already exisiting item, so we update the table differently
			//when you open the editItem menu it sets the index to the items index, which then is used here to determine what to do
			if (this.editedIndex > -1) {
				let tableItem = this.editedItem;
				let endpoint = `users/update/${this.editedItem.username}`;
				let method = "patch";
				this.$store
					.dispatch("updateTableItem", { endpoint, tableItem, method })
					.then(() => {
						// merge both objects to update the original object in userList to update table
						Object.assign(this.userList[this.editedIndex], this.editedItem);
						this.saveInline(); //calls snackbar noticiation
					})
					.catch((error) => {
						console.log(error);
						this.cancelInline; //calls snackbar noticiation
					});
			} else {
				//if the editedIndex isnt greater than -1 then its a new item/user so we do a different set of actions to add a new item
				let tableItem = this.editedItem;
				let endpoint = `users/new-user`;
				let method = "post";
				this.$store
					.dispatch("updateTableItem", { endpoint, tableItem, method })
					.then(() => {
						// instead of merging objects in userList we add new object to user list with .push()
						console.log("new user");
						this.userList.push(this.editedItem);
					})
					.catch((error) => {
						console.log(error);
						this.cancelInline; //calls snackbar noticiation
					});
			}
			this.close();
		},

		// toasts/snackbar/pop-up messages when you pressactions
		saveInline() {
			this.snack = true;
			this.snackColor = "success";
			this.snackText = "Data saved";
		},
		cancelInline() {
			this.snack = true;
			this.snackColor = "error";
			this.snackText = "Canceled";
		},
		reset() {
			this.snack = true;
			this.snackColor = "success";
			this.snackText = "Data reset to default";
		},
		openInline() {
			this.snack = true;
			this.snackColor = "info";
			this.snackText = "Dialog opened";
		},
		closeInline() {
			console.log("Dialog closed");
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
