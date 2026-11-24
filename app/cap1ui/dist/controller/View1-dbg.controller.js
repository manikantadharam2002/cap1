sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, Fragment, JSONModel) => {
    "use strict";

    return Controller.extend("cap1ui.controller.View1", {

        onInit() {

            // Model used by Create/Edit dialog
            this.getView().setModel(
                new JSONModel({
                    mode: "",
                    title: "",
                    name: "",
                    email: "",
                    city: "",
                    context: null
                }),
                "dialogModel"
            );
        },


        // CREATE
        async onCreateCustomer() {

            this.getView().getModel("dialogModel").setData({
                mode: "create",
                title: "Create Customer",
                name: "",
                email: "",
                city: "",
                context: null
            });

            if (!this._oDialog) {

                this._oDialog = await Fragment.load({
                    name: "cap1ui.fragment.CustomerDialog",
                    controller: this
                });

                this.getView().addDependent(this._oDialog);
            }

            this._oDialog.open();
        },


        // EDIT
        async onEditCustomer() {

            const oTable = this.byId("customerTable");

            const oSelectedItem = oTable.getSelectedItem();

            if (!oSelectedItem) {
                MessageToast.show("Please select a customer");
                return;
            }

            const oContext = oSelectedItem.getBindingContext();

            const oData = oContext.getObject();

            this.getView().getModel("dialogModel").setData({
                mode: "edit",
                title: "Edit Customer",
                name: oData.name,
                email: oData.email,
                city: oData.city,
                context: oContext
            });

            if (!this._oDialog) {

                this._oDialog = await Fragment.load({
                    name: "cap1ui.fragment.CustomerDialog",
                    controller: this
                });

                this.getView().addDependent(this._oDialog);
            }

            this._oDialog.open();
        },


        // SAVE
        async onSaveCustomer() {

            const oDialogModel =
                this.getView().getModel("dialogModel");

            const oData = oDialogModel.getData();


            // Validation
            if (!oData.name || !oData.email || !oData.city) {
                MessageToast.show("Please enter all fields");
                return;
            }


            // CREATE
            if (oData.mode === "create") {

                const oModel = this.getView().getModel();

                const oListBinding =
                    oModel.bindList("/Customers");

                oListBinding.create({
                    name: oData.name,
                    email: oData.email,
                    city: oData.city
                });

                MessageToast.show("Customer created");
            }


            // EDIT
            if (oData.mode === "edit") {

                const oContext = oData.context;

                oContext.setProperty(
                    "name",
                    oData.name
                );

                oContext.setProperty(
                    "email",
                    oData.email
                );

                oContext.setProperty(
                    "city",
                    oData.city
                );

                MessageToast.show("Customer updated");
            }

            this._oDialog.close();
        },


        // DELETE
        onDeleteCustomer() {

            const oTable = this.byId("customerTable");

            const oSelectedItem =
                oTable.getSelectedItem();

            if (!oSelectedItem) {
                MessageToast.show("Please select a customer");
                return;
            }

            const oContext =
                oSelectedItem.getBindingContext();

            oContext.delete();

            MessageToast.show("Customer deleted");
        },


        // CANCEL
        onCancelDialog() {

            if (this._oDialog) {
                this._oDialog.close();
            }
        }

    });
});