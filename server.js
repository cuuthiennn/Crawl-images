const express = require('express');
const app = express();
const port = 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api", require('./router/apis'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});