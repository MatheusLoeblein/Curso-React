import { render, screen } from "@testing-library/react";
import { Button } from ".";

import userEvent from "@testing-library/user-event";

describe('<Button />', () => {
    it('should render the button with the text "Load more"', () => {
        render(<Button text={'load more'}/>);

        expect.assertions(1 );

        const button = screen.getByRole('button', {name: /load more/i });
        expect(button).toBeInTheDocument();
    });

    it('should call function on button click', () => {
        const fn = jest.fn();
        render(<Button text={'load more'} click={fn} />);


        const button = screen.getByRole('button', {name: /load more/i });
        userEvent.click(button);

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should be disable when disable is true', () => {
        render(<Button text={'load more'} disabled={true} />);

        const button = screen.getByRole('button', {name: /load more/i });
        expect(button).toBeDisabled();
    });

    it('should be enabled when disable is false', () => {
        render(<Button text={'load more'} disabled={false} />);

        const button = screen.getByRole('button', {name: /load more/i });
        expect(button).toBeEnabled();
    });

    it('should match snapshot', () => {
        const {container} = render(<Button text={'load more'} disabled={false} />);

        expect(container.firstChild).toMatchSnapshot();
    });
});
