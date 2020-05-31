'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class RecursoNaoEncontradoException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(404).json({
      error: "O recurso não existe"
    });
  }
}

module.exports = RecursoNaoEncontradoException
