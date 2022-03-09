
/**
 * Add <table_name> table.
 *
 * @param {Knex} knex
 */
exports.up = async function(knex) {
  return knex.schema.createTable(
    'transaction',
    (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
      table.string('text', 50).unique()
      table.float('amount')
      table
        .dateTime('created_at')
        .notNullable()
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      table
        .dateTime('updated_at')
        .defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
    },
  )
}

/**
 * Drop <table_name> table.
 *
 * @param {Knex} knex
 */
exports.down =  async function(knex) {
  return knex.schema.dropTable('transaction')
}
