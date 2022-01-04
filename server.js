const express = require('express');
const cors = require('cors');
const models = require('./models/index.js');
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

// 메인 페이지
app.get('/puppies', (req, res) => {
    models.PuppyDB.findAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'name', 'status', 'seller', 'imageUrl', 'createdAt'],
    })
        .then((result) => {
            console.log('..... app.get main [result]', result);
            res.send({
                puppies: result,
            });
        })
        .catch((err) => {
            console.error(err);
            res.send('app.get 메인페이지 에러발생!');
        });
});

// 서브 상세 페이지
app.get('/puppies/:id', (req, res) => {
    const queryString = req.query;
    const params = req.params;
    const { id } = params;
    console.log('..... app.get [queryString]', queryString);
    console.log('..... app.get [params]', params);
    console.log('..... app.get [params id]', id);

    models.PuppyDB.findOne({
        where: {
            id: id,
        },
    })
        .then((result) => {
            console.log('..... app.get sub [result]', result);
            res.send({
                puppy: result,
            });
        })
        .catch((err) => {
            console.error(err);
            res.send('app.get 서브 상세 페이지 에러발생!');
        });
});

app.post('/puppies', (req, res) => {
    const body = req.body;
    const { name, seller, description, status } = body;
    if (!name || !seller || !description || !status) {
        res.send('모든 필드를 입력해 주세요!!!');
    }
    models.PuppyDB.create({
        name: name,
        seller: seller,
        description: description,
        status: status,
    })
        .then((result) => {
            res.send({
                result: result,
            });
        })
        .catch((err) => {
            console.error(err);
            res.send('강아지 업로드에 에러가 발생했습니다.');
        });
});

app.listen(port, () => {
    console.log('[app.listen] minseo test server on!! : [PORT] ::', port);
    models.sequelize
        .sync()
        .then(() => {
            console.log('..... [app.listen] ✓ DB 연결 성공!!');
        })
        .catch((err) => {
            console.error(err);
            console.log('..... [app.listen] ✗ DB 연결 에러!!');
            process.exit();
        });
});
