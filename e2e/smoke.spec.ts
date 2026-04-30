import { expect, test } from "@playwright/test";

test("homepage renders core sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /AI 工具垂直导航|帮中文内容团队更快筛到真正能落地的 AI 工具/ })).toBeVisible();
  await expect(page.getByRole("banner").getByRole("link", { name: "提交工具" }).first()).toBeVisible();
});

test("newsletter form posts to the API and shows success state", async ({ page }) => {
  let payload = "";

  await page.route("**/api/newsletter", async (route) => {
    payload = route.request().postData() ?? "";
    await route.fulfill({
      status: 303,
      headers: {
        location: "/?newsletter=success"
      }
    });
  });

  await page.goto("/");
  await page.getByPlaceholder("输入邮箱，接收每周 AI 工具精选").fill("editor@example.com");
  await Promise.all([page.waitForURL(/newsletter=success/), page.getByRole("button", { name: "订阅" }).click()]);

  expect(payload).toContain("email=editor%40example.com");
  await expect(page.getByText("订阅已记录")).toBeVisible();
});

test("submit form posts to the API and shows success state", async ({ page }) => {
  let payload = "";

  await page.route("**/api/submissions", async (route) => {
    payload = route.request().postData() ?? "";
    await route.fulfill({
      status: 303,
      headers: {
        location: "/submit?status=success"
      }
    });
  });

  await page.goto("/submit");
  await page.getByPlaceholder("工具名").fill("Workflow Pilot");
  await page.getByPlaceholder("官网链接").fill("https://workflow-pilot.example.com");
  await page.getByPlaceholder("所属分类").fill("AI 写作");
  await page.getByPlaceholder("联系人").fill("Lin");
  await page.getByPlaceholder("联系邮箱").fill("lin@example.com");
  await page.getByPlaceholder("补充说明").fill("专注中文工作流自动化。");

  await Promise.all([page.waitForURL(/status=success/), page.getByRole("button", { name: "提交审核" }).click()]);

  expect(payload).toContain("toolName=Workflow+Pilot");
  expect(payload).toContain("website=https%3A%2F%2Fworkflow-pilot.example.com");
  await expect(page.getByText("提交成功，运营者已收到这条工具线索。")).toBeVisible();
});

test("tool CTA sends a click event before leaving the page", async ({ page, context }) => {
  let clickPayload = "";

  await page.route("**/api/click", async (route) => {
    clickPayload = route.request().postData() ?? "";
    await route.fulfill({ status: 204 });
  });

  await context.route("https://www.notion.so/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<html><body>Notion</body></html>"
    });
  });

  await page.goto("/tools/notion-ai");
  await Promise.all([page.waitForURL(/notion\.so/), page.getByRole("link", { name: "访问官网" }).click()]);

  expect(clickPayload).toContain('"toolSlug":"notion-ai"');
  expect(clickPayload).toContain('"sourcePage":"/tools/notion-ai"');
});
