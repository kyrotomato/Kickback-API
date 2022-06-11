//require
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(require('./routes'));
//port and middleware
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//mongoose 
//mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//app.listen
app.listen(PORT, () => console.log(`You are successfully connected to localhost: ${PORT}`));
