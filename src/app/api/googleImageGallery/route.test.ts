import { POST } from "./route"; // Adjust the import path as needed
import { NextResponse } from "next/server";
import { VertexAI } from "@google-cloud/aiplatform";
import { getAuthSession } from "@/lib/nextauth";

// Mock VertexAI
const mockPredict = jest.fn();
const mockGetGenerativeModel = jest.fn(() => ({
  predict: mockPredict,
}));
jest.mock("@google-cloud/aiplatform", () => ({
  VertexAI: jest.fn(() => ({
    getGenerativeModel: mockGetGenerativeModel,
  })),
}));

// Mock getAuthSession
jest.mock("@/lib/nextauth", () => ({
  getAuthSession: jest.fn(),
}));

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status || 200,
      ok: (init?.status || 200) >= 200 && (init?.status || 200) < 300,
      text: () => Promise.resolve(JSON.stringify(data)), // simple text mock
    })),
    // Adding a constructor mock for new NextResponse("message", { status: xxx })
    // This is a simplified mock; a real NextResponse object has more methods.
    __esModule: true, // This is important for ES modules
    default: jest.fn((data, init) => ({ // Mock for `new NextResponse()`
        json: () => Promise.resolve(data),
        status: init?.status || 200,
        ok: (init?.status || 200) >= 200 && (init?.status || 200) < 300,
        text: () => Promise.resolve(data),
    })),
  },
}));


describe("Google Image Generation API - POST", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env }; // Backup original process.env
    process.env.GOOGLE_PROJECT_ID = "test-project-id";
    process.env.GOOGLE_APPLICATION_CREDENTIALS = "test-credentials.json";
    
    // Reset mocks before each test
    mockPredict.mockReset();
    (getAuthSession as jest.Mock).mockReset();
    (NextResponse.json as jest.Mock).mockReset();
    // Also reset the default export mock for NextResponse if it's used with `new NextResponse()`
    if ((NextResponse as any).default && (NextResponse as any).default.mockReset) {
        (NextResponse as any).default.mockReset();
    }
  });

  afterEach(() => {
    process.env = originalEnv; // Restore original process.env
    jest.clearAllMocks(); // Clear all mocks including those on NextResponse constructor
  });

  it("should return 200 OK with image data for an authenticated user and valid prompt", async () => {
    (getAuthSession as jest.Mock).mockResolvedValue({ user: { id: "test-user-id" } });
    mockPredict.mockResolvedValue([{
      predictions: [{ bytesBase64Encoded: "mockImageData" }],
    }]);
    (NextResponse.json as jest.Mock).mockImplementation((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status || 200,
      ok: true,
    }));

    const mockReq = createMockRequest({ prompt: "A cat on a mat", n: 1 });
    const response = await POST(mockReq);

    expect(getAuthSession).toHaveBeenCalledTimes(1);
    expect(VertexAI).toHaveBeenCalledWith({
      project: "test-project-id",
      location: "us-central1",
    });
    expect(mockGetGenerativeModel).toHaveBeenCalledWith({ model: "imagen@latest" });
    expect(mockPredict).toHaveBeenCalledWith({
      instances: [{ prompt: "A cat on a mat" }],
      parameters: { sampleCount: 1 },
    });
    expect(NextResponse.json).toHaveBeenCalledWith([{ b64_json: "mockImageData" }], { status: 200 });
    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual([{ b64_json: "mockImageData" }]);
  });

  it("should return 401 Unauthorized if user is not authenticated", async () => {
    (getAuthSession as jest.Mock).mockResolvedValue(null);
    
    // Mock the default export (constructor) of NextResponse
    const mockNextResponseInstance = { status: 401, text: () => Promise.resolve("Unauthorized") };
    (NextResponse as any).default = jest.fn(() => mockNextResponseInstance);

    const mockReq = createMockRequest({ prompt: "A cat on a mat" });
    const response = await POST(mockReq);

    expect(getAuthSession).toHaveBeenCalledTimes(1);
    expect(NextResponse.default).toHaveBeenCalledWith("Unauthorized", { status: 401 });
    expect(response.status).toBe(401);
    expect(await response.text()).toBe("Unauthorized");
  });

  it("should return 400 Bad Request if prompt is missing", async () => {
    (getAuthSession as jest.Mock).mockResolvedValue({ user: { id: "test-user-id" } });
    const mockNextResponseInstance = { status: 400, text: () => Promise.resolve("Bad Request: Prompt is required") };
    (NextResponse as any).default = jest.fn(() => mockNextResponseInstance);

    const mockReq = createMockRequest({}); // Missing prompt
    const response = await POST(mockReq);

    expect(getAuthSession).toHaveBeenCalledTimes(1);
    expect(NextResponse.default).toHaveBeenCalledWith("Bad Request: Prompt is required", { status: 400 });
    expect(response.status).toBe(400);
    expect(await response.text()).toBe("Bad Request: Prompt is required");
  });

  it("should return 500 if GOOGLE_PROJECT_ID is not set", async () => {
    (getAuthSession as jest.Mock).mockResolvedValue({ user: { id: "test-user-id" } });
    delete process.env.GOOGLE_PROJECT_ID; // Remove project ID

    const mockNextResponseInstance = { status: 500, text: () => Promise.resolve("Server configuration error: Missing Google Cloud credentials.") };
    (NextResponse as any).default = jest.fn(() => mockNextResponseInstance);
    
    const mockReq = createMockRequest({ prompt: "A test prompt" });
    const response = await POST(mockReq);

    expect(NextResponse.default).toHaveBeenCalledWith("Server configuration error: Missing Google Cloud credentials.", { status: 500 });
    expect(response.status).toBe(500);
    expect(await response.text()).toBe("Server configuration error: Missing Google Cloud credentials.");
  });

  it("should return 500 if GOOGLE_APPLICATION_CREDENTIALS is not set", async () => {
    (getAuthSession as jest.Mock).mockResolvedValue({ user: { id: "test-user-id" } });
    delete process.env.GOOGLE_APPLICATION_CREDENTIALS; // Remove credentials

    const mockNextResponseInstance = { status: 500, text: () => Promise.resolve("Server configuration error: Missing Google Cloud credentials.") };
    (NextResponse as any).default = jest.fn(() => mockNextResponseInstance);

    const mockReq = createMockRequest({ prompt: "A test prompt" });
    const response = await POST(mockReq);
    
    expect(NextResponse.default).toHaveBeenCalledWith("Server configuration error: Missing Google Cloud credentials.", { status: 500 });
    expect(response.status).toBe(500);
    expect(await response.text()).toBe("Server configuration error: Missing Google Cloud credentials.");
  });

  it("should return 500 on generic Vertex AI API error", async () => {
    (getAuthSession as jest.Mock).mockResolvedValue({ user: { id: "test-user-id" } });
    mockPredict.mockRejectedValue(new Error("Some API error"));

    const mockNextResponseInstance = { status: 500, text: () => Promise.resolve("Image generation failed. Please try again later.") };
    (NextResponse as any).default = jest.fn(() => mockNextResponseInstance);

    const mockReq = createMockRequest({ prompt: "A valid prompt" });
    const response = await POST(mockReq);

    expect(mockPredict).toHaveBeenCalledTimes(1);
    expect(NextResponse.default).toHaveBeenCalledWith("Image generation failed. Please try again later.", { status: 500 });
    expect(response.status).toBe(500);
    expect(await response.text()).toBe("Image generation failed. Please try again later.");
  });

  it("should return 429 on Vertex AI API quota error", async () => {
    (getAuthSession as jest.Mock).mockResolvedValue({ user: { id: "test-user-id" } });
    mockPredict.mockRejectedValue(new Error("Quota exceeded for your project"));
    
    const mockNextResponseInstance = { status: 429, text: () => Promise.resolve("Image generation quota exceeded. Please try again later.") };
    (NextResponse as any).default = jest.fn(() => mockNextResponseInstance);

    const mockReq = createMockRequest({ prompt: "A valid prompt" });
    const response = await POST(mockReq);

    expect(mockPredict).toHaveBeenCalledTimes(1);
    expect(NextResponse.default).toHaveBeenCalledWith("Image generation quota exceeded. Please try again later.", { status: 429 });
    expect(response.status).toBe(429);
    expect(await response.text()).toBe("Image generation quota exceeded. Please try again later.");
  });

  it("should return 500 on Vertex AI API auth error", async () => {
    (getAuthSession as jest.Mock).mockResolvedValue({ user: { id: "test-user-id" } });
    mockPredict.mockRejectedValue(new Error("Permission denied or authentication failed"));

    const mockNextResponseInstance = { status: 500, text: () => Promise.resolve("Authentication error with image generation service. Please contact support.") };
    (NextResponse as any).default = jest.fn(() => mockNextResponseInstance);

    const mockReq = createMockRequest({ prompt: "A valid prompt" });
    const response = await POST(mockReq);

    expect(mockPredict).toHaveBeenCalledTimes(1);
    expect(NextResponse.default).toHaveBeenCalledWith("Authentication error with image generation service. Please contact support.", { status: 500 });
    expect(response.status).toBe(500);
    expect(await response.text()).toBe("Authentication error with image generation service. Please contact support.");
  });

});

// Helper function to create a mock Request object
function createMockRequest(body: any, headers?: any): Request {
  return {
    json: () => Promise.resolve(body),
    headers: new Headers(headers),
    // Add other properties/methods if your API route uses them
  } as Request;
}
