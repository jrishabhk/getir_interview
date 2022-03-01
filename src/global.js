const path = require('path');
const fs = require('fs');

global.baseDir = __dirname;
global.rootDir = path.dirname(__dirname);

global.__app = {
    __controllers : {},
    __routes : {},
    __services : {},
    __daos : {},
    __middlewares : {},
    __helpers : {},
    __config : {},
    __root : {
        __daos : path.join(baseDir, 'daos'),
        __services : path.join(baseDir, 'services'),
        __controllers : path.join(baseDir, 'controllers'),
        __routes : path.join(baseDir, 'routes'),
        __middlewares : path.join(baseDir, 'middlewares'),
        __helpers : path.join(baseDir, 'helpers'),
        __config : path.join(baseDir, 'config')
    }
};

function setGlobal(param, filePath) {
   
    fs.readdirSync(filePath).filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== path.basename(module.filename))
    }).forEach(function (name) {
       
        let file = name;
        let namePath = path.join(filePath, file);
        let stats = fs.statSync(namePath)
       
        if(stats.isFile()){
            
            if(file.slice(-3) === '.js') {
                let fileName = file.slice(0, file.indexOf('.'))
                param[fileName] = path.join(filePath, fileName)
            }
            else {
                return;
            }
        }
        else if(stats.isDirectory()){
           
            param[name] = {};
            setGlobal(param[name], namePath)
            return;
        }
    })
}

// set DAOS
setGlobal(__app.__daos, __app.__root.__daos);
// set Services
setGlobal(__app.__services, __app.__root.__services)
// set Resolvers
setGlobal(__app.__routes, __app.__root.__routes)
// set middlewares
setGlobal(__app.__middlewares, __app.__root.__middlewares)
// set helpers
setGlobal(__app.__helpers, __app.__root.__helpers)
//set controllers
setGlobal(__app.__controllers, __app.__root.__controllers)
//set configuration
setGlobal(__app.__config, __app.__root.__config)

