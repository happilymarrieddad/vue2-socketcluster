Vue2 Socketcluster
================


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


---------------------------


// Example

export default {
	name:'test',
	data() {
		return {
			users:[]
		}
	},
	mounted() {
		let vm = this

		vm.$socket
			.emit('all',{ table:"users" })
			.then(users => {
				// Do something with the users
			})
	}
}



```