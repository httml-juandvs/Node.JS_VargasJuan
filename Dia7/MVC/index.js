const { showMenu } = require('./views/menuView');
const { handleMenu } = require('./controllers/personaController');

let running = true;

while (running) {
    const option = showMenu();
    running = handleMenu(option);
}
