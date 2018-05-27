var mysql = require('mysql');
var express = require('express');
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const url = require('url');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));
var urlencodedParser = bodyParser.urlencoded({ extended: true })

//mysql COnnection

var db = mysql.createConnection(
    {
        host: "localhost",
        port: 3306,
        database: "recibase",
        user: "root",
        password: "purwahariyanto",
        multipleStatements: true
    }
);



db.connect();

app.get('/data', (req, res) => {
    var sql = `SELECT * from nama_resep nr 
    join user_data ud on nr.user_Id = ud.user_ID
     where nr.status= 'no'`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

app.get('/data/all', (req, res) => {
    var sql = `SELECT * from nama_resep nr`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

app.get('/user', (req, res) => {
    var sql = `SELECT * from user_data where role= ?`
    var status = 'user'
    db.query(sql, status, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})


app.get('/data/:id', (req, res) => {
    var sql = `SELECT * from nama_resep
    WHERE status= 'no' && recipe_name like '%${req.params.id}%' || type_of_dish like '%${req.params.id}%'`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })


})

app.get('/login/all', (req, res) => {
    console.log('ini isi', req.params.id);
    var sql = `SELECT * from user_data`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })


})

app.get('/dashboard/:id', (req, res) => {
    console.log('ini isi', req.params.id);
    var sql = `SELECT * from nama_resep
    
    WHERE user_Id = '${req.params.id}' && status = 'no'`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })


})

// app.get('/login', (req,res)=>{
//     var sql=`SELECT * from user_data`
//     db.query(sql, (err, result)=>{
//         if(err) throw err;
//         console.log(result);
//         res.send(result);
//     })


// })

app.get('/data/details/:id', (req, res) => {
    var sql1 = `SELECT * from nama_resep  WHERE recipe_Id = '${req.params.id}';`
    var sql2 = `SELECT * from tabel_alat  WHERE resep_Id = '${req.params.id}';`
    var sql3 = `SELECT * from tabel_bahan  WHERE resep_Id = '${req.params.id}';`
    var sql4 = `SELECT * from tabel_bumbu  WHERE resep_Id = '${req.params.id}';`
    db.query(sql1 + sql2 + sql3 + sql4, (err, resep) => {
        if (err) throw err;
        res.json({ resep });
    })

})

app.post('/register', urlencodedParser, function (req, res) {
    var sql = `select user_id, user_name from user_data where user_email=?`;

    db.query(sql, [req.body.inputEmail], function (err, rows) {
        if (err) throw err;

        if (rows.length > 0) {

        }
        else {
            var sql2 = `Insert Into user_data (user_name, user_password, user_email)
            values (?, ?, ?);`
            db.query(sql2, [req.body.inputName, req.body.inputPassword, req.body.inputEmail],
                function (err, result) {
                    if (err) throw err;
                    console.log(result)
                })
        }
    });
})


app.post('/visit', urlencodedParser, function (req, res) {

    var sql = `update nama_resep set resep_visit=? where recipe_Id = ?`

    db.query(sql, [req.body.recipevisit, req.body.recipe_Id])
})


app.post('/recipe', urlencodedParser, function (req, res) {


    var sql1 = `Insert Into nama_resep (recipe_name, user_Id, recipe_steps, resep_visit, type_of_dish)
            values (?, ?, ?, ?, ?);`
    db.query(sql1, [req.body.inputNamaResep, req.body.inputuser, req.body.inputstep, req.body.inputvisit, req.body.inputjenis],
        function (err, result) {
            if (err) throw err;
            console.log(result)
        })


    for (i = 0; i < req.body.inputbahan.length; i++) {
        var sql2 = `Insert Into tabel_bahan SET ?;`
        db.query(sql2, req.body.inputbahan[i],
            function (err, result) {
                if (err) throw err;
                console.log(result)
            })
    }

    for (i = 0; i < req.body.inputbumbu.length; i++) {
        var sql3 = `Insert Into tabel_bumbu SET ?;`
        db.query(sql3, req.body.inputbumbu[i],
            function (err, result) {
                if (err) throw err;
                console.log(result)
            })
    }

    for (i = 0; i < req.body.inputalat.length; i++) {
        var sql4 = `Insert Into tabel_alat SET ?;`
        db.query(sql4, req.body.inputalat[i],
            function (err, result) {
                if (err) throw err;
                console.log(result)
            })
    }



});

//Delete

app.post('/delete/:id', function (req, res) {
    var sql = `update nama_resep set status='yes' where recipe_Id= ?`;


    db.query(sql, req.params.id,
        function (err, result) {
            if (err) throw err;
            console.log(result)

        });

})

app.post('/update/:id', urlencodedParser, function (req, res) {

    var sql1 = 'update nama_resep set ? where ?';
    var values = [
        {
            recipe_name: req.body.inputNamaResep,
            recipe_steps: req.body.inputstep,
            type_of_dish: req.body.inputjenis
        },
        {
            recipe_Id: req.params.id
        }
    ]

    db.query(sql1, values, function (err, result) {
        if (err) throw err;
    })

    for (i = 0; i < req.body.inputbahan.length; i++) {
        var sql2 = `update tabel_bahan set nama=?,jumlah=?,satuan=? where bahan_Id=?`;
        db.query(sql2, [req.body.inputbahan[i].nama, req.body.inputbahan[i].jumlah, req.body.inputbahan[i].satuan, req.body.inputbahan[i].bahan_Id],
            function (err, result) {
                if (err) throw err;
                console.log(result)
            })
    }

})

app.listen(3300);