// test filling out form and submit
import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import CreateCard from "../page"
import { act } from "react-dom/test-utils"

describe('Testing form is handled correctly', () => {
  const renderComponent = () => render(<CreateCard />)

  const submitMock = jest.fn()

  it("does not submit if the form is invalid", () => {
    renderComponent()
    
    screen.getByLabelText("Collection name").onsubmit = submitMock
    fireEvent.click(screen.getByText("Continue"))
    expect(submitMock).not.toHaveBeenCalled()
  })

  it("submits if the form is valid", async () => {
    renderComponent()
    
    screen.getByLabelText("Collection name").onsubmit = submitMock

    await act(() => {
      fireEvent.change(screen.getByPlaceholderText("My first collection"), {
        target: { value: "My first collection" },
      })
    })

    setTimeout(() => {
      fireEvent.click(screen.getByText("Continue"))
      expect(submitMock).toHaveBeenCalled()
    }, 500);
    
  })
})