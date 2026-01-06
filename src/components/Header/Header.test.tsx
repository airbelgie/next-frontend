import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Must import mocked module
import * as authContext from "@/contexts/auth-context";
import { Header } from "./index";

// Mock the module at the top level
vi.mock("@/contexts/auth-context", () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when user is logged out", () => {
    beforeEach(() => {
      vi.mocked(authContext.useAuth).mockReturnValue({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        login: vi.fn(),
        logout: vi.fn(),
      });
    });

    it("displays login and join now buttons", () => {
      render(<Header />);

      expect(
        screen.getByRole("button", { name: /log in/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /join now/i }),
      ).toBeInTheDocument();
    });

    it("has login button that links to /login", () => {
      render(<Header />);

      const loginButton = screen.getByRole("button", { name: /log in/i });
      const link = loginButton.closest("a");
      expect(link).toHaveAttribute("href", "/login");
    });

    it("has join now button that links to /signup", () => {
      render(<Header />);

      const joinButton = screen.getByRole("button", { name: /join now/i });
      const link = joinButton.closest("a");
      expect(link).toHaveAttribute("href", "/signup");
    });

    it("does not show user menu", () => {
      render(<Header />);

      expect(
        screen.queryByRole("button", { name: /pilot/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe("when user is logged in", () => {
    const mockLogout = vi.fn();

    beforeEach(() => {
      vi.mocked(authContext.useAuth).mockReturnValue({
        user: {
          id: "123",
          email: "pilot@airbelgie.com",
          firstName: "John",
          lastName: "Doe",
        },
        token: "test-token",
        isLoading: false,
        isAuthenticated: true,
        login: vi.fn(),
        logout: mockLogout,
      });
    });

    it("displays user menu button with first name", () => {
      render(<Header />);

      expect(screen.getByRole("button", { name: /john/i })).toBeInTheDocument();
    });

    it("does not show login and join now buttons", () => {
      render(<Header />);

      expect(
        screen.queryByRole("button", { name: /log in/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /join now/i }),
      ).not.toBeInTheDocument();
    });

    it("opens dropdown menu when clicking user button", async () => {
      const user = userEvent.setup();
      render(<Header />);

      const userButton = screen.getByRole("button", { name: /john/i });
      await user.click(userButton);

      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("pilot@airbelgie.com")).toBeInTheDocument();
    });

    it("shows navigation links in dropdown", async () => {
      const user = userEvent.setup();
      render(<Header />);

      const userButton = screen.getByRole("button", { name: /john/i });
      await user.click(userButton);

      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("My Flights")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("shows sign out option in dropdown", async () => {
      const user = userEvent.setup();
      render(<Header />);

      const userButton = screen.getByRole("button", { name: /john/i });
      await user.click(userButton);

      expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    });

    it("calls logout and redirects when sign out is clicked", async () => {
      const user = userEvent.setup();
      render(<Header />);

      const userButton = screen.getByRole("button", { name: /john/i });
      await user.click(userButton);

      const signOutButton = screen.getByText(/sign out/i);
      await user.click(signOutButton);

      expect(mockLogout).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  describe("when auth is loading", () => {
    beforeEach(() => {
      vi.mocked(authContext.useAuth).mockReturnValue({
        user: null,
        token: null,
        isLoading: true,
        isAuthenticated: false,
        login: vi.fn(),
        logout: vi.fn(),
      });
    });

    it("shows loading skeleton instead of buttons", () => {
      render(<Header />);

      // Should not show login/join or user menu
      expect(
        screen.queryByRole("button", { name: /log in/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /join now/i }),
      ).not.toBeInTheDocument();

      // Should show skeleton (div with animate-pulse class)
      const skeleton = document.querySelector(".animate-pulse");
      expect(skeleton).toBeInTheDocument();
    });
  });

  describe("when user has no name", () => {
    beforeEach(() => {
      vi.mocked(authContext.useAuth).mockReturnValue({
        user: {
          id: "123",
          email: "anonymous@airbelgie.com",
        },
        token: "test-token",
        isLoading: false,
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
      });
    });

    it("falls back to email username for display", () => {
      render(<Header />);

      expect(
        screen.getByRole("button", { name: /anonymous/i }),
      ).toBeInTheDocument();
    });
  });

  describe("navigation links", () => {
    beforeEach(() => {
      vi.mocked(authContext.useAuth).mockReturnValue({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        login: vi.fn(),
        logout: vi.fn(),
      });
    });

    it("displays Fleet, Routes, and Community links", () => {
      render(<Header />);

      expect(screen.getByText("Fleet")).toBeInTheDocument();
      expect(screen.getByText("Routes")).toBeInTheDocument();
      expect(screen.getByText("Community")).toBeInTheDocument();
    });

    it("links to correct sections", () => {
      render(<Header />);

      expect(screen.getByText("Fleet").closest("a")).toHaveAttribute(
        "href",
        "#fleet",
      );
      expect(screen.getByText("Routes").closest("a")).toHaveAttribute(
        "href",
        "#routes",
      );
      expect(screen.getByText("Community").closest("a")).toHaveAttribute(
        "href",
        "#community",
      );
    });
  });
});
