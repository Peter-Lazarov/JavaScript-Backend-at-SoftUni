const userController = require('express').Router();

const userService = require('../services/userService');
const { getErrorMessage } = require('../utility/errorsUtility');

userController.get('/register', (request, response) => {
    response.render('user/register');
});

userController.post('/register', async (request, response) => {
    const userForm = request.body;

    try {
        const token = await userService.register(userForm);

        response.cookie('user', token);
        response.redirect('/');
    } catch (error) {
        response.render('user/register', { error: getErrorMessage(error) });
    }
});

userController.get('/login', (request, response) => {
    response.render('user/login');
});

userController.post('/login', async (request, response) => {
    const loginData = request.body;
    try {
        const token = await userService.login(loginData);

        response.cookie('user', token);
        response.redirect('/');
    } catch (error) {
        response.render('user/login', { error: getErrorMessage(error) });
    }
});

userController.get('/logout', (request, response) => {
    response.clearCookie('user');
    response.redirect('/');
});

module.exports = userController;
