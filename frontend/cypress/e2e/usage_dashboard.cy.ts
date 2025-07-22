/// <reference types="cypress" />

describe("Usage Dashboard", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders dashboard title, chart, and table with data", () => {
    cy.contains("Usage Dashboard").should("be.visible");
    cy.contains(/Credits Used/i).should("exist");
    cy.get("svg").should("exist");
    cy.contains("Message ID").should("be.visible");
    cy.contains("Timestamp").should("be.visible");
    cy.contains("Report Name").should("be.visible");
    cy.contains("Credits Used").should("be.visible");
    cy.get("tbody tr").should("have.length.greaterThan", 0);
    cy.contains("Tenant Obligations Report").should("exist");
  });

  it("sorts table by Report Name", () => {
    cy.contains("Report Name").click();
    cy.url().should("include", "sortBy=report_name");
    cy.contains("Report Name").click();
    cy.url().should("include", "sortDir=desc");
  });

  it("sorts table by Credits Used", () => {
    // TODO
  });

  it("preserves sort state in the URL and after reload", () => {
    // TODO
  });

  it("renders empty table and chart if no data", () => {
    // TODO
  });

  it("shows error message if API fails", () => {
    // TODO
  });

  it("filters table rows by report name", () => {
    // TODO
  });
});
