'use strict'
const Projeto = use('App/Models/Projeto');
const Tarefa = use('App/Models/Tarefa')
const AutorizacionService = use ('App/Services/AutorizacionService');


class TarefaController {
    async index ({ auth, request, params}){
        const usuario = await auth.getUser();
        const { id } = params;
        const projeto = await Projeto.find(id);
        AutorizacionService.verificarPermiso(projeto, usuario);
        return await projeto.tarefas().fetch();
    }


    async criar({ auth, request, params}) {
        const usuario = await auth.getUser();
        const { descricao } = request.all();
        const { id } = params;
        const projeto = await Projeto.find(id);
        AutorizacionService.verificarPermiso(projeto, usuario);
        const tarefa = new Tarefa();
        tarefa.fill({
            descricao
        });
        await projeto.tarefas().save(tarefa);
        return tarefa;
    }

}

module.exports = TarefaController
