Vue2 Socketcluster
================


## Why ??
1) This package wraps the client requests inside promises.
2) No need to assign socket to the root. It's available everywhere!


## Installation
```bash
npm install vue2-socketcluster --save
```

## Usage
```js
import Vue2Socketcluster from 'vue2-socketcluster'

Vue.use(Vue2Socketcluster,{
	hostname:"app.example.com",
	secure:true
})



new Vue({
	el:"#app",
	data() {
		return {
			authToken:null
		}
	},
	methods:{
		error(err) {
			// Do something with the error.. I suggest adding alertify
		}
	},
	mounted() {
		let vm = this

		vm.$socket.on('connect',status => {

			if (status.isAuthenticated) {
				vm.authToken = vm.$socket.getAuthToken()
				vm.$router.push({ path:'/' })
			} else {
				vm.$router.push({ path:'/auth/login' })
			}

		})

	}
})



---------------------------


// Example - some component

export default {
	name:'test',
	data() {
		return {
			users:[]
		}
	},
	mounted() {
		let vm = this


		// Traditional
		vm.$socket.emit('somemessage',{ someprop:'someval' },(err,data) => {
			if (err) return vm.$root.error(err)

			// Do something with data
		})


		// Promises
		async function run() {
			let results = {}

			results.first_result = await vm.$socket
				.emit('somemessage',{ someprop:'someval' })
				.catch(err => { throw new Error(err) })

			results.second_result = await vm.$socket
				.emit('somemessage2',{ someprop:'someval' })
				.catch(err => { throw new Error(err) })

			return results
		}

		run()
			.then(data => {

			})
			.catch(err => {

				})

	}
}



```

## Test
```bash
cd test
npm i
npm run dev
```
Open up the browser and you will see "Connected" and the status var outputed... assuming you have an instance of socketcluster running on localhost:3000.