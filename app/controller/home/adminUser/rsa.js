'use strict';

const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const Controller = require('egg').Controller;

class RsaController extends Controller {

  getRsa() {
    const { ctx } = this;
    let publicKey = fs.readFileSync(path.join(__dirname, "../../../../config/rsa_public_key.pem"));
    let privateKey = fs.readFileSync(path.join(__dirname, "../../../../config/rsa_private.pem"))
    ctx.body = publicKey
  }
}

module.exports = RsaController;