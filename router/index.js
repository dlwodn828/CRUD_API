// var express = require('express');
// var router = express.Router();

// // router의 get()함수를 이용해 requets URL('/')에 대한 업무 처리 로직 정의
// router.get('/', function(req,res,next){
//     res.send('index page');
// })

// // 모듈에 등록해야 app.js에서 app.use함수를 통해서 사용가능
// module.exports = router;


module.exports = function(app, fs)
{
    app.get('/', function(req,res){
        res.render('index',{
            title : "My HomePage",
            length: 5
        });
    });

    app.get('/list', function(req, res){
        fs.readFile(__dirname+"/../data/user.json", 'utf8',function(err, data){
            console.log(data);
            res.send(data);
        });
    });

    app.get('/getUser/:username', function(req, res){
        fs.readFile(__dirname + "/../data/user.json", 'utf8', function(err,data){
            var users = JSON.parse(data);
            res.json(users[req.params.username]);
        });
    });

    // user 추가하기
    app.post('/addUser/:username', function(req, res){
        var result = { };
        var username = req.params.username;

        if(!req.body["password"]||!req.body["name"]){
            result["success"]=0;
            result["error"]="invalid request";
            res.json(result);
            return;
        }

        fs.readFile(__dirname+"/../data/user.json", 'utf8', function(err,data){
            var users = JSON.parse(data);
            if(users[username]){
                result["success"]=0;
                result["error"]="duplication";
                res.json(reuslt);
                return;
            }

             // Add to data
            users[username] = req.body;

            fs.writeFile(__dirname+"/../data/user.json", JSON.stringify(users,null,'\t'), "utf8", function(err,data){
                result = {"success":1};
                res.json(result);
            });

        });

        app.put('/updateUser/:username', function(req, res){

            var result = {  };
            var username = req.params.username;
    
            // CHECK REQ VALIDITY
            if(!req.body["password"] || !req.body["name"]){
                result["success"] = 0;
                result["error"] = "invalid request";
                res.json(result);
                return;
            }
    
            // LOAD DATA
            fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
                var users = JSON.parse(data);
                // ADD/MODIFY DATA
                users[username] = req.body;
    
                // SAVE DATA
                fs.writeFile(__dirname + "/../data/user.json",
                             JSON.stringify(users, null, '\t'), "utf8", function(err, data){
                    result = {"success": 1};
                    res.json(result);
                })
            })
        });
        // app.put('/updateUser/:username', function(req, res){
        //     var result = { };
        //     var username = req.params.username;
        //     console.log("22");
    
        //     if(!req.body["password"]||!req.body["name"]){
        //         result["success"]=0;
        //         result["error"]="invalid request";
        //         res.json(result);
        //         return;
        //     }
    
        //     fs.readFile(__dirname+"/../data/user.json", 'utf8', function(err,data){
        //         var users = JSON.parse(data);
    
        //          // Add to data
        //         users[username] = req.body;
    
        //         fs.writeFile(__dirname+"/../data/user.json", JSON.stringify(users,null,'\t'), "utf8", function(err,data){
        //             result = {"success":1};
        //             res.json(result);
        //             console.log("hi");
        //         });
        //     });
        // });

        app.delete('/deleteUser/:username', function(req,res){
            var username = req.params.username;
            var result ={ };
            fs.readFile(__dirname+"/../data/user.json", 'utf8', function(err,data){
                var users = JSON.parse(data);

                if(!users[username]){
                    result["success"] = 0;
                    result["error"] = "not found";
                    res.json(result);
                    return;
                }
    
                 // delete data
                delete users[username];
    
                fs.writeFile(__dirname+"/../data/user.json", JSON.stringify(users,null,'\t'), "utf8", function(err,data){
                    result["success"] = 1;
                    res.json(result);
                    
                    // return;
                });
            });
        })


       
    })
}
