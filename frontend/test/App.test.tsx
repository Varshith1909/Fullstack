// import { screen } from '@testing-library/react';
import * as async_hooks from "async_hooks";
import { expect, test } from 'vitest';
import {render, fireEvent, screen} from '@testing-library/react'
import App from "../src/App.js"

test("Math.sqrt()", () => {
  expect(Math.sqrt(4)).toBe(2);
  expect(Math.sqrt(144)).toBe(12);
  expect(Math.sqrt(2)).toBe(Math.SQRT2);
});

describe("Renders React components correctly" , async()=> {
  it("Should render the page correctly", async () => {
    let testrender = render(<App/>)
    const h1 = await screen.queryByText("Vite + React")
    
    expect(h1).not.toBeNull();
    //expect(h1).toBeVisible();
  })
})
