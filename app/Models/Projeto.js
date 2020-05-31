'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Projeto extends Model {
    user () {
        return this.belongsTo('App/Models/User')
    }
    tarefas () {
        return this.hasMany('App/Models/Tarefa')
    }    
}

module.exports = Projeto
