const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sprint project 2 - Protalento",
            version: "1.0.0",
            description: "Proyecto 2 para acamica DWBE"
        },
        servers: [
            {
                url: "../",
                description: "Local server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["../src/routes/*.js"]

}

module.exports = swaggerOptions;
