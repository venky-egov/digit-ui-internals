import React, { useState, useEffect } from "react";
import { FormComposer, Dropdown } from "@egovernments/digit-ui-react-components";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Login = ({ config: propsConfig, t }) => {
  const cities = Digit.Hooks.fsm.useTenants();
  const [user, setUser] = useState(null);
  const history = useHistory();
  const getUserType = () => Digit.UserService.getType();

  useEffect(() => {
    if (!user) {
      return;
    }
    Digit.UserService.setUser(user);
    const redirectPath = location.state?.from || "/digit-ui/employee";
    history.replace(redirectPath);
  }, [user]);

  const onLogin = async (data) => {
    if (!data.city) {
      alert("Please Select City!");
      return;
    }
    const requestData = {
      ...data,
      userType: getUserType(),
    };
    requestData.tenantId = data.city.code;
    delete requestData.city;
    try {
      const { UserRequest: info, ...tokens } = await Digit.UserService.authenticate(requestData);
      setUser({ info, ...tokens });
    } catch (err) {
      console.log({ err });
      alert(err?.response?.data?.error_description || "Invalid login credentials!");
    }
  };
  console.log({ propsConfig });
  const [userId, password, city] = propsConfig.inputs;
  const config = [
    {
      body: [
        {
          label: t(userId.label),
          type: userId.type,
          populators: {
            name: "username",
          },
          isMandatory: true,
        },
        {
          label: t(password.label),
          type: password.type,
          populators: {
            name: "password",
          },
          isMandatory: true,
        },
        {
          label: t(city.label),
          type: city.type,
          populators: {
            name: "city",
            customProps: {},
            component: (props, customProps) => (
              <Dropdown
                option={cities}
                optionKey="name"
                id="city"
                select={(d) => {
                  props.onChange(d);
                }}
                {...customProps}
              />
            ),
          },
          isMandatory: true,
        },
      ],
    },
  ];

  return (
    <FormComposer
      onSubmit={onLogin}
      noBoxShadow
      inline
      submitInForm
      config={config}
      label={propsConfig.texts.submitButtonLabel}
      secondaryLabel={propsConfig.texts.secondaryButtonLabel}
      heading={propsConfig.texts.header}
      headingStyle={{ "text-align": "center" }}
      cardStyle={{ "max-width": "400px", margin: "auto" }}
    />
  );
};

Login.propTypes = {
  loginParams: PropTypes.any,
};

Login.defaultProps = {
  loginParams: null,
};

export default Login;
