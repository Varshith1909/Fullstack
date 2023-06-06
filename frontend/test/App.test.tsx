// import { screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import {render, fireEvent, screen} from '@testing-library/react'
import App from "../src/App.js"

test("Math.sqrt()", () => {
  expect(Math.sqrt(4)).toBe(2);
  expect(Math.sqrt(144)).toBe(12);
  expect(Math.sqrt(2)).toBe(Math.SQRT2);
});

describe("Renders React components correctly" , async()=>{
  let testrender =render(<App />)
  const h1 =await screen.queryByText("vite + React")
  
  expect(h1).not.toBeNull();
  expect(h1).toBeVisible();
})
