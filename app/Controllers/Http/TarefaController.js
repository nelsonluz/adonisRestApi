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


    async update({ auth, request, params }){
        const usuario = await auth.getUser();
        const { id } = params;
        const tarefa = await Tarefa.find(id);
        const projeto = await  tarefa.projeto().fetch();
        AutorizacionService.verificarPermiso(projeto, usuario)
        await tarefa.merge(request.only([
            "descricao",
            "completada"
        ]));
        await tarefa.save();
        return tarefa;
    }


    async deletar({ auth, request, params }){
        const usuario = await auth.getUser();
        const { id } = params;
        const tarefa = await Tarefa.find(id);
        const projeto = await  tarefa.projeto().fetch();
        AutorizacionService.verificarPermiso(projeto, usuario)
        await tarefa.delete();
        return tarefa;
    }

}

module.exports = TarefaController
