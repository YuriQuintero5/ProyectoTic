<!-- @format -->

<template>
	<v-container fill-height fluid>
		<v-row justify="center">
			<v-col class="d-flex justify-center">
				<v-card elevation="12" min-width="300" width="500" color="secondary">
					<v-toolbar color="primary">
						<v-toolbar-title>Bienvenido</v-toolbar-title>
						<v-spacer />
					</v-toolbar>
					<v-card-text>
						<v-form>
							<v-text-field
								ref="username"
								v-model="username"
								:rules="[() => !!username || 'This field is required']"
								prepend-icon="mdi-account"
								label="Usuario"
								placeholder="Ingrese su usuario"
								required
							/>
							<v-text-field
								ref="password"
								v-model="password"
								:rules="[() => !!password || 'This field is required']"
								:append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
								:type="showPassword ? 'text' : 'password'"
								prepend-icon="mdi-lock"
								label="Contraseña"
								placeholder="Ingrese su contraseña"
								counter
								required
								@keydown.enter="login"
								@click:append="showPassword = !showPassword"
							/>
						</v-form>
					</v-card-text>
					<v-divider class="mt-5" />
					<v-card-actions>
						<v-spacer />
						<v-btn align-center justify-center color="tertiary" @click="login"> Iniciar sesión </v-btn>
					</v-card-actions>
					<v-snackbar v-model="snackbar" :color="color" :top="true">
						{{ errorMessages }}
						<v-btn text @click="snackbar = false"> Close </v-btn>
					</v-snackbar>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: 'LoginView',
		data: function () {
			return {
				username: '',
				password: '',
				errorMessages: 'Información de inicio de sesión incorrecta!',
				snackbar: false, // this is the wrong pass notification
				color: 'red',
				showPassword: false,
			}
		},
		methods: {
			login: function () {
				let modelLogin= {
					userName: this.username,
					password: this.password
				}
				this.$store
					.dispatch('login', modelLogin) //calls the login action and passes login info
					.then((response) => {
						if (response.data.type !== 'error') {
							this.$router.push('/')
						} else {
							this.snackbar = true 
						}
						}) //redirect to dash after login
					.catch((err) => {
						console.log(err)
						this.snackbar = true //shows error on wrong pass
					})
			},
		},
		metaInfo() {
			return {
				title: 'PAWEB | Login',
			}
		},
	}
</script>
