'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tarefa extends Model {
    projeto () {
        return this.belongsTo('App/Models/Projeto')
    }
}

module.exports = Tarefa
