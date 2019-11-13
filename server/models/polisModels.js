const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://bradleyDB:kiroismypartner@cluster0-klwdv.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: "stock"
  })
  .then(() => console.log(`Connected to Mongo DB`))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

//userSchema
const userSchema = new Schema({
  email_address: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: String,
  favorites: [String]
});

const User = mongoose.model("user", userSchema);

const buySchema = new Schema(
  {
    email_address: String,
    boughtStockId: String,
    purchasedPrice: Number,
    numberOfShares: Number,
    prediction: Number
  },
  {
    timestamps: true
  }
);

const Buy = mongoose.model("buy", buySchema);

//pastStockSchema
const pastStockSchema = new Schema({
  stockSymbol: String,
  changes: [Object]
});
const PastStock = mongoose.model("pastStocks", pastStockSchema);

//messages
const MessageSchema = new Schema(
  {
    user: String,
    message: String
  },
  {
    timestamps: true
  }
);

const Message = mongoose.model("messages", MessageSchema);

//Bcrypt:
const SALT_FACTOR = 10;
const bcrypt = require('bcryptjs');

userSchema.pre('save', (next) => {
  bcrypt.hash(this.password, SALT_FACTOR, (err, hash) => {
    if (err) { 
      return next(err);
    } else { 
      this.password = hash;
      return next();
    }
  })
})

module.exports = {
  User,
  Buy,
  PastStock,
  Message
};
