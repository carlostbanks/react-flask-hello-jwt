const getState = ({ getStore, getActions, setStore }) => {
	return {

		// update store to reflect what we want to use from the backend
		store: {
			api: "https://3001-carlostbank-reactflaskh-p31028rkmjz.ws-us81.gitpod.io",
			isAuthenticated: false,
			vehicles: []
		},

		// Add sign-up fetch request as an action
		actions: {
			sign_up: (email, password) => {
				const store = getStore();

				fetch(`${store.api}/api/signup/`, {
					method: "POST",
					body: JSON.stringify({
						email: email,
						password: password
					}),
					headers: {
						"Content-type": "application/json",
						"Access-Control-Allow-Origin": "*"
					}
				})
					.then(resp => {
						if (resp.ok) {
							return resp.json();
						}
					})
					.then(data => {
						localStorage.setItem("token", data.token);
						setStore({ isAuthenticated: true });
					})
					.catch(error => console.log("Error during login:", error))
				},

			sign_in: (email, password) => {
				const store = getStore();

				fetch(`${store.api}/api/login`, {
					method: 'POST',
					body: JSON.stringify({
						email: email,
						password: password
					}),
					headers: {
						"Content-type": "application/json",
						"Access-Control-Allow-Origin": "*"
					}
				})
					.then(resp => {
						if (resp.ok) {
							return resp.json();
						}
					})
					.then(data => {
						localStorage.setItem("token", data.token);
						setStore( {isAuthenticated: true });
					})
					.catch(error => console.log("There was an error signing in", error));
			},
			
			loadData: () => {
				const store = getStore();

				fetch(`${store.api}/api/vehicles/`, {
					headers: {
						"Content-type": "application/json",
						"Access-Control-Allow-Origin": "*",
						Authorization: `Bearer ${(localStorage.getItem("token"))}`
					}
				})
				.then(response => response.json())
				.then(data => setStore({ vehicles: data }))
				.catch(error => console.log(error))
			}
		}
	}
};

export default getState;
