import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  mockIsDatabaseConfigured,
  mockCreateSubmission,
  mockCreateNewsletterSubscriber,
  mockRecordOutboundClick,
  mockSendOpsNotification,
  mockSendNewsletterConfirmation,
  mockIsResendConfigured
} = vi.hoisted(() => ({
  mockIsDatabaseConfigured: vi.fn(),
  mockCreateSubmission: vi.fn(),
  mockCreateNewsletterSubscriber: vi.fn(),
  mockRecordOutboundClick: vi.fn(),
  mockSendOpsNotification: vi.fn(),
  mockSendNewsletterConfirmation: vi.fn(),
  mockIsResendConfigured: vi.fn()
}));

vi.mock("@/lib/db/client", () => ({
  isDatabaseConfigured: mockIsDatabaseConfigured
}));

vi.mock("@/lib/db/repositories", () => ({
  createSubmission: mockCreateSubmission,
  createNewsletterSubscriber: mockCreateNewsletterSubscriber
}));

vi.mock("@/lib/analytics/click", () => ({
  recordOutboundClick: mockRecordOutboundClick
}));

vi.mock("@/lib/mail/resend", () => ({
  sendOpsNotification: mockSendOpsNotification,
  sendNewsletterConfirmation: mockSendNewsletterConfirmation,
  isResendConfigured: mockIsResendConfigured
}));

const { POST: submissionPost } = await import("@/pages/api/submissions");
const { POST: newsletterPost } = await import("@/pages/api/newsletter");
const { POST: clickPost } = await import("@/pages/api/click");
const { GET: healthGet } = await import("@/pages/api/health");

function createRedirect(location: string) {
  return Response.redirect(`https://example.com${location}`, 303);
}

function getRedirectPath(response: Response) {
  const location = response.headers.get("location");
  return location ? new URL(location).pathname + new URL(location).search : null;
}

function createFormRequest(path: string, values: Record<string, string>) {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    formData.set(key, value);
  });

  return new Request(`https://example.com${path}`, {
    method: "POST",
    body: formData
  });
}

function createJsonRequest(path: string, payload: unknown) {
  return new Request(`https://example.com${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockIsDatabaseConfigured.mockReturnValue(true);
  mockIsResendConfigured.mockReturnValue(true);
});

describe("POST /api/submissions", () => {
  it("redirects to validation failure when the form is invalid", async () => {
    const response = await submissionPost({
      request: createFormRequest("/api/submissions", {
        toolName: "",
        website: "not-a-url",
        category: "",
        contactName: "",
        email: "bad-email"
      }),
      redirect: createRedirect
    } as never);

    expect(response.status).toBe(303);
    expect(getRedirectPath(response)).toBe("/submit?status=error&reason=validation");
    expect(mockCreateSubmission).not.toHaveBeenCalled();
  });

  it("writes valid submissions and redirects to success", async () => {
    const response = await submissionPost({
      request: createFormRequest("/api/submissions", {
        toolName: "Workflow Pilot",
        website: "https://workflow-pilot.example.com",
        category: "AI 写作",
        contactName: "Lin",
        email: "LIN@EXAMPLE.COM",
        notes: "  支持中文工作流  "
      }),
      redirect: createRedirect
    } as never);

    expect(mockCreateSubmission).toHaveBeenCalledWith({
      toolName: "Workflow Pilot",
      website: "https://workflow-pilot.example.com",
      category: "AI 写作",
      contactName: "Lin",
      email: "lin@example.com",
      notes: "支持中文工作流"
    });
    expect(mockSendOpsNotification).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(303);
    expect(getRedirectPath(response)).toBe("/submit?status=success");
  });
});

describe("POST /api/newsletter", () => {
  it("redirects to database failure when the database is unavailable", async () => {
    mockIsDatabaseConfigured.mockReturnValue(false);

    const response = await newsletterPost({
      request: createFormRequest("/api/newsletter", {
        email: "editor@example.com",
        source: "homepage"
      }),
      redirect: createRedirect
    } as never);

    expect(response.status).toBe(303);
    expect(getRedirectPath(response)).toBe("/?newsletter=error&reason=database");
    expect(mockCreateNewsletterSubscriber).not.toHaveBeenCalled();
  });

  it("stores the subscriber and sends both internal and subscriber emails", async () => {
    const response = await newsletterPost({
      request: createFormRequest("/api/newsletter", {
        email: "EDITOR@EXAMPLE.COM ",
        source: "homepage"
      }),
      redirect: createRedirect
    } as never);

    expect(mockCreateNewsletterSubscriber).toHaveBeenCalledWith({
      email: "editor@example.com",
      source: "homepage",
      confirmed: false
    });
    expect(mockSendOpsNotification).toHaveBeenCalledTimes(1);
    expect(mockSendNewsletterConfirmation).toHaveBeenCalledWith("editor@example.com");
    expect(response.status).toBe(303);
    expect(getRedirectPath(response)).toBe("/?newsletter=success");
  });
});

describe("POST /api/click", () => {
  it("returns 400 for invalid click payloads", async () => {
    const response = await clickPost({
      request: createJsonRequest("/api/click", {
        toolSlug: "",
        targetUrl: "not-a-url",
        sourcePage: ""
      })
    } as never);

    expect(response.status).toBe(400);
    expect(mockRecordOutboundClick).not.toHaveBeenCalled();
  });

  it("returns 204 and records valid click events", async () => {
    const response = await clickPost({
      request: createJsonRequest("/api/click", {
        toolSlug: "notion-ai",
        targetUrl: "https://www.notion.so/product/ai",
        sourcePage: "/tools/notion-ai"
      })
    } as never);

    expect(response.status).toBe(204);
    expect(mockRecordOutboundClick).toHaveBeenCalledWith({
      toolSlug: "notion-ai",
      targetUrl: "https://www.notion.so/product/ai",
      sourcePage: "/tools/notion-ai"
    });
  });
});

describe("GET /api/health", () => {
  it("returns a non-cacheable health payload with config checks", async () => {
    const response = await healthGet({} as never);
    const body = (await response.json()) as {
      status: string;
      timestamp: string;
      checks: {
        siteUrlConfigured: boolean;
        databaseConfigured: boolean;
        resendConfigured: boolean;
        assetDeliveryMode: "r2" | "local-or-remote";
      };
      notes: {
        screenshotStrategy: string;
      };
    };

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(body.status).toBe("ok");
    expect(body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(body.checks.databaseConfigured).toBe(true);
    expect(body.checks.resendConfigured).toBe(true);
    expect(body.checks.assetDeliveryMode).toBe("local-or-remote");
    expect(body.notes.screenshotStrategy).toContain("public/");
  });
});
