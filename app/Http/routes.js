'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.any('/', 			'SiteController.index')

Route.any('/login', 	'SiteController.login')

Route.any('/signup', 	'SiteController.signup')

Route.any('/logout', 	'SiteController.logout')

Route.any('/test', 		'SiteController.test')


Route.any('/gamelobby', 'LobbyController.list').middleware('isLoggedIn')

Route.any('/newtable', 	'LobbyController.create').middleware('isLoggedIn')

Route.any('/table/:id', 'LobbyController.table').middleware('isLoggedIn')

