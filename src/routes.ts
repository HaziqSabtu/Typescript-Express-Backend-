import { Express, Request, Response } from "express";
import { createCommentHandler } from "./controller/comment.controller";
import {
    createPostHandler,
    getAllPostsHandler,
} from "./controller/post.controller";
import {
    createProductHandler,
    deleteProductHandler,
    getProductHandler,
    updateProductHandler,
} from "./controller/product.controller";
import {
    createUserSessionHandler,
    deleteSessionHandler,
    getUserSessionHandler,
} from "./controller/session.controller";
import {
    createUserHandler,
    getUserHandler,
    updateUserHandler,
} from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createCommentSchema } from "./schema/comment.schema";
import { createPostSchema } from "./schema/post.schema";
import {
    createProductSchema,
    deleteProductSchema,
    getProductSchema,
    updateProductSchema,
} from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import {
    createUserSchema,
    getUserSchema,
    updateUserSchema,
} from "./schema/user.schema";
import { updateSession } from "./service/session.service";

function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.post(
        "/api/users",
        validateResource(createUserSchema),
        createUserHandler
    );

    //byby
    app.get("/api/users", requireUser, getUserHandler);

    app.put(
        "/api/users/update",
        [requireUser, validateResource(updateUserSchema)],
        updateUserHandler
    );

    app.post(
        "/api/sessions",
        validateResource(createSessionSchema),
        createUserSessionHandler
    );

    app.get("/api/sessions", requireUser, getUserSessionHandler);

    app.delete("/api/sessions", requireUser, deleteSessionHandler);

    app.post(
        "/api/products",
        [requireUser, validateResource(createProductSchema)],
        createProductHandler
    );
    app.put(
        "/api/products/:productId",
        [requireUser, validateResource(updateProductSchema)],
        updateProductHandler
    );
    app.get(
        "/api/products/:productId",
        [requireUser, validateResource(getProductSchema)],
        getProductHandler
    );
    app.delete(
        "/api/products/:productId",
        [requireUser, validateResource(deleteProductSchema)],
        deleteProductHandler
    );

    app.post(
        "/api/posts",
        [requireUser, validateResource(createPostSchema)],
        createPostHandler
    );

    app.post("/api/getallpost", requireUser, getAllPostsHandler);

    app.post(
        "/api/comments",
        [requireUser, validateResource(createCommentSchema)],
        createCommentHandler
    );
}

export default routes;
