import React from 'react';
// import MutationObserver from 'mutationobserver-shim';
// import {axiosWithAuth as mockAxios} from '../helpers/axiosWithAuth';
import mockFetchColorService from '../services/fetchColorService';
import { render, screen, waitFor} from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import BubblePage from './BubblePage';

jest.mock('../services/fetchColorService');
jest.mock('../helpers/axiosWithAuth');
mockFetchColorService.mockResolvedValue([
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
    },]);
test("Renders without errors", ()=> {
    render(<BubblePage />);
});
test("Renders appropriate number of colors passed in through mock", async ()=> {
    //Keep in mind that our service is called on mount for this component.

    // mockAxios.mockImplementation(()=>{
    //     return{
    //         put:jest.fn(),
    //         delete:jest.fn()
    //     }
    // });
    // mockAxios().put.mockResolvedValue({
    //     color: "aliceblu",
    //     code: {
    //     hex: "#f0f8ff",
    //     },
    //     id: 1,
    //   });
    // mockAxios().delete.mockResolvedValue(1);
    render(<BubblePage />);
    await waitFor(()=>{
        expect(screen.getByText("aliceblue")).toBeInTheDocument();
        expect(screen.getByText("limegreen")).toBeInTheDocument();
        expect(screen.getAllByText("x",{exact:true})).toHaveLength(2);
    });
    // userEvent.click(screen.getByText("aliceblue")); //click to open editmenu
    

});