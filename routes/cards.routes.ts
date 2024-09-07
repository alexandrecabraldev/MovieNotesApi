import {  Router } from "express";
import verifyCards from "../middlewares/verifyCards";
import cardsControllers from "../controllers/cardsControllers";
import authenticationMiddleware from "../middlewares/verifyAuthentication";

export const routesCards = Router();

routesCards.route('/search')
    .post(authenticationMiddleware.verifyAuthentication ,cardsControllers.searchCard)

routesCards.use(authenticationMiddleware.verifyAuthentication)
routesCards.route('/create')
.post(verifyCards.verifyCardInformation, cardsControllers.createCard)


routesCards.route('/').get(cardsControllers.getCardsUser)


    