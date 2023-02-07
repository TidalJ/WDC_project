var express = require('express');
var router = express.Router();

'use strict';
var nodemailer = require('nodemailer');
var argon2 = require('argon2');


/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('home', { title: 'Express' });
// });

// sign up
// var Users = {
//   Mark: { Username: "Mark", Email: "123@gmail.com", Password: "123456" },
// };

router.post('/sign_up', async function (req, res, next) {
  // console.log(req.body);


  var phash = null;
  try {
    phash = await argon2.hash(req.body.password);
  } catch (err) {
    res.sendStatus(500);
    return;
  }

  console.log(phash);


  if ('username' in req.body && 'email' in req.body && 'password' in req.body) {
    req.pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      let query = "SELECT Username FROM Users WHERE Username = ?;";
      connection.query(query, [req.body.username], function (err, rows, fields) {
        if (err) {
          res.sendStatus(500);
          return;
        }
        if (rows.length > 0) {
          res.sendStatus(409);
          return;
          // res.send("The Username already exists, please change your Username.");
        } else {
          query = "INSERT INTO Users (Username, Email, Password) VALUES (?, ?, ?);";
          connection.query(query, [req.body.username, req.body.email, phash], function (err, rows, fields) {
            if (err) {
              console.log(err);
              res.sendStatus(403);
              return;
            }
            //query = "SELECT User_ID, Username, Email, Password FROM Users WHERE Username = ? AND Password = ?;";
            query = "SELECT User_ID, Username, Email, Password FROM Users WHERE Username = ?;";
            connection.query(query, [req.body.username], function (err, rows, fields) {
              connection.release();
              if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
              }
              if (rows.length > 0) {
                console.log('success');
                console.log(rows);
                req.session.user = rows[0];
                // req.session.user = Users[req.body.username];
                res.sendStatus(200);
              } else {
                console.log('bad login');
                res.sendStatus(401);
              }
            });
          });
        }
      });

    });
  } else {
    console.log('bad request');
    res.sendStatus(400);
  }

});

// var sign_in_flag = false;
// router.get('/', function (req, res, next) {
//   if (sign_in_flag === true) {
//     document.getElementById("log_in").innerText = "Log Out";
//   }
// });

// sign in
router.post('/sign_in', function (req, res, next) {
  // console.log(req.body);
  // if (Users[req.body.username].email === req.body.email) {
  //   console.log("In");
  // }



  if ('username' in req.body && 'password' in req.body) {

    req.pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      let query = "SELECT User_ID, Username, Email, Password FROM Users WHERE Username = ?;";
      connection.query(query, [req.body.username, req.body.password], function (err, rows, fields) {
        connection.release();




        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }

        var loggg = false;

        async function te(sqlP, inputP, res) {
          var argon2 = require('argon2');
          try {
            if (await argon2.verify(sqlP, inputP)) {
              // password match
              // add code here for when user successfully logged in
              console.log("right");
              loggg = true;
              //res.sendStatus(200);
              return 0;
            } else {
              loggg = false;
              console.log("wrong");
              return 1;
            }
          } catch (err) {
            // internal failure
          }
        }


        //var xxx = te(rows[0].Password,req.body.password,res);

        // sleep
        //sl();


        te(rows[0].Password, req.body.password, res).then(function () {


          console.log(rows.length);
          if (loggg === true) {
            console.log('success');
            console.log(rows);
            req.session.user = rows[0];
            // req.session.user = Users[req.body.username];
            res.sendStatus(200);
          } else {
            console.log('bad login');
            res.sendStatus(401);
          }

        });





      });
    });
  } else {
    // console.log('bad request');
    res.sendStatus(400);
  }

});




async function sl() {
  await new Promise(r => setTimeout(r, 2000));
}



// get user information
router.post('/user_information', function (req, res, next) {
  res.json(req.session.user);
  // console.log(req.session.user.Username);
  // req.pool.getConnection( function(err,connection) {
  //   if (err) {
  //     res.sendStatus(500);
  //     return;
  //   }
  //   let query = "SELECT Username, Email, Password FROM Users WHERE Username = ?;";
  //   connection.query(query, [req.session.user.Username], function(err, rows, fields) {
  //     connection.release();
  //     if (err) {
  //       res.sendStatus(500);
  //       return;
  //     }
  //     // res.json(rows);
  //   });
  // });
});

// query people
router.get('/people', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    let query = "SELECT Username, Email FROM Users;";
    connection.query(query, function (err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

// delete people
router.post('/delete_people', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    let query = "DELETE FROM Users WHERE Username = ? AND Email = ?;";
    connection.query(query, [req.body.username, req.body.email], function (err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});

// add event
router.post('/event', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    let query = "INSERT INTO Events (User_ID, Event_name, Start_time, End_time, Detail) VALUES (?, ?, ?, ?, ?);";
    let str = "A new event: " + req.body.name + " has created." + "It will start from " + req.body.start_time + " and end in " + req.body.end_time + ".";
    connection.query(query, [req.session.user.User_ID, req.body.name, req.body.start_time, req.body.end_time, req.body.desc], function (err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      // sendEmail(str, req.session.user.Email);
      res.sendStatus(200);
    });
  });
});

// delete event
router.post('/delete_event', function (req, res, next) {
  req.pool.getConnection(function (err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    let query = "DELETE FROM Events WHERE Event_name = ? AND Start_time = ? AND End_time = ?;";
    connection.query(query, [req.body.name, req.body.start_time, req.body.end_time], function (err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(200);
    });
  });
});

// // send email
// "use strict";
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: 'flying0796@gmail.com', // sender address
//     to: "xiang913737079@163.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     // html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

// var transporter = nodemailer.createTransport({
//   host: 'smtp.163.com',
//   port: 465,
//   service: true,
//   auth: {
//     user: 'xiang913737079@163.com',
//     pass: 'Flying6785'
//   }
// });

// var mailOptions = {
//   from: 'xiang913737079@163.com',
//   to: 'flying0796@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

// Generate SMTP service account from ethereal.email

// send email
// function sendEmail(message, email) {
//   nodemailer.createTestAccount((err, account) => {
//     if (err) {
//       console.error('Failed to create a testing account. ' + err.message);
//       return process.exit(1);
//     }

//     console.log('Credentials obtained, sending message...');

//     // Create a SMTP transporter object
//     let transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       auth: {
//         user: 'marquis.keebler76@ethereal.email',
//         pass: 'tAU2CRZUVz9j7cUH6u'
//       }
//     });

//     let em = email;

//     // Message object
//     let message = {
//       from: 'marquis.keebler76@ethereal.email',
//       to: em,
//       subject: '',
//       text: message,
//     };

//     transporter.sendMail(message, (err, info) => {
//       if (err) {
//         console.log('Error occurred. ' + err.message);
//         return process.exit(1);
//       }

//       console.log('Message sent: %s', info.messageId);
//       // Preview only available when sending through an Ethereal account
//       console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     });
//   });
// }


module.exports = router;
