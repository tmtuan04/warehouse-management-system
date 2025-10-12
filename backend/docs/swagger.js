import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Warehouse Management API",
            version: "1.0.0",
            description:
                "API documentation for Warehouse Management System + AI",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local Server",
            },
        ],
    },
    apis: ["./src/routes/*.js"], // quét comment trong routes
};

export const swaggerSpec = swaggerJSDoc(options);
