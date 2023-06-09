import {
  render,
  screen,
  waitForElementToBeRemoved,
  act,
} from "@testing-library/react";
import { Home } from ".";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

const handlers = [
  rest.get("*jsonplaceholder.typicode.com*", async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: "title 1",
          body: "body 1",
          url: "img1.jpg",
        },
        {
          userId: 1,
          id: 2,
          title: "title 2",
          body: "body 2",
          url: "img2.jpg",
        },
        {
          userId: 1,
          id: 3,
          title: "title 3",
          body: "body 3",
          url: "img3.jpg",
        },
      ])
    );
  }),
];

const server = setupServer(...handlers);

describe("<Home />", () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });
  it("should render search, post and load more", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem posts");

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Pesquisar/);
    const images = screen.getAllByRole("img", { name: /title/i });
    const button = screen.getByRole("button", { name: /Load more posts/i });

    expect(search).toBeInTheDocument();
    expect(images).toHaveLength(2);
    expect(button).toBeInTheDocument();
  });

  it("should render search for posts", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem posts");

    expect.assertions(11);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Pesquisar/);

    expect(search).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "title 1" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "title 2" })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: "title 3" })
    ).not.toBeInTheDocument();

    act(() => {
      userEvent.type(search, "title 1");
    });
    expect(
      screen.getByRole("heading", { name: "title 1" })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: "title 2" })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: "title 3" })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Search Value: title 1",
      })
    ).toBeInTheDocument();

    act(() => {
      userEvent.clear(search);
    });
    expect(
      screen.getByRole("heading", { name: "title 1" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "title 2" })
    ).toBeInTheDocument();

    act(() => {
      userEvent.type(search, "Balalasdas");
    });
    expect(screen.getByText("Não existem posts")).toBeInTheDocument();
  });

  it("should load more posts", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem posts");

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole("button", { name: /Load more posts/i });

    act(() => {
      userEvent.click(button);
    });

    expect(
      screen.getByRole("heading", { name: "title 3" })
    ).toBeInTheDocument();

    expect(button).toBeDisabled();
  });
});
