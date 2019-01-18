import React from "react";
import { mount } from "enzyme";
import Root from "Root";
import CommentBox from "components/CommentBox";

let wrapped;
beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("shows a text area and two buttons", () => {
  expect(wrapped.find("textarea").length).toEqual(1);
  expect(wrapped.find("button").length).toEqual(2);
});

describe("the textarea", () => {
  const comment = "new comment";

  beforeEach(() => {
    wrapped.find("textarea").simulate("change", {
      target: { value: comment } // this gets merged into the event obj in the handler
    });
    wrapped.update();
  });

  it("lets users enter input", () => {
    expect(wrapped.find("textarea").prop("value")).toEqual(comment);
  });

  it("empties the text area when submitted", () => {
    wrapped.find("form").simulate("submit");
    wrapped.update();
    expect(wrapped.find("textarea").prop("value")).toEqual("");
  });
});
