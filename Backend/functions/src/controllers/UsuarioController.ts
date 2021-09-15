// Models
const router = require("express").Router();
const axios = require('axios');
// Services

router.post("/login-email",async (req:any, res:any) => {
    await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCI8pM53YvV7-9MjqzFGWZy5xXcPGRfTzc', req.body).then((resp:any)=>{
        res.json({
            success: true,
            message: resp.data
        })
      })  
      .catch((error:any)=>{
        res.status(400).json({
            success: false,
            message: error.error
        })
      });
});

module.exports = router;
