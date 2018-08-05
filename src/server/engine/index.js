import portfinder from 'portfinder';

function listen (server, port) {
	server.listen(port, () => console.log(`Todolist server running on port: ${port}`));
}

const startServer = server => {
	const basePort = process.env.PORT || 3000;

	portfinder.basePort = basePort;
	portfinder.getPortPromise()
		.then(port => listen(server, port))
		.catch(err => console.log(err));
}

export { startServer };
