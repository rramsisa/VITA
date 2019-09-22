import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore(); // Add this

const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());

export const webApi = functions.https.onRequest(main);

app.get('/warmup', (request, response) => {
	response.send('Warming up friend.');
});

app.post('/fights', async (request, response) => {
	try {
		const { winner, losser, title } = request.body;
		const data = {
			winner,
			losser,
			title,
		};
		const fightRef = await db.collection('fights').add(data);
		const fight = await fightRef.get();

		response.json({
			id: fightRef.id,
			data: fight.data(),
		});
	} catch (error) {
		response.status(500).send(error);
	}
});

app.get('/fights/:id', async (request, response) => {
	try {
		const fightId = request.params.id;

		if (!fightId) throw new Error('Fight ID is required');

		const fight = await db
			.collection('fights')
			.doc(fightId)
			.get();

		if (!fight.exists) {
			throw new Error('Fight doesnt exist.');
		}

		response.json({
			id: fight.id,
			data: fight.data(),
		});
	} catch (error) {
		response.status(500).send(error);
	}
});

app.get('/fights', async (request, response) => {
	try {
		const fightQuerySnapshot = await db.collection('fights').get();
		const fights = [];
		fightQuerySnapshot.forEach(doc => {
			fights.push({
				id: doc.id,
				data: doc.data(),
			});
		});

		response.json(fights);
	} catch (error) {
		response.status(500).send(error);
	}
});

app.put('/fights/:id', async (request, response) => {
	try {
		const fightId = request.params.id;
		const title = request.body.title;

		if (!fightId) throw new Error('id is blank');

		if (!title) throw new Error('Title is required');

		const data = {
			title,
		};
		const fightRef = await db
			.collection('fights')
			.doc(fightId)
			.set(data, { merge: true });

		response.json({
			id: fightId,
			data,
		});
	} catch (error) {
		response.status(500).send(error);
	}
});

app.delete('/fights/:id', async (request, response) => {
	try {
		const fightId = request.params.id;

		if (!fightId) throw new Error('id is blank');

		await db
			.collection('fights')
			.doc(fightId)
			.delete();

		response.json({
			id: fightId,
		});
	} catch (error) {
		response.status(500).send(error);
	}
});
