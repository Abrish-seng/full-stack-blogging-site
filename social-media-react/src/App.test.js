import { render, screen } from "./helpers/test-utils";
import App from "./App";

test("renders Welcome to Blogger text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Blogger!/i);
  expect(linkElement).toBeInTheDocument();
});
