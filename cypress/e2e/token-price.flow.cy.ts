describe("Profile page E2E test", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("should be able to load chart successfully", () => {
		cy.findByText(/ATOM/i).should("be.visible");
		cy.findByText(/7 Days Price Chart/i).should("be.visible");
	});
});
