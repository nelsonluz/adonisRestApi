'use strict'
const Projeto = use('App/Models/Projeto');
const AutorizacionService = use ('App/Services/AutorizacionService');

class ProjetoController {
   async index( { auth }) {
        const usuario = await auth.getUser();
        return await usuario.projetos().fetch();
    }

    async create({ auth, request }) {
        const usuario = await auth.getUser();
        const { nome } = request.all();
        const projeto = new Projeto();
        projeto.fill({
            nome
        });
        await usuario.projetos().save(projeto);
        return projeto;
    }

    async deletar({ auth, request, params }){
        const usuario = await auth.getUser();
        const { id } = params;
        const projeto = await  Projeto.find(id);
        AutorizacionService.verificarPermiso(projeto, usuario)
        await projeto.delete();
        return projeto;
    }

    async update({ auth, params, request }){
        const usuario = await auth.getUser();
        const { id } = params;
        const projeto = await  Projeto.find(id);
        AutorizacionService.verificarPermiso(projeto, usuario);
        projeto.merge(request.only('nome'));
        await projeto.save();
        return projeto;
    }
}

module.exports = ProjetoController
