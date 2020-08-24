var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


/******************************************************************************
 *                       Login - "POST /api/users/login"
 ******************************************************************************/


const openDb = async() => {
    const dbFilePath = './public/MockDb.json';

    return jsonfile.readFile(dbFilePath);
}

async function login(email, password) {

    try {
        const db = await openDb();
        for (const user of db.users) {
            if (user.email === email && user.password === password) {
                return user;
            }
        }
        return null;
    } catch (err) {
        throw err;
    }
}

router.post('/login', async(req, res) => {
    const { users } = req.body;
    if (!users) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    const logedinUser = await login(users.email, users.password);
    if (logedinUser)
        return res.status(200).end();
    else
        return res.status(400).end();
});


router.get('/all', async(req, res) => {

    const db = await openDb();
    console.log(db.users)
    return res.status(200).json(db);
});


module.exports = router;