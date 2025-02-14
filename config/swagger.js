const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "IMF Gadget API",
            version: "1.0.0",
            description: "API to manage IMF spy gadgets",
        },
        servers: [{
            url: "http://localhost:3000",
            description: "Local server",
        }, ],
    },
    apis: ["./routes/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;