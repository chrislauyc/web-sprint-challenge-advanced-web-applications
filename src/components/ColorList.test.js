import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen} from "@testing-library/react";
import ColorList from './ColorList';
import Color from './Color';
import MockEditMenu from './EditMenu';
jest.mock("./EditMenu")


test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={[]}/>);
});

test("Renders a list of colors without errors", () => {
    const colors = [
        {
          color: "aliceblue",
          code: {
            hex: "#f0f8ff",
          },
          id: 1,
        },
        {
          color: "limegreen",
          code: {
            hex: "#99ddbc",
          },
          id: 2,
        },];
    render(<ColorList colors={colors}/>);
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const colors = [
        {
          color: "aliceblue",
          code: {
            hex: "#f0f8ff",
          },
          id: 1,
        },
        {
          color: "limegreen",
          code: {
            hex: "#99ddbc",
          },
          id: 2,
        },];
    MockEditMenu.mockImplementation(()=><div>mock edit menu</div>)
    const {rerender} = render(<ColorList colors={colors} editing={true}/>);
    expect(MockEditMenu.call.length).toBe(1);
    rerender(<ColorList colors={colors} editing={false}/>);
    expect(MockEditMenu.call.length).toBe(1);
});
