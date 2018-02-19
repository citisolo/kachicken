module.exports.sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.remove = (array, element) => {
    const index = array.indexOf(element);
    array.splice(index, 1);
}
