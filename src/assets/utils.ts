export const imageFileFilter = (_req, file, callback): boolean => {
	if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
		return callback(new Error('Only image files are allowed!'), false);
	}
	callback(null, true);
};
