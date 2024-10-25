const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));  // 指定靜態文件夾
const fs = require('fs');  // Node.js 文件系統模組

// 新增預約資料 API
app.post('/api/reservations', (req, res) => {
    const reservation = req.body;
    fs.readFile('reservations.json', 'utf8', (err, data) => {
        if (err) throw err;
        let reservations = JSON.parse(data);
        reservations.push({ ...reservation, status: 'pending' });
        fs.writeFile('reservations.json', JSON.stringify(reservations), (err) => {
            if (err) throw err;
            res.status(201).send('Reservation saved');
        });
    });
});

// 查詢所有預約資料 API
app.get('/api/reservations', (req, res) => {
    fs.readFile('reservations.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});


// 主页路由
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
