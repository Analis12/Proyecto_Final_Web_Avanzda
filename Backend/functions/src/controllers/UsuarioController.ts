// Models
const router = require("express").Router();
const axios = require('axios');
// Services

router.post("/login-email",async (req:any, res:any) => {
    await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZXnE1QI_Src6ldGOqtIuCtTsQaILhCMQ', req.body).then((resp:any)=>{
        res.json({
            success: true,
            message: resp.data
        })
      })  
      .catch((error:any)=>{
        console.log(error.data);
        res.status(400).json({
            success: false,
            message: error.error
        })
      });
});

module.exports = router;
