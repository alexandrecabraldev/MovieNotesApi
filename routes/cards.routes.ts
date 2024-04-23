import {  Router } from "express";
import verifyCards from "../middlewares/verifyCards";
import cardsControllers from "../controllers/cardsControllers";
import { verifyAuth } from "../server";

export const routesCards = Router();

routesCards.route('/search')
    .post(verifyAuth,cardsControllers.searchCard)

routesCards.use(verifyAuth)
routesCards.route('/')
.post(verifyCards.verifyCardInformation, cardsControllers.createCard)
.get(cardsControllers.getCardsUser)

    