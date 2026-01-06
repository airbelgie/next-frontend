import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Landing Page", () => {
  describe("Navigation", () => {
    it("displays the AirBelgie logo and brand name", () => {
      render(<Home />);

      // Brand appears in both nav and footer
      const airTexts = screen.getAllByText("Air");
      const belgieTexts = screen.getAllByText("Belgie");

      expect(airTexts.length).toBeGreaterThanOrEqual(2);
      expect(belgieTexts.length).toBeGreaterThanOrEqual(2);
    });

    it("shows navigation links for Fleet, Routes, and Community", () => {
      render(<Home />);

      const nav = screen.getByRole("navigation");
      expect(within(nav).getByText("Fleet")).toBeInTheDocument();
      expect(within(nav).getByText("Routes")).toBeInTheDocument();
      expect(within(nav).getByText("Community")).toBeInTheDocument();
    });

    it("has a login button that links to /login", () => {
      render(<Home />);

      const loginButton = screen.getByRole("button", { name: /log in/i });
      expect(loginButton).toBeInTheDocument();

      // Check parent link goes to /login
      const loginLink = loginButton.closest("a");
      expect(loginLink).toHaveAttribute("href", "/login");
    });

    it("has a Join Now button that links to /signup", () => {
      render(<Home />);

      const nav = screen.getByRole("navigation");
      const joinButton = within(nav).getByRole("button", { name: /join now/i });
      expect(joinButton).toBeInTheDocument();

      const signupLink = joinButton.closest("a");
      expect(signupLink).toHaveAttribute("href", "/signup");
    });
  });

  describe("Hero Section", () => {
    it("displays an engaging headline about Belgium", () => {
      render(<Home />);

      expect(
        screen.getByRole("heading", {
          name: /experience the skies of belgium/i,
        }),
      ).toBeInTheDocument();
    });

    it("shows the 'Now accepting new pilots' status badge", () => {
      render(<Home />);

      expect(screen.getByText(/now accepting new pilots/i)).toBeInTheDocument();
    });

    it("displays key statistics to build trust", () => {
      render(<Home />);

      expect(screen.getByText("50+")).toBeInTheDocument();
      expect(screen.getByText("Active Pilots")).toBeInTheDocument();
      expect(screen.getByText("200+")).toBeInTheDocument();
      expect(screen.getByText("Destinations")).toBeInTheDocument();
      expect(screen.getByText("15K+")).toBeInTheDocument();
      expect(screen.getByText("Hours Flown")).toBeInTheDocument();
    });

    it("has a primary CTA to start flying that links to signup", () => {
      render(<Home />);

      const ctaButton = screen.getByRole("button", {
        name: /start flying today/i,
      });
      expect(ctaButton).toBeInTheDocument();

      const link = ctaButton.closest("a");
      expect(link).toHaveAttribute("href", "/signup");
    });

    it("has a secondary CTA to explore the fleet", () => {
      render(<Home />);

      const fleetButton = screen.getByRole("button", {
        name: /explore our fleet/i,
      });
      expect(fleetButton).toBeInTheDocument();

      const link = fleetButton.closest("a");
      expect(link).toHaveAttribute("href", "#fleet");
    });
  });

  describe("Features Section", () => {
    it("displays the 'Why fly with AirBelgie?' heading", () => {
      render(<Home />);

      expect(
        screen.getByRole("heading", { name: /why fly with airbelgie/i }),
      ).toBeInTheDocument();
    });

    it("showcases all 6 key features", () => {
      render(<Home />);

      const featureHeadings = [
        "Global Routes",
        "Modern Fleet",
        "Active Community",
        "Rank Progression",
        "ACARS Tracking",
        "Fly Anytime",
      ];

      for (const feature of featureHeadings) {
        expect(
          screen.getByRole("heading", { name: feature }),
        ).toBeInTheDocument();
      }
    });

    it("provides descriptive text for each feature", () => {
      render(<Home />);

      // Check that feature descriptions help users understand value
      expect(
        screen.getByText(/200 destinations worldwide/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/regional jets to long-haul/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/discord community/i)).toBeInTheDocument();
      expect(screen.getByText(/pilot ranks/i)).toBeInTheDocument();
      expect(screen.getByText(/all major simulators/i)).toBeInTheDocument();
      expect(
        screen.getByText(/no schedules, no pressure/i),
      ).toBeInTheDocument();
    });
  });

  describe("Fleet Section", () => {
    it("has a fleet section with proper id for navigation", () => {
      render(<Home />);

      const fleetSection = document.getElementById("fleet");
      expect(fleetSection).toBeInTheDocument();
    });

    it("displays fleet heading", () => {
      render(<Home />);

      expect(
        screen.getByRole("heading", { name: /our fleet/i }),
      ).toBeInTheDocument();
    });

    it("showcases available aircraft with their specifications", () => {
      render(<Home />);

      // Aircraft names
      expect(screen.getByText("Airbus A320neo")).toBeInTheDocument();
      expect(screen.getByText("Airbus A330-300")).toBeInTheDocument();
      expect(screen.getByText("Boeing 787-9")).toBeInTheDocument();
      expect(screen.getByText("Embraer E190")).toBeInTheDocument();

      // Aircraft specs help users choose
      expect(screen.getByText("180 seats")).toBeInTheDocument();
      expect(screen.getByText("3,500 nm")).toBeInTheDocument();
    });

    it("shows aircraft categories to help pilots choose", () => {
      render(<Home />);

      expect(screen.getByText("Short-haul workhorse")).toBeInTheDocument();
      expect(screen.getByText("Medium-haul flagship")).toBeInTheDocument();
      expect(screen.getByText("Long-haul dreamliner")).toBeInTheDocument();
      expect(screen.getByText("Regional connector")).toBeInTheDocument();
    });
  });

  describe("Call-to-Action Section", () => {
    it("displays a compelling CTA headline", () => {
      render(<Home />);

      expect(
        screen.getByRole("heading", { name: /ready to take off/i }),
      ).toBeInTheDocument();
    });

    it("has a signup button in the CTA section", () => {
      render(<Home />);

      const createAccountButton = screen.getByRole("button", {
        name: /create your account/i,
      });
      expect(createAccountButton).toBeInTheDocument();

      const link = createAccountButton.closest("a");
      expect(link).toHaveAttribute("href", "/signup");
    });

    it("has a Learn More button for users who need more info", () => {
      render(<Home />);

      expect(
        screen.getByRole("button", { name: /learn more/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Footer", () => {
    it("displays the brand in the footer", () => {
      render(<Home />);

      const footer = screen.getByRole("contentinfo");
      expect(within(footer).getByText("Air")).toBeInTheDocument();
      expect(within(footer).getByText("Belgie")).toBeInTheDocument();
    });

    it("shows Quick Links for easy navigation", () => {
      render(<Home />);

      const footer = screen.getByRole("contentinfo");
      expect(within(footer).getByText("Quick Links")).toBeInTheDocument();
      expect(within(footer).getByText("PIREP")).toBeInTheDocument();
      expect(within(footer).getByText("Liveries")).toBeInTheDocument();
    });

    it("shows Community links", () => {
      render(<Home />);

      const footer = screen.getByRole("contentinfo");
      expect(within(footer).getByText("Discord")).toBeInTheDocument();
      expect(within(footer).getByText("Events")).toBeInTheDocument();
      expect(within(footer).getByText("Group Flights")).toBeInTheDocument();
      expect(within(footer).getByText("Leaderboard")).toBeInTheDocument();
    });

    it("shows Support links", () => {
      render(<Home />);

      const footer = screen.getByRole("contentinfo");
      expect(within(footer).getByText("Help Center")).toBeInTheDocument();
      expect(within(footer).getByText("Contact")).toBeInTheDocument();
      expect(within(footer).getByText("Privacy Policy")).toBeInTheDocument();
      expect(within(footer).getByText("Terms of Service")).toBeInTheDocument();
    });

    it("includes copyright and disclaimer", () => {
      render(<Home />);

      expect(
        screen.getByText(/airbelgie virtual airlines/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/not affiliated with any real-world airline/i),
      ).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("allows users to click navigation links", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const nav = screen.getByRole("navigation");
      const fleetLink = within(nav).getByText("Fleet");

      // User should be able to click without errors
      await user.click(fleetLink);
      expect(fleetLink).toBeInTheDocument();
    });

    it("allows users to click CTA buttons", async () => {
      const user = userEvent.setup();
      render(<Home />);

      const startButton = screen.getByRole("button", {
        name: /start flying today/i,
      });

      await user.click(startButton);
      expect(startButton).toBeInTheDocument();
    });

    it("allows users to tab through interactive elements", async () => {
      const user = userEvent.setup();
      render(<Home />);

      // Tab to first interactive element
      await user.tab();

      // Should be able to tab through the page
      const activeElement = document.activeElement;
      expect(activeElement).not.toBe(document.body);
    });
  });

  describe("Accessibility", () => {
    it("uses semantic heading hierarchy", () => {
      render(<Home />);

      // One main h1 for the page
      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toBeInTheDocument();

      // H2s for main sections (Features, Fleet, CTA)
      const h2s = screen.getAllByRole("heading", { level: 2 });
      expect(h2s.length).toBeGreaterThanOrEqual(3);

      // H3s for feature cards, aircraft, and footer sections
      const h3s = screen.getAllByRole("heading", { level: 3 });
      expect(h3s.length).toBeGreaterThanOrEqual(6);
    });

    it("has a navigation landmark", () => {
      render(<Home />);

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("has a footer landmark", () => {
      render(<Home />);

      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("all buttons have accessible names", () => {
      render(<Home />);

      const buttons = screen.getAllByRole("button");
      for (const button of buttons) {
        expect(button).toHaveAccessibleName();
      }
    });

    it("all links have accessible names or content", () => {
      render(<Home />);

      const links = screen.getAllByRole("link");
      for (const link of links) {
        // Link should have text content or aria-label
        const hasContent =
          link.textContent?.trim() || link.getAttribute("aria-label");
        expect(hasContent).toBeTruthy();
      }
    });
  });
});
