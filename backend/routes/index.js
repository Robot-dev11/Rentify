const express = require('express');
const router = express.Router();
const userRouter = require('./users');

router.get('api/v1', (req, res, next) => {
    console.log("Router Working");
})

router.use("/user", userRouter);

module.exports = router;