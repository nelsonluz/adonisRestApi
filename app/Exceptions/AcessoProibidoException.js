'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AcessoProibidoException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(403).json({
      error: 'Acesso não permitido ao recurso!'
    })
  }
}

module.exports = AcessoProibidoException
