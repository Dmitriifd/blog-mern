import express from 'express';
import mongoose from 'mongoose';
import checkAuth from './utils/checkAuth.js';
import { getMe, login, register } from './controllers/UserController.js';
import {
	loginValidation,
	postCreateValidation,
	registerValidation,
} from './validations.js';
import { create, getAll, getOne, remove } from './controllers/PostController.js';

mongoose
	.connect(
		'mongodb+srv://admin:<password>@cluster0.81zmk.mongodb.net/blog?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('Db ok');
	})
	.catch((err) => {
		console.log('Db error', err);
	});

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation, login);

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.post('/auth/register', registerValidation, register);

app.get('/auth/me', checkAuth, getMe);

app.get('/posts', getAll);
app.post('/posts', checkAuth, postCreateValidation, create);
app.delete('/posts/:id', checkAuth, remove);
app.get('/posts/:id', getOne);
// app.get('/posts/tags', getLastTags);
// app.patch('/posts/:id', update);

app.listen(3000, (err) => {
	if (err) {
		return console.log(err);
	}

	console.log('Server ok');
});
