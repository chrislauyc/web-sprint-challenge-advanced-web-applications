import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

test("Renders without errors with blank color passed into component", () => {
    const testColor = {
        color: "",
        code: { hex: "" }
    };
    render(<Color color={testColor}/>);
});
  
test("Renders the color passed into component", () => {
    const testColor = {
        color: "limegreen",
        code: { hex: "#99ddbc" }
    };
    render(<Color color={testColor}/>);
    expect(screen.getByText("limegreen")).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const testColor = {
        color: "limegreen",
        code: { hex: "#99ddbc" }
    };
    const handleDelete=jest.fn().mockImplementation();
    const toggleEdit=jest.fn().mockImplementation();
    // setEditColor={}
    render(<Color color={testColor}  toggleEdit={toggleEdit} deleteColor={handleDelete}/>);
    const x = screen.getByText("x",{exact:true});
    userEvent.click(x);
    expect(handleDelete.call.length).toBe(1);
    expect(toggleEdit.call.length).toBe(1);
});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const testColor = {
        color: "limegreen",
        code: { hex: "#99ddbc" }
    };
    const setEditColor=jest.fn().mockImplementation();
    const toggleEdit=jest.fn().mockImplementation();
    render(<Color color={testColor} setEditColor={setEditColor} toggleEdit={toggleEdit}/>);
    expect(setEditColor.call.length).toBe(1);
    expect(toggleEdit.call.length).toBe(1);
});