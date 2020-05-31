'use strict'
const Projeto = use('App/Models/Projeto')

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
        if (projeto.user_id !== user.id){
            return response.status(403).json({
                mensagem: "Você não é dono do Projeto"
            })
        }
        await projeto.delete();
        return projeto;
    }
}

module.exports = ProjetoController
