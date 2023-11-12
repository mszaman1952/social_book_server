const port = process.env.PORT || 5000;
const dbUri = process.env.DATABASE_URL;
const jsonKey = process.env.JWT_SECRET;
const smtpUsername = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
module.exports = {
    port,
    dbUri,
    jsonKey,
    smtpUsername,
    smtpPassword
}