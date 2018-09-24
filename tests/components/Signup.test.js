import { shallow } from "enzyme";
import React from "react";

import { Signup, mapStateToProps } from "../../src/views/auth/Signup";
import mockData from '../config/mockData';

const { searchParams } = mockData;

describe("The Signup component", () => {
  describe("Testing mapStateToProps", () => {
    it("should map the state to the props correctly", () => {
      const auth = {
        isLoading: true,
        signUpErrors: undefined
      };
      const state = { auth };
      const componentState = mapStateToProps(state);
      expect(componentState).toEqual(auth);
    });
  });

  describe("Testing component methods", () => {
    const location = { search: searchParams };
    const history = {
      replace: (string) => {
        return null;
      }
    };
    const props = {
      signupAction: () => {},
      clearApiValidationError: () => {},
      clearAllApiValidationErrors: () => {},
      isLoading: false,
      signUpErrors: {
        message: "",
        response: {
          email: ["invalid"]
        }
      }
    };
    const signupComponent = shallow(
      <Signup
        history={history}
        socialLoginRedirect={() => { }}
        socialLogin={() => { }}
        location={location}
        signupAction={props.signupAction}
        clearAllApiValidationErrors={props.clearAllApiValidationErrors}
        clearApiValidationError={props.clearApiValidationError}
        isLoading={props.isLoading}
        signUpErrors={props.signUpErrors}
      />
    );

    describe("Testing handle error message dismiss function", () => {
      it("should set displayErrMsg to false", () => {
        const signupComponentInstance = signupComponent.instance();
        signupComponentInstance.handleErrMsgDismiss();
        expect(signupComponentInstance.state.displayErrMsg).toEqual(false);
      });
    });
    describe("Testing handle submit function", () => {
      it("should call validate and set displayErrMsg to true when the valid form data is provided", () => {
        const signupComponentInstance = signupComponent.instance();
        signupComponentInstance.state.formData = {
          email: "validEmai@gmail.com",
          password: "Password12@",
          firstName: "fatai",
          lastName: "balogun",
          username: "fatty",
          confirm: "Password12@"
        };
        const spy = jest.spyOn(signupComponentInstance, "validate");
        signupComponentInstance.state.displayErrMsg = false;
        signupComponentInstance.handleSubmit({ preventDefault: () => {} });
        expect(spy).toHaveBeenCalled();
        expect(signupComponentInstance.state.displayErrMsg).toEqual(true);
      });
    });
    describe("Testing handle submit function", () => {
      it("should call validate and not set displayErrMsg to true indicating invalid form data", () => {
        const signupComponentInstance = signupComponent.instance();
        signupComponentInstance.state.formData = {
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          username: "",
          confirm: ""
        };
        const spy = jest.spyOn(signupComponentInstance, "validate");
        signupComponentInstance.state.displayErrMsg = false;
        signupComponentInstance.handleSubmit({ preventDefault: () => {} });
        expect(spy).toHaveBeenCalled();
        expect(signupComponentInstance.state.displayErrMsg).toEqual(false);
      });
    });
    describe("Testing handle submit function", () => {
      it("should call validate and not set displayErrMsg to true when passwords do not match", () => {
        const signupComponentInstance = signupComponent.instance();
        signupComponentInstance.state.formData = {
          email: "validEmai@gmail.com",
          password: "Password12@",
          firstName: "fatai",
          lastName: "balogun",
          username: "fatty",
          confirm: "Password12@a"
        };
        const spy = jest.spyOn(signupComponentInstance, "validate");
        signupComponentInstance.state.displayErrMsg = false;
        signupComponentInstance.handleSubmit({ preventDefault: () => {} });
        expect(spy).toHaveBeenCalled();
        expect(signupComponentInstance.state.displayErrMsg).toEqual(false);
      });
    });
    describe("Testing handle change function", () => {
      it("It should update the local state of the component and remove valid email error", () => {
        const signupComponentInstance = signupComponent.instance();
        signupComponentInstance.state.validationErrors = {
          errorCount: 1,
          email: ["please enter a valid email"]
        };
        const event = {
          target: {
            name: "email",
            value: "update@gmail.com"
          }
        };
        signupComponentInstance.handleChange(event);
        expect(signupComponentInstance.state.formData.email).toEqual(
          event.target.value
        );
        expect(
          signupComponentInstance.state.validationErrors.email.length
        ).toEqual(0);
      });
      it("It should update the local state of the component and remove invalid password error", () => {
        const signupComponentInstance = signupComponent.instance();
        signupComponentInstance.state.validationErrors = {
          errorCount: 1,
          password: ['Your password must include an uppercase, '
          + 'lowercase, a number, a special character and'
          + 'a minimum length of 8 characters']
        };
        const event = {
          target: {
            name: "password",
            value: "P@ssw0rd!"
          }
        };
        signupComponentInstance.handleChange(event);
        expect(signupComponentInstance.state.formData.password).toEqual(
          event.target.value
        );
        expect(
          signupComponentInstance.state.validationErrors.password.length
        ).toEqual(1);
      });
      it("It should update the local state of the component and remove minimum char length error for last name", () => {
        const signupComponentInstance = signupComponent.instance();
        signupComponentInstance.state.validationErrors = {
          errorCount: 1,
          lastName: ['Last name entered should have minimum of 2 characters']
        };
        const event = {
          target: {
            name: "lastName",
            value: "Pan"
          }
        };
        signupComponentInstance.handleChange(event);
        expect(signupComponentInstance.state.formData.lastName).toEqual(
          event.target.value
        );
        expect(
          signupComponentInstance.state.validationErrors.lastName.length
        ).toEqual(0);
      });
      it("It should update the local state of the component and remove minimum char length error for first name", () => {
        const signupComponentInstance = signupComponent.instance();
        signupComponentInstance.state.validationErrors = {
          errorCount: 1,
          firstName: ['First name entered should have minimum of 2 characters']
        };
        const event = {
          target: {
            name: "firstName",
            value: "Pan"
          }
        };
        signupComponentInstance.handleChange(event);
        expect(signupComponentInstance.state.formData.firstName).toEqual(
          event.target.value
        );
        expect(
          signupComponentInstance.state.validationErrors.firstName.length
        ).toEqual(0);
      });
      it("It should update the local state of the component and remove valid email error", () => {
        const signupComponentInstance = signupComponent.instance();
        signupComponentInstance.state.validationErrors = {
          errorCount: 1,
          email: ["please enter a valid email"]
        };
        const event = {
          target: {
            name: "email",
            value: "update@gmail.com"
          }
        };
        signupComponentInstance.handleChange(event);
        expect(signupComponentInstance.state.formData.email).toEqual(
          event.target.value
        );
        expect(
          signupComponentInstance.state.validationErrors.email.length
        ).toEqual(0);
      });
      it("It should update the local state of the component and remove password do not match error", () => {
        const signupComponentInstance = signupComponent.instance();
        signupComponentInstance.state.validationErrors = {
          errorCount: 1,
          confirm: ["Confirm password does not match"]
        };
        signupComponentInstance.state.formData.password = "P@ssw0rd!";
        const event = {
          target: {
            name: "confirm",
            value: "P@ssw0rd!"
          }
        };
        signupComponentInstance.handleChange(event);
        expect(signupComponentInstance.state.formData.confirm).toEqual(
          event.target.value
        );
        console.log(signupComponentInstance.state.validationErrors.confirm);
        expect(
          signupComponentInstance.state.validationErrors.confirm.length
        ).toEqual(0);
      });
    });
    describe("Testing handle change function", () => {
      it("It should update the local state of the component", () => {
        const signupComponentInstance = signupComponent.instance();
        signupComponentInstance.state.validationErrors = {
          errorCount: 0,
          password: ["password is required"]
        };
        const event = {
          target: {
            name: "password",
            value: "@gmail.com"
          }
        };
        signupComponentInstance.handleChange(event);
        expect(signupComponentInstance.state.formData.password).toEqual(
          event.target.value
        );
      });
      it("It should update the local state of the component", () => {
        const signupComponentInstance = signupComponent.instance();
        signupComponentInstance.state.validationErrors = {
          errorCount: 1,
          firstName: ["First name is required"]
        };
        const event = {
          target: {
            name: "firstName",
            value: ""
          }
        };
        signupComponentInstance.handleChange(event);
        expect(signupComponentInstance.state.formData.firstName).toEqual(
          event.target.value
        );
      });
    });

    describe("Testing visibilityIconClick function", () => {
      describe("Test passwordVisibilityIconClick ", () => {
        const event = {
          target: {
            tagName: "I"
          },
          currentTarget: {
            childNodes: [
              "a",
              {
                name: "password"
              }
            ]
          }
        };
        it("should set passwordVisibilityIcon to 'visibility_off' when it is 'visibility'", () => {
          const signupComponentInstance = signupComponent.instance();
          signupComponentInstance.visibilityIconClick(event);
          expect(signupComponentInstance.state.passwordVisibilityIcon).toEqual(
            "visibility_off"
          );
        });
        it("should set passwordVisibilityIcon to 'visibility' when it is 'visibility_off'", () => {
          const signupComponentInstance = signupComponent.instance();
          signupComponentInstance.visibilityIconClick(event);
          expect(signupComponentInstance.state.passwordVisibilityIcon).toEqual(
            "visibility"
          );
        });
      });

      describe("Test confrimVisibilityIconClick ", () => {
        const event = {
          target: {
            tagName: "I"
          },
          currentTarget: {
            childNodes: [
              "a",
              {
                name: "confirm"
              }
            ]
          }
        };
        it("should set confirmVisibilityIcon to 'visibility_off' when it is 'visibility'", () => {
          const signupComponentInstance = signupComponent.instance();
          signupComponentInstance.visibilityIconClick(event);
          expect(signupComponentInstance.state.confirmVisibilityIcon).toEqual(
            "visibility_off"
          );
        });
        it("should set confirmVisibilityIcon to 'visibility' when it is 'visibility_off'", () => {
          const signupComponentInstance = signupComponent.instance();
          signupComponentInstance.visibilityIconClick(event);
          expect(signupComponentInstance.state.confirmVisibilityIcon).toEqual(
            "visibility"
          );
        });
      });
    });
  });
});
