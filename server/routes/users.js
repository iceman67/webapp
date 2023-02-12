const  express = require ("express");
const router = express.Router();
const uuid = require("uuid");
 

let users = [
    {
       id : 1, 
       name: "Yunhee Kang",
       email: "yhkang@bu.ac.kr"
    }
]
const findUserIndex = id => {
    let index = -1;
    let len = users.length;

    console.log (typeof(id))
    for (let i = 0; i < len; i++) {
        if (users[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};

const register = (id, name, email) => {
    let index = findUserIndex(id);
    
    if (index !== -1) return false;
    users = [...users, {id : id, name :name, email :email}]
    
    //users.push({ id, name, email });
    return true;
};

const changeEmail = (id, email) => {
    let index = findUserIndex(id);

    if (index === -1) return false;

    users[index].email = email;
    return true;
};

const deleteUser = id => {
    let index = findUserIndex(id);
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
};

// get all users
router.get('/', (req, res) =>
{
    res.send(users)
})
// get all users
// http://localhost:8000/users/1
router.get('/:id', (req, res) =>
{
    let id = req.params.id;
    id = parseInt(id); 
    const index = findUserIndex(id);
    console.log ("Get id : ", id);
    if (index === -1)
       return res.status(401).send("there is no id");
    
    res.send(users[index])
})

// register a users information into users
router.post("/register", (req, res) => {
    let id = req.body.id;
    id = parseInt(id); 
    let name = req.body.name;
    let email = req.body.email;

    if (!register(id, name, email)) return res.status(401).send("duplicate id");
    res.send(`success to register ${id}'s account`);
});
// update
router.put("/:id", (req, res) => {
    let id = req.params.id;
    id = parseInt(id); 
    let email = req.body.email;

    if (!changeEmail(id, email))
        return res.status(401).send("email change fail");
    res.send(`success to change ${id}'s email`);
});

router.delete("/:id", (req, res) => {
    let id = req.params.id;
    const delete_id = parseInt(id); 
    console.log ("delete id type :", typeof(delete_id))
    console.log('delete : ', delete_id)

    if (!deleteUser(delete_id)) return res.status(401).send("delete fail");
    res.send(`success to delete ${delete_id}'s account`);
});


module.exports = router;