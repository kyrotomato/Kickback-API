//require
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//port and middleware
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(require('./routes'));

//mongoose 
//mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//app.listen
app.listen(PORT, () => console.log(`You are successfully connected to 127.0.0.1: ${PORT}`));
