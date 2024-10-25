const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));  // 指定靜態文件夾

// 主页路由
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
