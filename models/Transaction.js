const { Model } = require('objection');

class Transaction extends Model {
  static get tableName() {
    return 'transaction';
  }
}

module.exports = Transaction;