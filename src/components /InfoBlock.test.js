import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import InfoBlock from './InfoBlock';

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

it('should correctly display infoblock information\n', function () {
    act(() => {
        render(<InfoBlock citiesCount={35} lifes={50} distance={50} nextCity={'Paris'}/>, container);
    });
    expect(container.querySelectorAll('.info-block .info-block-msg')[1].querySelector('span').textContent).toBe('50 kilometers left');
    expect(container.querySelector('.info-block .info-block-msg span').textContent).toBe('35 cities placed');
    expect(container.querySelector('.info-block .opacity-block-msg span').textContent).toBe('Select the location of Paris');
    expect(container.querySelectorAll('.info-block .opacity-block-msg')[1].querySelector('span').textContent).toBe('Your guess was 50km from the correct location');
    expect(container.querySelectorAll('.info-block .opacity-block-msg')[2]).toBeUndefined();
    expect(container.querySelectorAll('.info-block .opacity-block-msg')[3]).toBeUndefined();

});


it('should correctly display the information of the alternative infoblock', () => {
    act(() => {
        render(<InfoBlock lifes={-300} victory={true} gameOver={true}/>, container);
    });
    expect(container.querySelectorAll('.info-block .info-block-msg')[1].querySelector('span').textContent).toBe('0 kilometers left');
    expect(container.querySelectorAll('.info-block .opacity-block-msg')[0].querySelector('span').textContent).not.toContain('Select the location of');
    expect(container.querySelectorAll('.info-block .opacity-block-msg')[0].querySelector('span').textContent).toBe('Victory!!!');
    expect(container.querySelectorAll('.info-block .opacity-block-msg')[1].querySelector('span').textContent).toBe('You lost');
});


