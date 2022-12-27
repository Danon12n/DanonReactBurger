import "@4tw/cypress-drag-drop";

describe("testing dnd behavior", () => {
    it("dnd testing buns adding", () => {
        cy.visit("http://localhost:3000/#/");
        cy.get("[class^=category_list__]").eq(0).as("BunsCategory");
        cy.get("@BunsCategory")
            .find("[draggable^=true]")
            .first()
            .as("FirstBunCard");

        cy.get("[class^=burger-constructor_infoWrapper__]").as("InfoWrapper");

        cy.get("@FirstBunCard")
            .drag("@InfoWrapper")
            .then((success) => {
                assert.isTrue(success);
            });

        cy.get("@InfoWrapper").should("not.exist");

        cy.get("@FirstBunCard")
            .find("[class^=counter__num]")
            .should("contain", 2);

        cy.get("[class^=button]")
            .invoke("prop", "disabled")
            .should("eq", false);
    });

    it("dnd testing ingredients adding", () => {
        cy.visit("http://localhost:3000/#/");
        cy.get("[class^=category_list__]").eq(1).as("MainCategory");
        cy.get("@MainCategory")
            .find("[class^=ingredient-card_card__]")
            .eq(0)
            .as("FirstMainCard");
        cy.get("@MainCategory")
            .find("[class^=ingredient-card_card__]")
            .eq(1)
            .as("SecondMainCard");

        cy.get("[class^=burger-constructor_infoWrapper__]").as("InfoWrapper");

        cy.get("@FirstMainCard")
            .drag("@InfoWrapper")
            .then((success) => {
                assert.isTrue(success);
            });

        cy.get("@FirstMainCard")
            .find("[class^=counter__num]")
            .should("contain", 1);

        cy.get("@InfoWrapper").should("not.exist");
        cy.get("[class^=burger-constructor_container__]").as(
            "ConstructorContainer"
        );

        cy.get("@SecondMainCard")
            .drag("[class^=burger-constructor_container__]")
            .then((success) => {
                assert.isTrue(success);
            });

        cy.get("@SecondMainCard")
            .find("[class^=counter__num]")
            .should("contain", 1);

        cy.get("[class^=button]").invoke("prop", "disabled").should("eq", true);
    });

    it("dnd testing ingredients deleting", () => {
        cy.visit("http://localhost:3000/#/");
        cy.get("[class^=category_list__]").eq(1).as("MainCategory");
        cy.get("@MainCategory")
            .find("[class^=ingredient-card_card__]")
            .eq(0)
            .as("FirstMainCard");
        cy.get("@MainCategory")
            .find("[class^=ingredient-card_card__]")
            .eq(1)
            .as("SecondMainCard");

        cy.get("[class^=burger-constructor_infoWrapper__]").as("InfoWrapper");

        cy.get("@FirstMainCard")
            .drag("@InfoWrapper")
            .then((success) => {
                assert.isTrue(success);
            });

        cy.get("@InfoWrapper").should("not.exist");

        cy.get("[class^=burger-constructor_container__]").as(
            "ConstructorContainer"
        );

        cy.get("@SecondMainCard")
            .drag("@ConstructorContainer")
            .then((success) => {
                assert.isTrue(success);
            });

        cy.get("@ConstructorContainer")
            .find("[class^=constructor-element]")
            .first()
            .should("contain", "Филе Люминесцентного тетраодонтимформа")
            .find("[class^=constructor-element__action]")
            .click()
            .should("not.exist");

        cy.get("@ConstructorContainer")
            .find("[class^=constructor-element]")
            .first()
            .should("contain", "Мясо бессмертных моллюсков Protostomia")
            .find("[class^=constructor-element__action]")
            .click()
            .should("not.exist");

        cy.get("@ConstructorContainer").should("not.exist");
    });

    it("dnd testing ingredeints swap", () => {
        cy.visit("http://localhost:3000/#/");
        cy.get("[class^=category_list__]").eq(1).as("MainCategory");
        cy.get("@MainCategory")
            .find("[class^=ingredient-card_card__]")
            .eq(0)
            .as("FirstMainCard");
        cy.get("@MainCategory")
            .find("[class^=ingredient-card_card__]")
            .eq(1)
            .as("SecondMainCard");

        cy.get("[class^=burger-constructor_infoWrapper__]").as("InfoWrapper");

        cy.get("@FirstMainCard")
            .drag("@InfoWrapper")
            .then((success) => {
                assert.isTrue(success);
            });

        cy.get("@InfoWrapper").should("not.exist");
        cy.get("[class^=burger-constructor_container__]").as(
            "ConstructorContainer"
        );

        cy.get("@SecondMainCard")
            .drag("[class^=burger-constructor_container__]")
            .then((success) => {
                assert.isTrue(success);
            });

        cy.get("@ConstructorContainer")
            .find("[class^=custom-constructor-element_BurgerPartWrapper__]")
            .first()
            .should("contain", "Филе Люминесцентного тетраодонтимформа")
            .as("DragElem");
        cy.get("@ConstructorContainer")
            .find("[class^=custom-constructor-element_BurgerPartWrapper__]")
            .last()
            .should("contain", "Мясо бессмертных моллюсков Protostomia")
            .as("DropElem");

        cy.get("@DragElem").drag("@DropElem");

        cy.get("@ConstructorContainer")
            .find("[class^=custom-constructor-element_BurgerPartWrapper__]")
            .first()
            .should("contain", "Мясо бессмертных моллюсков Protostomia")
            .as("DragElem");
        cy.get("@ConstructorContainer")
            .find("[class^=custom-constructor-element_BurgerPartWrapper__]")
            .last()
            .should("contain", "Филе Люминесцентного тетраодонтимформа")
            .as("DropElem");
    });
});
