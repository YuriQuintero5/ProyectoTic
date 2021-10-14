<template>
	<v-container>
		<header>
			<span
				class="text-h3 text-uppercase d-flex text-center"
				style="color: #ffc107"
				>Asignar cliente</span
			>
			<p>
				En esta sección puede asignar a un cliente el equipo seleccionado.
			</p>
		</header>
		<br/>
		<v-row justify-center wrap class="d-flex align-start">
			<v-col xs12 md="6">
				<v-card flat color="secondary" class="elevation-0" :tile="true">
					<v-form>
						<v-container>
							<v-row wrap>
								<v-col xs12 md6>
									<v-text-field v-model="customerId" label="Identificación del cliente" value="Travis" />
								</v-col>
							</v-row>
							<v-row wrap>
								<v-col xs12 md4>
									<v-select
									:items="items"
									label="Seleciona un tipo de entrega"
									v-model="asignacion.entryType"
									outline
									></v-select>
								</v-col>
							</v-row>
							<br/>
							<v-btn @click="searchPerson">Registrar</v-btn>&nbsp;
							<v-btn @click="cancel">Cancelar</v-btn>
						</v-container>
					</v-form>
					<v-snackbar
						v-model="snackbar"
						:timeout="timeout"
						>
						{{ message }}
					</v-snackbar>
				</v-card>	
			</v-col>
			<v-col xs12 md4>
				<v-card elevation="4"
				:min-width="300"
				:max-width="820"
				:min-height="100"
				class="pa-3">
					<v-list-item-content>
						<v-list-item-title class="text-h5 mb-1">
							Fecha de orden 
						</v-list-item-title>
						<v-list-item-subtitle
							>{{ equipo.orden }}
						</v-list-item-subtitle><br/><br/>
						<v-list-item-title class="text-h5 mb-1">
							Serial
						</v-list-item-title>
						<v-list-item-subtitle
							>{{ equipo.serial }}
						</v-list-item-subtitle><br/><br/>
						<v-list-item-title class="text-h5 mb-1">
							Nombre
						</v-list-item-title>
						<v-list-item-subtitle
							>{{ equipo.nombre }}
						</v-list-item-subtitle><br/><br/>
						<v-list-item-title class="text-h5 mb-1">
							Marca
						</v-list-item-title>
						<v-list-item-subtitle
							>{{ equipo.marca }}
						</v-list-item-subtitle><br/><br/>
						<v-list-item-title class="text-h5 mb-1">
							Fabricante
						</v-list-item-title>
						<v-list-item-subtitle
							>{{ equipo.fabricante }}
						</v-list-item-subtitle><br/><br/>
						<v-list-item-title class="text-h5 mb-1">
							Estado
						</v-list-item-title>
						<v-list-item-subtitle
							>{{ equipo.estado }}
						</v-list-item-subtitle><br/><br/>
					</v-list-item-content>
				</v-card>	
			</v-col>
		</v-row>
		<br/>
	</v-container>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'ReviewForm',
		data() {
			return {
				id: '',
				person: {},
				timeout: 2000,
				snackbar: false,
				customerId:'',
				asignacion: {
					entryType: '',
					entryDate: '',
					active: 'true',
					machine: '',
				},
				equipo: {
					orden: '',
					serial: '',
					nombre: '',
					marca: '',
					fabricante: '',
					descripcion: '',
					estado: '',
					id:''
				},
				items: ['Venta', 'Comodato', 'Préstamo'],
				textFieldColor: 'secondary',
				message: 'Guardado exitoso!',
				tabBreakPoint: this.$vuetify.breakpoint.mobile ? false : true,
			}
		},
		created() {
			this.get();
		},
		methods: {
			cancel() {
				this.$router.push({ name: 'Lista de equipos almacen'})
			},
			searchPerson() {
				this.$store
					.dispatch('getPerson', this.customerId) 
					.then((response) => {
							if (response.data.length != 0) {
								this.person = response.data
								this.create()
							} else {
								this.message = 'Cliente no encontrado!';
								this.snackbar = true
							}
						})
					.catch((err) => {
						console.log(err)
					})
			},
			create() {
				this.asignacion.entryDate = this.getDateTime();
				this.asignacion.machine = this.equipo.id;
				
				this.$store
				.dispatch('createAssigment', { id: this.person[0].id, model: this.asignacion }) 
				.then(() => {
					this.$router.push({ name: 'Lista de equipos almacen'})
					})
				.catch((err) => {
					console.log(err)
					this.message = 'Ocurrio un error al intentar registrar la revisión!';
					this.snackbar = true
				})	
				
			},
			get() {
				this.id = this.$route.params.id;
				this.$store
					.dispatch('getMachineById', this.id) 
					.then((response) => {
							this.equipo.orden = response.data.orderDate;
							this.equipo.serial = response.data.serial;
							this.equipo.nombre = response.data.machineName;
							this.equipo.marca = response.data.brand;
							this.equipo.fabricante = response.data.manufacturer;
							this.equipo.descripcion = response.data.description;
							this.equipo.estado = response.data.status;
							this.equipo.id = response.data.id;
						})
					.catch((err) => {
						console.log(err)
						this.message = 'Tercero no encontrado!';
						this.snackbar = true
					})
			},
			getDateTime() {
				let today = new Date();
				let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
				return date;
			}
		},
		computed: {
			...mapGetters(['getAvatar']),
		},
	}
</script>
