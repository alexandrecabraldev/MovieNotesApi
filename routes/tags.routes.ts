import { Router } from "express";
import tagsController from "../controllers/tagsController"

export const routerTags = Router();

routerTags.route('/:id')
    .get(tagsController.getTags)