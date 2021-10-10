<!-- @format -->

<template>
	<v-container>
				<v-card flat color="secondary" class="elevation-0" :tile="true">
					<v-form>
						<v-container>
							<v-row wrap>
								<v-col xs12 md4>
									<v-select
									:items="items"
									label="Seleciona una opción"
									v-model="tercero.identityType"
									outline
									></v-select>
								</v-col>
								<v-col xs12 md12>	
									<v-text-field 
										v-model="tercero.identityDocument" 
										label="Numero de identificación"
										type="number"
										v-on:keyup.enter="get" />
								</v-col>
							</v-row>
							<v-row wrap>
								<v-col xs12 md6>
									<v-text-field v-model="tercero.firstName" label="Nombres" value="Travis" />
								</v-col>
								<v-col xs12 md6>
									<v-text-field v-model="tercero.lastName" label="Apellidos" value="Scott" />
								</v-col>
							</v-row>
							<v-row wrap>
								<v-col xs12 md4>
									<v-text-field 
										v-model="tercero.phone" 
										label="Telefono"
										type="number" />
								</v-col>
								<v-col xs12 md4>
									<v-text-field v-model="tercero.city" label="Ciudad" />
								</v-col>
							</v-row>
							<v-row wrap>
								<v-col xs12 md4>
									<v-text-field
										v-model="tercero.address"
										label="Direccion"
									/>
								</v-col>
							</v-row>
							<br/>
							<v-btn @click="manage">{{ btnText }}</v-btn>
						</v-container>
					</v-form>
					<v-snackbar
					v-model="snackbar"
					:multi-line="mode === 'multi-line'"
					:timeout="timeout"
					:vertical="mode === 'vertical'"
					>
					{{ message }}
					</v-snackbar>
				</v-card>	
	</v-container>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'TerceroForm',
		data() {
			return {
				timeout: 2000,
				btnText: 'Registrar',
				snackbar: false,
				tercero: {
					identityType: '',
					identityDocument: '',
					firstName: '',
					lastName: '',
					address: '',
					phone: '',
					city: '',
					roleName: 'Cliente',
					id: ''
				},
				items: ['CC', 'CE', 'TI'],
				textFieldColor: 'secondary',
				message: 'Guardado exitoso!',
				tabBreakPoint: this.$vuetify.breakpoint.mobile ? false : true,
			}
		},
		methods: {
			manage() {
				if (this.btnText == 'Registrar') {
					this.create();
				} else {
					this.update();
				}
			},
			create() {
				this.$store
					.dispatch('createPerson', this.tercero) 
					.then(() => {
						this.message = 'Guardado exitoso!';
						this.snackbar = true
						this.tercero = {
							identityType: null,
							identityDocument: '',
							firstName: '',
							lastName: '',
							address: '',
							phone: '',
							city: '',
							roleName: 'Cliente',
							id: ''
						}
						})
					.catch((err) => {
						console.log(err)
						this.message = 'Ocurrio un error al intentar guardar el tercero!';
						this.snackbar = true
					})
			},
			get() {
				let id = this.tercero.identityDocument
				this.$store
					.dispatch('getPerson', id) 
					.then((response) => {
							this.tercero.identityType = response.data[0].identityType;
							this.tercero.firstName = response.data[0].firstName;
							this.tercero.lastName = response.data[0].lastName;
							this.tercero.phone = response.data[0].phone;
							this.tercero.city = response.data[0].city;
							this.tercero.address = response.data[0].address;
							this.tercero.id = response.data[0]._id;
							this.btnText = 'Actualizar';
						})
					.catch((err) => {
						console.log(err)
						this.message = 'Tercero no encontrado!';
						this.snackbar = true
					})
			},
			update() {
				this.$store
					.dispatch('updatePerson', this.tercero) 
					.then((response) => {
						console.log(response)
						this.message = 'Actualización exitosa!';
						this.snackbar = true
						this.tercero = {
							identityType: null,
							identityDocument: '',
							firstName: '',
							lastName: '',
							address: '',
							phone: '',
							city: '',
							roleName: 'Cliente',
							id: ''
						}
						this.btnText = 'Registrar';
					})
					.catch((err) => {
						console.log(err)
						this.message = 'Error al actualizar el tercero!';
						this.snackbar = true
					})
			}
		},
		computed: {
			...mapGetters(['getAvatar']),
		},
	}
</script>
