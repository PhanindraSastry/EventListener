    const express = require('express');
    const app = express();
    const port = process.env.PORT||3000;
app.listen(port, () => {
        console.log(`Express app listening at http://localhost:${port}`);
    });
    // Define your method (route handler)
    app.get('/health', (req, res) => {
        var status ={};
        status.message = 'Api is Up and running on Azure function';
        status.code ='OK';
        res.status(200).json(status);
    });

    

    