const AcessoProibidoException = use('App/Exceptions/AcessoProibidoException');
const RecursoNaoEncontradoException =  use('App/Exceptions/RecursoNaoEncontradoException');

class AutorizacionService {
    verificarPermiso(recurso, user){
        if (!recurso){
            throw new RecursoNaoEncontradoException();
        }
        if (recurso.user_id !== user.id){
            throw new AcessoProibidoException();
        };
    }
}

module.exports = new AutorizacionService