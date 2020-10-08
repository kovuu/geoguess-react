import React from "react";
import {render, unmountComponentAtNode} from "react-dom";

import ButtonsBlock from "./ButtonsBlock";
import {act} from "react-dom/test-utils";

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('should render buttons with correct labels', () => {
    act(() => {
        render(<ButtonsBlock />, container);
    });
    expect(container.querySelectorAll('.buttonsBlock button')[0].textContent).toBe('Place');
    expect(container.querySelectorAll('.buttonsBlock button')[1].textContent).toBe('Restart Game');
});

it('should check if buttons works', () => {
    const resetGame = jest.fn();
    const estimating = jest.fn();
    act(() => {
        render(<ButtonsBlock resetGame={resetGame} estimating={estimating} />, container);
    });
    const resetButton = document.querySelectorAll("button")[0];
    const pickButton = document.querySelectorAll("button")[1];
    act(() => {
        resetButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        pickButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(resetGame).toHaveBeenCalledTimes(1);
    expect(estimating).toHaveBeenCalledTimes(1);

    act(() => {
        for (let i = 0; i < 5; i++) {
            resetButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            pickButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        }
    });
    expect(resetGame).toHaveBeenCalledTimes(6);
    expect(estimating).toHaveBeenCalledTimes(6);
});
