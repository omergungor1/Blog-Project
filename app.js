const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const blog = {
        id: 1,
        title: 'My first blog',
        description: 'This is my first blog'
    }

    res.send(blog);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});