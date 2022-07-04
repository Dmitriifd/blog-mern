import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import { registerValidation } from './validations/auth.js';

mongoose
	.connect(
		'mongodb+srv://admin:<password>@cluster0.81zmk.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('Db ok');
	})
	.catch((err) => {
		console.log('Db error', err);
	});

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.post('/auth/register', registerValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    res.json({
        success: true
    });
});

app.listen(3000, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server ok');
});
