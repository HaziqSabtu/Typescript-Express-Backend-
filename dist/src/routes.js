"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_controller_1 = require("./controller/comment.controller");
const post_controller_1 = require("./controller/post.controller");
const product_controller_1 = require("./controller/product.controller");
const session_controller_1 = require("./controller/session.controller");
const user_controller_1 = require("./controller/user.controller");
const requireUser_1 = __importDefault(require("./middleware/requireUser"));
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const comment_schema_1 = require("./schema/comment.schema");
const post_schema_1 = require("./schema/post.schema");
const product_schema_1 = require("./schema/product.schema");
const session_schema_1 = require("./schema/session.schema");
const user_schema_1 = require("./schema/user.schema");
function routes(app) {
    app.get("/healthcheck", (req, res) => {
        res.sendStatus(200);
    });
    app.post("/api/users", (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    //byby
    app.get("/api/users", requireUser_1.default, user_controller_1.getUserHandler);
    app.put("/api/users/update", [requireUser_1.default, (0, validateResource_1.default)(user_schema_1.updateUserSchema)], user_controller_1.updateUserHandler);
    app.post("/api/sessions", (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.get("/api/sessions", requireUser_1.default, session_controller_1.getUserSessionHandler);
    app.delete("/api/sessions", requireUser_1.default, session_controller_1.deleteSessionHandler);
    app.post("/api/products", [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.createProductSchema)], product_controller_1.createProductHandler);
    app.put("/api/products/:productId", [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.updateProductSchema)], product_controller_1.updateProductHandler);
    app.get("/api/products/:productId", [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.getProductSchema)], product_controller_1.getProductHandler);
    app.delete("/api/products/:productId", [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.deleteProductSchema)], product_controller_1.deleteProductHandler);
    app.post("/api/posts", [requireUser_1.default, (0, validateResource_1.default)(post_schema_1.createPostSchema)], post_controller_1.createPostHandler);
    app.post("/api/getallpost", requireUser_1.default, post_controller_1.getAllPostsHandler);
    app.post("/api/comments", [requireUser_1.default, (0, validateResource_1.default)(comment_schema_1.createCommentSchema)], comment_controller_1.createCommentHandler);
}
exports.default = routes;
