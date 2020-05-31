'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.group(()=> {
  Route.post('usuarios/registro', 'UserController.store');
  Route.post('usuarios/login', 'UserController.login');
  // rotas de projetos
  Route.get('projetos', 'ProjetoController.index').middleware('auth');
  Route.post('projetos', 'ProjetoController.create').middleware('auth');
  Route.delete('projetos/:id', 'ProjetoController.deletar').middleware('auth');
  Route.patch('projetos/:id', 'ProjetoController.update').middleware('auth');
  // rotas de tarefas
  Route.get('projetos/:id/tarefas', 'TarefaController.index').middleware('auth');
  Route.post('projetos/:id/tarefas', 'TarefaController.criar').middleware('auth');
  Route.delete('tarefas/:id', 'TarefaController.deletar').middleware('auth');
  Route.patch('tarefas/:id', 'TarefaController.update').middleware('auth');  
}).prefix("api/v1/");
