const fs = require('fs');
const path = require('path');

exports.createDirectory = async (directoryPath) => {
    const directory = path.normalize(directoryPath);
  
    return new Promise((resolve, reject) => {
      fs.stat(directory, (error) => {
        if (error) {
          if (error.code === 'ENOENT') {
            // ${__dirname}/directoryPath
            fs.mkdir(`directoryPath`, {recursive: true}, (error) => {
              if (error) {
                console.log(`fileSystem => ${error}`);
                reject(`fileSystem => ${error}`);
              } else {
                  console.log(`fileSystem => ${directory}`);
                  
                resolve(directory);
              }
            });
          } else {
            console.log(`fileSystem => ${error}`);
            reject(`fileSystem => ${error}`);
          }
        } else {
            console.log(`fileSystem => ${directory}`);
                  
          resolve(directory);
        }
      });
    });
}