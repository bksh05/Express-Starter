import { PassportStatic } from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models';

const SECRET = ((process.env) as any).SECRET;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
};

/**
 * 
 * @param passport 
 * Initializing passport with proper strategy.
 */
export function initializePassport(passport : PassportStatic) {
    passport.use(new JWTStrategy(options, async (payload, done) => {
        try {
            const user = await UserModel.findOne({ _id: payload.sub });
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        } catch (error) {
            done(error, false)
        }
    }))
}
