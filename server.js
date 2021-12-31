const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get('/puppies/:id', (req, res) => {
    const queryString = req.query;
    const params = req.params;
    const { id } = params;
    console.log('..... app.get [queryString]', queryString);
    console.log('..... app.get [params]', params);
    console.log('..... app.get [params id]', id);

    res.send({
        puppies: [
            {
                id: 1,
                name: '누벨링',
                status: '발랄해요',
                seller: '샤일로',
                imageUrl: 'images/puppy/p1.png',
            },
            {
                id: 2,
                name: '누벨누벨',
                status: '놀고시퍼해요',
                seller: '샤일로',
                imageUrl: 'images/puppy/p2.png',
            },
            {
                id: 3,
                name: '벨누!!',
                status: '싸나워여',
                seller: '샤일로',
                imageUrl: 'images/puppy/p3.png',
            },
        ],
    });
});

app.post('/puppies', (req, res) => {
    const body = req.body;
    res.send({
        reqBody: body,
    });
});

app.listen(port, () => {
    console.log('[app.listen] minseo test server on!! : [PORT] ::', port);
});
