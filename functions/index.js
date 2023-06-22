
//Se importan las dependencias requeridas, firebase-functions y firebase-admin.
const functions = require('firebase-functions');

//El SDK de Firebase Admin se inicializa mediante admin.initializeApp().
const admin = require('firebase-admin');
admin.initializeApp();

//La función addAdminRole se exporta como una Cloud Function utilizando functions.https.onCall. Esto significa que se puede invocar a través de una solicitud HTTPS.
exports.addAdminRole = functions.https.onCall((data, context) => {
	// get user and add custom claim (admin)
	return admin
		.auth()
		.getUserByEmail(data.email)
		.then((user) => {
			return admin.auth().setCustomUserClaims(user.uid, {
				admin: true,
			});
		})
		.then(() => {
			return {
				message: `Success! ${data.email} se ha creado como admin`,
			};
		})
		.catch((err) => {
			return err;
		});
});
