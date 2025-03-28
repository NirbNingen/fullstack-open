const mongoDB = async () => {
  const mongoose = require("mongoose");

  if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
  }

  const password = process.argv[2];

  //const url = `mongodb+srv://naimaoei:${password}@cluster0.9mvxd.mongodb.net/?retryWrites=true&w=majority`;
  const url = `mongodb+srv://naimaoei:${password}@cluster0.9mvxd.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.set("strictQuery", false);
  mongoose.connect(url);
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  });

  const Note = mongoose.model("Note", noteSchema);

  const note = new Note({
    content: "HTML is easy testing is a bit harder on frontend",
    important: true,
  });
  Note.find({ important: true }).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
};
mongoDB();
