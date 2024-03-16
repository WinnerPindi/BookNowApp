import jwt from "jsonwebtoken";
import {createError} from "../utils/error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(401, "Token is not valid!"));
        }
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        // Après que verifyToken ait appelé next(), ce code est exécuté.
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next(); // L'utilisateur est authentifié et autorisé, continuer.
        } else {
            next(createError(403, "You are not authorized")); // L'utilisateur n'est pas autorisé.
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        // Après que verifyToken ait appelé next(), ce code est exécuté.
        if (req.user && req.user.isAdmin) {
            next(); // L'utilisateur est authentifié et autorisé, continuer.
        } else {
            next(createError(403, "You are not authorized")); // L'utilisateur n'est pas autorisé.
        }
    });
};


