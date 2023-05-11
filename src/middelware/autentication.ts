/* importar libreria jsonwebtoken */
import jwt from 'jsonwebtoken'

/*   Generar token*/

export let genAccessToken = (user = '') => {
    const SEED_AUTENTICACION = 'hola';
	return jwt.sign({
		user
	}, SEED_AUTENTICACION, { expiresIn: '10m' }
	)
}

/* Autenticar token */

export let VerifyToken = (req: any, res: any, next: any) => {
	let token = req.get('Authorization');
	const SEED_AUTENTICACION = 'hola';

	jwt.verify(token, SEED_AUTENTICACION, (err: any, decoded: any) => {
		if (err) {
			return res.status(200).json({
				status: 302,
				message: 'Token Invalido',
			});
		}
		req.usuario = decoded.user;
		next();
	});

	/*res.json({
		token:token
	});*/
};