class NotFoundController {
	static json(req, res) {
		return res.status(404).json({
			status: 404,
			message: 'Api not found'
		});
	}

	static html(req, res) {
		return res.satus(404).end("Page not found");
	}
}

export default NotFoundController;
