var encrypt = require("./encrypt.js");
var fs = require("fs");
var readline = require("readline");
var colors = require("colors");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log("encryptor".bgRed);
rl.question("encrypt=0 decrypt=1 generate=2: ",(c)=>{
  if(c=="0") {
    rl.question("file: ",(x)=>{
      if(fs.existsSync(x)) {
        rl.question("public key: ",(sd) => {
          if(fs.existsSync(sd)) {
            rl.question("output file: ",(sf)=>{
              fs.writeFileSync(sf,encrypt.encrypt(fs.readFileSync(x).toString(),fs.readFileSync(sd).toString()));
              process.exit(0);
            });
          } else { process.exit(0); }
        });
      } else { process.exit(0); }
    });
  } else if(c=="1") {
    rl.question("file: ",(x)=>{
      if(fs.existsSync(x)) {
        rl.question("private key: ",(sd) => {
          if(fs.existsSync(sd)) {
            rl.question("output file: ",(sf)=>{
              fs.writeFileSync(sf,encrypt.decrypt(fs.readFileSync(x).toString(),fs.readFileSync(sd).toString()));
              process.exit(0);
            });
          } else { process.exit(0); }
        });
      } else { process.exit(0); }
    });
  } else if(c=="2") {
    rl.question("file name: ",(z)=>{
      var v = encrypt.generate();
      fs.writeFileSync(z+".pbckey",v.publicKey);
      fs.writeFileSync(z+".prvkey",v.privateKey);
      process.exit(0);
    });
  } else { process.exit(0); }
});
