const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "4017c71d625691c8fba378dbf64499a1-us12",
    server: "us12",
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/signup.html");
});

app.post("/", function (req, res) {
  const first = req.body.fName;
  const last = req.body.lName;
  const email = req.body.email;
  console.log(first, last, email);
  const listId = "6139fc96ea";
    const subscribingUser = {
    firstName: first,
    lastName: last,
    email: email
    };

    async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
        }
  });

  console.log(
    `Successfully added contact as an audience member. The contact's id is ${
      response.id
    }.`)
    if (res.statusCode === 200){
        res.sendFile(__dirname + `/public/success.html`);
        console.log(
       `Successfully added contact as an audience member. 
       The contact's id is ${response.id}.`
       )} else{
        res.sendFile(__dirname + `/public/failure.html`);
       };
  ;
}

run();
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
