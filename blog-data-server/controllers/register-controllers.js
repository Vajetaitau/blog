var menuRouter = require('./menu-router')

module.exports = function(app) {
    return {
        registerControllers: function() {
            console.log('Registering controllers!');        
            app.get('/', function(request, response) {
                response.send('Hello xxxworld!');
            });
            app.use('/menu', menuRouter);
        }
    };
};