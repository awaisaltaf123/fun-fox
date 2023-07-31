import { render } from "@testing-library/react";
import { notifySuccess } from "../notifyMessages";
import { toast } from "react-toastify";

jest.spyOn(toast, "success").mockImplementation(() => {});

describe("notifySuccess", () => {
  it("should call toast.success with the correct message and options", () => {
    const message = "Success message";
    notifySuccess(message);

    expect(toast.success).toHaveBeenCalledWith(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  });
});
