var ETT = artifacts.require("./ETT.sol");
var fs = require("fs");
module.exports = function(deployer) {
  deployer.deploy(ETT).then(() => {
    if (ETT._json) {
      fs.writeFile("deployedABI", JSON.stringify(ETT._json.abi, 2), (err) => {
        if (err) throw err;
        console.log(
          `The abi of ${ETT._json.contractName} is recorded on deployedABI file`
        );
      });
      fs.writeFile("deployedAddress", ETT.address, (err) => {
        if (err) throw err;
        console.log(
          `The deployed contract address * ${ETT.address} * is recorded on deployedAddress file`
        );
      });
    }
  });
};
