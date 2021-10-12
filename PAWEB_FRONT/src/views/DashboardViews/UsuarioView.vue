<!-- @format -->

<template>
	<v-container>
		<header>
			<span
				class="text-h3 text-uppercase d-flex text-center"
				style="color: #ffc107"
				>Gestión de usuarios</span
			>
			<p>
				En esta sección puede asignar, consultar o actualizar el rol de un tercero.
				Para consultar el rol de un tercero, ingrese un id existente en el campo numero de identificación y presione enter.
			</p>
		</header>
		<br/>
		<v-card flat color="secondary" class="elevation-0" :tile="true">
			<v-form>
				<v-container>
					<v-row wrap>
						<v-col xs12 md12>	
							<v-text-field 
								v-model="identityDocument" 
								label="Numero de identificación"
								type="number"
								v-on:keyup.enter="get" />
						</v-col>
						<v-col xs12 md4>
							<v-select
							:items="items"
							label="Seleciona un rol de usuario"
							v-model="tercero.roleName"
							outline
							></v-select>
						</v-col>
					</v-row>
					<br/>
					<v-btn @click="update">Asignar</v-btn>
				</v-container>
			</v-form>
			<v-snackbar
				v-model="snackbar"
				:timeout="timeout"
				>
				{{ message }}
			</v-snackbar>
		</v-card>	
		<br/>
	</v-container>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'TerceroForm',
		data() {
			return {
				timeout: 2000,
				snackbar: false,
				id: '',
				identityDocument: '',
				tercero: {
					roleName: ''
				},
				items: ['Administrador','Cliente', 'Compras', 'Coordinador técnico', 'Técnico', 'Asesor comercial'],
				textFieldColor: 'secondary',
				message: 'Asignación exitosa!',
				tabBreakPoint: this.$vuetify.breakpoint.mobile ? false : true,
			}
		},
		methods: {
			get() {
				this.$store
					.dispatch('getPerson', this.identityDocument) 
					.then((response) => {
							this.tercero.roleName = response.data[0].roleName;
							this.id = response.data[0]._id;
						})
					.catch((err) => {
						console.log(err)
						this.message = 'Tercero no encontrado!';
						this.snackbar = true
					})
			},
			update() {
				this.$store
					.dispatch('updatePerson', {id: this.id, model: this.tercero}) 
					.then((response) => {
						console.log(response)
						this.message = 'Asignación exitosa!';
						this.snackbar = true
						this.tercero = {
							roleName: ''
						}
						this.id = ''
						this.identityDocument = ''
					})
					.catch((err) => {
						console.log(err)
						this.message = 'Error al asignar rol al tercero!';
						this.snackbar = true
					})
			}
		},
		computed: {
			...mapGetters(['getAvatar']),
		},
	}
</script>
