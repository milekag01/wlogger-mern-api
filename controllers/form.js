const sgMail = require('@sendgrid/mail'); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactForm = (req, res) => {
    const { email, name, message } = req.body;
    // console.log(req.body);

    const emailData = {
        to: process.env.EMAIL_TO,
        from: email,
        subject: `Contact form - ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
            <h4>Wlogger | Contact Form:</h4>
            <h3>Sender name: </h3><em>${name}</em>
            <h3>Sender email: </h3><em>${email}</em>
            <h3>Message</h3>
            <p>{message}</p>
            
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://wlogger.com</p>
        `
    };

    sgMail.send(emailData).then(sent => {
        return res.json({
            success: true
        });
    });
};

exports.contactBlogAuthorForm = (req, res) => {
    const { authorEmail, email, name, message } = req.body;
    // console.log(req.body);

    let maillist = [authorEmail, process.env.EMAIL_TO];

    const emailData = {
        to: maillist,
        from: email,
        subject: `Someone messaged you from ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
            <h4>Wlogger | Contact Form:</h4>
            <h3>Sender name: </h3><em>${name}</em>
            <h3>Sender email: </h3><em>${email}</em>
            <h3>Message</h3>
            <p>${message}</p>
            
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://wlogger.com</p>
        `
    };

    sgMail.send(emailData).then(sent => {
        return res.json({
            success: true
        });
    });
};