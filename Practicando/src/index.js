const app = require('./main');

async function main(){
    await app.listen(app.get('port'));
    console.log('Sever on port ',app.get('port'));
}

main();