/* importar libreria jsonwebtoken */
import jwt from 'jsonwebtoken'
const SEED_AUTENTICACION = 'DB2263097D30B64321F7156DDCFCF44C127AAC278E50F9236CBA0C774820A248';

/*   Generar token*/

export let genAccessToken = (user = '') => {
	return jwt.sign({
		user
	}, SEED_AUTENTICACION, { expiresIn: '10m' }
	)
}

/* Autenticar token */

export let VerifyToken = (req: any, res: any, next: any) => {
	let token = req.get('Authorization');
	token = token.replace('Bearer ', '')
	

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