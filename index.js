let express = require('express');
let mongoose = require ('mongoose');
let bodyParser = require ('body-parser');
let cors = require ('cors');
// Cross-Origin Resource Sharing
// It allows a client web application to interact with resources in a different domain. 

mongoose.connect("mongodb://127.0.0.1/college")
    .then((res) => {
        console.log("Database Connect...");
    });

// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    mobile: String
},
    {
        timestamps: true
    }
);

// Model
const Student = mongoose.model("student", studentSchema);


let app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());


//CRUD OPERATION-----------------------------------------------------------------

app.get("/", (req, res) => {
    res.send("Welcome to NodeJs")
});

//-----------------------------------------------------------------------------------

app.post("/students", async (req, res) => {
    try {
        const body = req.body;
        const data = {
            name: body.name,
            surname: body.surname,
            email: body.email,
            mobile: body.mobile,
        };
        const addData = await Student.create(data);
        // 2nd Method
        // let { name, surname, email, mobile } = req.body;
        // const addData = await Student.create({name, surname, email, mobile})        res.json({ status: "success", data: addData })
    } catch (err) {
        res.send({ status: "success", data: "Something Wents Wrong !!!" });
    }
});


//---------------------------------------------------------------------------------------------

app.get("/students", async (req, res) => {
    try {
        const allStudents = await Student.find({});
        res.json({ status: "success", data: allStudents})
    } catch (err) {
        res.send({ status: "Failed", data: "Something Wents Wrong" })
    }
});

app.get("/students/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const singleStudent = await Student.findById(studentId);
        res.json({ status: "success", data: singleStudent })
    } catch (err) {
        res.send({ status: "success", data: "Something Wents Wrong !!!" });
    }
});

//----------------------------------------------------------------------------------

app.put("/students/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const body = req.body;

        let updatedData = await Student.findByIdAndUpdate(studentId, body, { new: true });

        res.json({ status: "success", data: updatedData });
    } catch (err) {
        res.json({ status: "ERROR", data: "Something Wents Wrong" });
    }
});

//------------------------------------------------------------------------------------------------

app.delete("/students/:id", async (req, res) => {
    // const studentId = req.params.id;

    try {

        const deletedData = await Student.findByIdAndDelete(req.params.id);
        res.json({ status: "success", data: deletedData });
    } catch (err) {
        res.json({ status: "ERROR", data: "Something Wents Wrong" });
    }
});


//-------------------------------------------------------------------------------------------------------
app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});
