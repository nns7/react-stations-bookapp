describe("未ログインユーザーがログインページを開くと、", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("メールアドレス入力欄が確認できる", () => {
    cy.get(`input[name="email"]`).should("be.visible");
  });
  it("パスワード入力欄が確認できる", () => {
    cy.get(`input[name="password"]`).should("be.visible");
  });
  it("ログインボタンが確認できる", () => {
    cy.get("button").contains("ログイン").should("be.visible");
  });
  it("メールアドレスとパスワードを入力してログインできる", () => {
    cy.get(`input[name="email"]`).type("test@example.com");
    cy.get(`input[name="password"]`).type("test");
    cy.get(`button[type="submit"]`).contains("ログイン").click();
    cy.url().should("contain", "/");
  });
});
