/**
* @description Test user private content with JWT auth
* @param req
* @param res
*/
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
/**
* @description Test admin private content with JWT auth
* @param req
* @param res
*/
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};