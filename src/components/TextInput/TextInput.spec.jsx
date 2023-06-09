import { screen, render } from "@testing-library/react";
import { TextInput } from ".";
import userEvent from "@testing-library/user-event";

describe("<TextInput />", () => {
  it("should have a value of searchValue", () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={"Testando"} />);

    const input = screen.getByPlaceholderText("Pesquisar");
    expect(input.value).toBe("Testando");
  });

  it("should call handleChange function on each key pressed", () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={"o valor"} />);

    const input = screen.getByPlaceholderText("Pesquisar");

    const value = "o valor";

    userEvent.type(input, value);
    expect(input.value).toBe(value);
    expect(fn).toBeCalledTimes(value.length);
  });

  it("should match snapshot", () => {
    const fn = jest.fn();
    const { container } = render(
      <TextInput handleChange={fn} searchValue={"Sunt"} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
