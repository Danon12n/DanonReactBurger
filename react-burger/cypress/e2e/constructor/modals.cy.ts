describe("testing modals mehavior", () => {
    it("modal closing by button test", () => {
        cy.visit("http://localhost:3000/#/");
        cy.get("[class^=category_list__]").eq(1).as("MainCategory");
        cy.get("@MainCategory")
            .find("[class^=ingredient-card_card__]")
            .eq(0)
            .as("FirstMainCard");

        cy.get("@FirstMainCard").click();

        cy.url().should(
            "eq",
            "http://localhost:3000/#/ingredients/60d3b41abdacab0026a733c8"
        );

        cy.get("[class^=modal_modal__]").should("exist");

        cy.get("[class^=modal_modal__]").find("button").click();

        cy.get("[class^=modal_modal__]").should("not.exist");

        cy.url().should("eq", "http://localhost:3000/#/");
    });

    it("modal closing by ESC test", () => {
        cy.visit("http://localhost:3000/#/");
        cy.get("[class^=category_list__]").eq(1).as("MainCategory");
        cy.get("@MainCategory")
            .find("[class^=ingredient-card_card__]")
            .eq(0)
            .as("FirstMainCard");

        cy.get("@FirstMainCard").click();

        cy.url().should(
            "eq",
            "http://localhost:3000/#/ingredients/60d3b41abdacab0026a733c8"
        );

        cy.get("[class^=modal_modal__]").should("exist");

        cy.get("[class^=modal_modal__]").trigger("keydown", { key: "Escape" });

        cy.get("[class^=modal_modal__]").should("not.exist");

        cy.url().should("eq", "http://localhost:3000/#/");
    });

    it("modal closing by clicking on modal wrapper test", () => {
        cy.visit("http://localhost:3000/#/");
        cy.get("[class^=category_list__]").eq(1).as("MainCategory");
        cy.get("@MainCategory")
            .find("[class^=ingredient-card_card__]")
            .eq(0)
            .as("FirstMainCard");

        cy.get("@FirstMainCard").click();

        cy.url().should(
            "eq",
            "http://localhost:3000/#/ingredients/60d3b41abdacab0026a733c8"
        );

        cy.get("[class^=modal-overlay_overlay__]").should("exist");

        cy.get("[class^=modal-overlay_overlay__]").click("top", {
            force: true,
        });

        cy.get("[class^=modal-overlay_overlay__]").should("not.exist");

        cy.url().should("eq", "http://localhost:3000/#/");
    });
});
