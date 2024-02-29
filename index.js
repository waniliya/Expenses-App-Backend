import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import RecordRoute from "./routes/RecordRoute.js";
import Auth from "./routes/AuthRoute.js";
//import Money from "./models/MoneyModel.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
});
/*(async()=>{
    await db.sync();      //sequalize creates table in db automatically use once only
})();*/

app.use(session({
    secret:process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store:store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));

app.use(express.json()); 
app.use(UserRoute);
app.use(RecordRoute);
app.use(Auth);
//store.sync();
app.listen(process.env.APP_PORT, ()=> {
    console.log('Server is running at port 5000');
   
});


