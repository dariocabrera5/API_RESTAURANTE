const mongoose = require("mongoose");
//mongodb+srv://dbrestauranteSprint2:sprint2@cluster0.iqsrd.mongodb.net/test
(async () => {
    const db = await mongoose.connect('mongodb+srv://acamicaproject:sprint3@cluster0.iqsrd.mongodb.net/sprint3db?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("Conectado a la base de datos", db.connection.name);
}
)();
