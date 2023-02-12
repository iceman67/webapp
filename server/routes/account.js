let express = require("express");
let fs = require("fs");

const fname = "/Users/mac/api-integrate/src/server/data/Account.json"
const router = express.Router();
let users = [
    {
        id: "1",
        password: "key",
        icon: "https://cdn-icons-png.flaticon.com/512/3884/3884851.png",

    },
    {
        id: "hello",
        password: "1234",
        icon: "https://cdn-icons-png.flaticon.com/512/1373/1373254.png",
    },
    {
        id: "world",
        password: "1234",
        icon: "https://cdn-icons-png.flaticon.com/512/1198/1198293.png",
    },
];

router.use(function (req, res, next) {
    console.log("route to ACCOUNT");
    next();
  });

const findUserIndex = id => {
    let index = -1;
    let len = users.length;
    
    for (let i = 0; i < len; i++) {
        if (users[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};

const register = (id, passwd, icon) => {
    let index = findUserIndex(id);
    
    if (index !== -1) return false;
    users = [...users, {icon: icon, id : id, password :passwd}]
        return true;
};


const changePassword = (id, passwd) => {
    let index = findUserIndex(id);

   if (index === -1) return false;
    users[index].password = passwd;
    console.log (id, " changePasswd to ", passwd )
  
    return true;
};

const deleteUser = id => {
    let index = findUserIndex(id);
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
};

const saveUser = (users) => {
    fs.writeFile(fname, users, (err) => {
        if (err) {
            console.log('Error: ', err);
            return false;
        }
        else {
            console.log('File created');
            return true;
        }
    });
};

const loadUser = (users) => {
    // 위치 확인 필요
    users =  require(fname);
    
   console.log (users[0]);
}

// get all users
router.get('/', (req, res) =>
{
    res.send(users)
})
// 하나의 마운트 경로를 통해 일련의 미들웨어 함수를 하나의 마운트 위치에 로드함 
router.get("/get/:id", (req, res, next) => {
    let id = req.params.id;
    console.log ("Get ", id);
    if (findUserIndex(id) === -1) return res.status(401).send("invalid id");
    
    next(); //연속적으로 다음 함수를 수행함 
     
}, function (req, res) {
    let id = req.params.id;
    res.send(`Hello world ${id}`);
} );

// register a users information into users
router.post("/register", (req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    let icon = req.body.icon;
    console.log (id)
    if (!register(id, password, icon)) return res.status(401).send("duplicate id");
    res.send(`success to register ${id}'s account`);
});

// update
router.put("/:id", (req, res) => {
    let id = req.params.id;
    let passwd = req.body.password;

    if (!changePassword(id, passwd))
        return res.status(401).send("Fail to change password");
    res.send(`success to change ${id}'s password`);
});

router.delete("/:id", (req, res) => {
    let id = req.params.id;
    console.log('delete : ', id)

    if (!deleteUser(id)) return res.status(401).send("delete fail");
    res.send(`success to delete ${id}'s account`);
});

router.post("/save", (req, res) => {
    console.log ("SAVE");
    const accountJSON = JSON.stringify(users)
    if (saveUser(accountJSON) == false) 
        return res.status(401).send("save fail");
    res.send(`success to save account to a file`);
});

router.post("/load", (req, res) => {
    console.log ("LOAD");
    if (loadUser() == false) 
        return res.status(401).send("load fail");
    console.log(users)
    res.send(`success to load account from a file`);
});


module.exports = router;