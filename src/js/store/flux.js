const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: { "slug": "dparkar00" },
			users: [],
			contacts: [],
			selectedUser: "",
		},
		actions: {
			
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			showUsers: () => {
				fetch(`https://playground.4geeks.com/contact/agendas?offset=0&limit=100`)
				.then(response => { return response.json(); })
				.then(data => { setStore({ "users": [getStore(), ...data.agendas] }) })
				.catch(error => { console.error('Error fetching users:', error); });
			},

			getSelectedUser: (value) => {
				const [slug, id] = value.split("_");
				const selectedUser = { slug, id };
				setStore({ user: selectedUser });
			},
			
			getContactList: () => {
				fetch(`https://playground.4geeks.com/contact/agendas/${getStore().user.slug}/contacts`)
				.then(response => { return response.json(); })
				.then(data => { setStore({ "contacts": data.contacts }); })
				.catch(error => { console.error('Error fetching contacts:', error); });
			},
			newContact: (name, email, phone, address) => {
				
				const contact = {
					"name": name,
					"phone": phone,
					"email": email,
					"address": address,
					
				}

				const config = { 
					method: "POST",
					body: JSON.stringify(contact),
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
				}

				fetch(`https://playground.4geeks.com/contact/agendas/${getStore().user.slug}/contacts`, config)
				.then(response => { return response.json(); })
				.then(() => getActions().getContactList())
				.catch(error => { console.error('Error fetching contacts:', error); });
			},
			deleteContact: (id) => {
				const store = getStore();
				fetch(`https://playground.4geeks.com/contact/agendas/${store.user.slug}/contacts/${id}`, {
					method: 'DELETE'
				})
				.then(response => {
					console.log("Response status:", response.status);
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					if (response.status !== 204) {
						return response.json();
					}
				})
				.then(() => {
					const updatedContacts = store.contacts.filter(contact => contact.id !== id);
					setStore({ contacts: updatedContacts });
					getActions().getContactList()
				})
				.catch(error => { 
					console.error('Error deleting contact:', error); 
				});
			},
			updateContact: async (slug, id, body) => {
				const updateContactReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(body)
				});
				if (!updateContactReq.ok) {
					alert("Something Went Wrong Updating Contact")
				} else {

					const updateContactJson = await updateContactReq.json()
					const contactIndex = getStore().contacts.findIndex(contact => contact.id === id)

					if (contactIndex !== -1) {
						const updatedContacts = [...getStore().contacts]
						updatedContacts[contactIndex] = updateContactJson
						setStore({ ...getStore(), contacts: updatedContacts })
					}
				}
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
