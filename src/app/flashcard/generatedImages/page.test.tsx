import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ImageGallery from "./page"; // Adjust path as needed
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock react-hot-toast
jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
  success: jest.fn(), // Assuming success toasts might be used later
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    refresh: jest.fn(),
    push: jest.fn(), // if you use router.push
    // Add other router methods if used
  })),
  usePathname: jest.fn(() => "/mock-path"), // If usePathname is implicitly used
}));

// Mock child components if they are complex and not directly part of the test focus
// For Heading, Empty, Loader, we can let them render or provide simple mocks
jest.mock("@/app/flashcard/generatedImages/_components/heading", () => ({
  Heading: ({ title, description }: { title: string, description: string }) => (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  ),
}));
jest.mock("@/components/ui/empty", () => ({
  Empty: ({ label }: { label: string }) => <div>{label}</div>,
}));
jest.mock("@/components/ui/loader", () => ({
  Loader: () => <div>Loading...</div>,
}));


describe("ImageGallery Page UI and Interactions", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockedAxios.post.mockReset();
    (toast.error as jest.Mock).mockReset();
    (useRouter as jest.Mock).mockClear();
    // Re-provide a default implementation for axios if needed, or set per test
    mockedAxios.post.mockResolvedValue({ data: [] }); // Default to empty success
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with default state (OpenAI selected)", () => {
    render(<ImageGallery />);
    expect(screen.getByText("Image Generation")).toBeInTheDocument();
    expect(screen.getByText(/Try generating images with OpenAI DALL-E/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Describe the image you want to generate")).toBeInTheDocument();
    // Check for select components - they might be identified by their current value or a label if available
    expect(screen.getByRole('combobox', { name: /api/i, hidden: true })).toBeInTheDocument(); // Shadcn select might not have direct label
    expect(screen.getByRole('combobox', { name: /amount/i, hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /resolution/i, hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate/i })).toBeInTheDocument();
  });

  it("allows selecting Google Imagen, disables resolution, and calls the correct API", async () => {
    const user = userEvent.setup();
    render(<ImageGallery />);

    // Select Google Imagen
    // Shadcn/ui Select components are tricky to test with react-testing-library directly by text.
    // Often, you need to click the trigger and then the item.
    // Let's assume the Select for API has a trigger that can be identified.
    // For robust selectors, you might add data-testid attributes.
    // For now, we'll try to find by role and then by text within listbox.
    
    // Find the API select trigger (might need a more specific selector or data-testid)
    const apiSelectTriggers = screen.getAllByRole('combobox'); // This will get all select triggers
    const apiSelect = apiSelectTriggers[0]; // Assuming API select is the first one
    await user.click(apiSelect);
    await user.click(screen.getByText("Google Imagen"));

    expect(screen.getByText(/Try generating images with Google Imagen/i)).toBeInTheDocument();

    // Verify Resolution select is disabled
    const resolutionSelect = apiSelectTriggers[2]; // Assuming resolution is third
    expect(resolutionSelect).toBeDisabled();

    // Type prompt and submit
    const promptInput = screen.getByPlaceholderText("Describe the image you want to generate");
    await user.type(promptInput, "A futuristic city");
    
    mockedAxios.post.mockResolvedValue({ data: [] }); // Mock API call
    await user.click(screen.getByRole('button', { name: /Generate/i }));

    expect(mockedAxios.post).toHaveBeenCalledWith("/api/googleImageGallery", {
      prompt: "A futuristic city",
      n: 1, // Default amount is "1"
    });
  });

  it("displays images on successful Google API call", async () => {
    const user = userEvent.setup();
    render(<ImageGallery />);
    
    const apiSelectTriggers = screen.getAllByRole('combobox');
    await user.click(apiSelectTriggers[0]); // API Select
    await user.click(screen.getByText("Google Imagen"));

    const promptInput = screen.getByPlaceholderText("Describe the image you want to generate");
    await user.type(promptInput, "A serene lake");

    mockedAxios.post.mockResolvedValue({
      data: [{ b64_json: "mockBase64Data1" }, { b64_json: "mockBase64Data2" }],
    });
    
    await user.click(screen.getByRole('button', { name: /Generate/i }));

    await waitFor(() => {
      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(2);
      expect(images[0]).toHaveAttribute("src", "data:image/png;base64,mockBase64Data1");
      expect(images[1]).toHaveAttribute("src", "data:image/png;base64,mockBase64Data2");
    });
  });

  it("shows toast error on Google API failure", async () => {
    const user = userEvent.setup();
    render(<ImageGallery />);

    const apiSelectTriggers = screen.getAllByRole('combobox');
    await user.click(apiSelectTriggers[0]); // API Select
    await user.click(screen.getByText("Google Imagen"));
    
    const promptInput = screen.getByPlaceholderText("Describe the image you want to generate");
    await user.type(promptInput, "An error prompt");

    mockedAxios.post.mockRejectedValue({
      isAxiosError: true,
      response: { data: "Google API Error Message" },
    });

    await user.click(screen.getByRole('button', { name: /Generate/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Google API Error Message");
    });
  });

  it("allows selecting OpenAI, enables resolution, and calls the correct API", async () => {
    const user = userEvent.setup();
    render(<ImageGallery />);

    // Initially OpenAI is selected, resolution should be enabled
    const apiSelectTriggers = screen.getAllByRole('combobox');
    const resolutionSelect = apiSelectTriggers[2];
    expect(resolutionSelect).not.toBeDisabled();

    // Type prompt and submit (OpenAI is default)
    const promptInput = screen.getByPlaceholderText("Describe the image you want to generate");
    await user.type(promptInput, "A cute cat");
    
    mockedAxios.post.mockResolvedValue({ data: [] });
    await user.click(screen.getByRole('button', { name: /Generate/i }));

    expect(mockedAxios.post).toHaveBeenCalledWith("/api/imageGallery", {
      prompt: "A cute cat",
      amount: "1",
      resolution: "512x512", // Default values
      api: "openai",
    });
  });

  it("updates Heading component props when switching API", async () => {
    const user = userEvent.setup();
    render(<ImageGallery />);

    // Default (OpenAI)
    expect(screen.getByRole("heading", { name: "Image Generation" })).toBeInTheDocument();
    expect(screen.getByText(/Try generating images with OpenAI DALL-E/i)).toBeInTheDocument();
    // Could also check icon/colors if they were exposed via accessible attributes

    // Switch to Google Imagen
    const apiSelectTriggers = screen.getAllByRole('combobox');
    await user.click(apiSelectTriggers[0]);
    await user.click(screen.getByText("Google Imagen"));

    expect(screen.getByText(/Try generating images with Google Imagen/i)).toBeInTheDocument();
    
    // Switch back to OpenAI
    await user.click(apiSelectTriggers[0]);
    await user.click(screen.getByText("OpenAI DALL-E"));
    expect(screen.getByText(/Try generating images with OpenAI DALL-E/i)).toBeInTheDocument();
  });

});
