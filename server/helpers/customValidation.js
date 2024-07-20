const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhoneNumber = (phoneNo) => {
    const phoneRegex = /^\+91[6-9]\d{9}$/; // This regex validates Indian phone numbers starting with +91 and a valid 10-digit number starting with 6-9
    return phoneRegex.test(phoneNo);
};

const validatePassword = (password) => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

module.exports = {
    validateEmail,
    validatePhoneNumber,
    validatePassword
};