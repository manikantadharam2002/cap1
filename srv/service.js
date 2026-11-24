const cds = require("@sap/cds");

module.exports = class CatalogService extends cds.ApplicationService {

    async init() {

        this.before("CREATE", "Customers", (req) => {

            const email = req.data.email;

            if (!email || !email.includes("@")) {
                req.error(400, "Please enter a valid email address");
            }

        });

        await super.init();
    }
};