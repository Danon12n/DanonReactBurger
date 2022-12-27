describe("empty spec", () => {
    before(function () {
        cy.visit("http://localhost:3000");
    });

    it("check Tabs changing styles", function () {
        cy.get("[class^=burger-ingredients_TabsWrapper]").first().as("tab");
        cy.get("@tab").find("[class^=tab]").eq(0).as("BunsTab");
        cy.get("@tab").find("[class^=tab]").eq(1).as("SouceTab");
        cy.get("@tab").find("[class^=tab]").eq(2).as("FillingsTab");

        cy.get("@BunsTab").click();
        cy.get("@BunsTab").should("have.class", "tab_type_current");
        cy.get("@FillingsTab").should("not.have.class", "tab_type_current");
        cy.get("@SouceTab").should("not.have.class", "tab_type_current");

        cy.get("@SouceTab").click();
        cy.get("@SouceTab").should("have.class", "tab_type_current");
        cy.get("@FillingsTab").should("not.have.class", "tab_type_current");
        cy.get("@BunsTab").should("not.have.class", "tab_type_current");

        cy.get("@FillingsTab").click();
        cy.get("@FillingsTab").should("have.class", "tab_type_current");
        cy.get("@BunsTab").should("not.have.class", "tab_type_current");
    });
});
