const properties = require('../configs/properties');
const dbClient = require('../configs/database');
const uniqueId = require("mongodb-autoincrement");
const generateOTP = require('../otp/otp');


module.exports = {
    userRegistration: userRegistration,
    verifyOtp: verifyOtp
}

dbClient.connect((database) => {
    db = database;
});

function userRegistration(req, res) {
    try {
        let input = req.body;
        let _userDetails = {};

        if (!input.firstName || !input.email || !input.mobileNo || !input.countryCode) {
            return res.json({ status: false, statusCode: 400, message: 'parameter missing' });
        } else {
            let _query = { "mobileNo": input.mobileNo };
            db.collection(properties.collection.user_master).findOne(_query, (error, _data) => {
                if (error) {
                    return res.json({ status: false, statusCode: 400, message: 'database error' });
                } else if (_data != null) {
                    if (_data.mobileNo == input.mobileNo) {
                        return res.json({ status: false, statusCode: 400, message: 'mobileNo already in use' });
                    }
                } else {
                    uniqueId.getNextSequence(db, properties.collection.user_master, async (error, autoIndex) => {
                        _userDetails.userId = autoIndex.toString();
                        _userDetails.firstName = input.firstName;
                        _userDetails.email = input.email;
                        _userDetails.mobileNo = input.mobileNo;
                        _userDetails.countryCode = input.countryCode;
                        let _otp = await generateOTP(6);
                        _userDetails.phoneOtp = _otp;

                        db.collection(properties.collection.user_master).insertOne(_userDetails, (error, _result) => {
                            if (error) {
                                return res.json({ status: false, statusCode: 400, message: 'database error' });
                            } else {
                                return res.json({ status: true, statusCode: 200, message: 'user registered successfully' });
                            }
                        })
                    });
                }
            });
        }
    } catch (e) {
        console.log(e.message);
    }
}

function verifyOtp(req, res) {
    try {
        let input = req.body;
        if (!input.countryCode || !input.mobileNo || !input.phoneOtp) {
            return res.json({ status: false, statusCode: 400, message: 'parameter missing' });
        } else {
            let _query = { $and: [{ 'mobileNo': input.mobileNo }, { 'countryCode': input.countryCode }, { 'phoneOtp': input.phoneOtp }] };
            db.collection(properties.collection.user_master).findOne(_query, (error, _data) => {
                if (error) {
                    return res.json({ status: false, statusCode: 400, message: 'database error' });
                } else if (_data != null) {
                    return res.json({ status: true, statusCode: 200, message: 'otp verified successfully' });
                } else {
                    return res.json({ status: false, statusCode: 400, message: 'please confirm otp you have entered' });
                }
            });
        }
    } catch (e) {
        console.log(e.message);
    }
}