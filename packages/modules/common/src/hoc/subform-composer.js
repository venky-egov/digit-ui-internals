import { Dropdown, TextInput, RadioButtons, Card, ActionBar, SubmitBar, CardHeader, SearchIconSvg } from "@egovernments/digit-ui-react-components";
import { set, snakeCase } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

class FormComponentRegistry {
  constructor(registry = {}) {
    this._registry = registry;
  }
}

const formCompReg = new FormComponentRegistry({
  Dropdown: (props, customProps) => <Dropdown {...props} />,
  TextInput: (props) => <TextInput {...props} />,
  RadioButtons: (props) => <RadioButtons {...props} />,
});

class SubformRegistry {
  constructor(registry = {}) {
    this._registry = registry;
  }

  getSubform = (key) => this._registry[key];
  addSubForm = (key, config) => (this._registry[key] = config);
  addMiddleware = (
    subFormKey,
    middlewareKey,
    middlewareFn,
    { functionName, preceedingName = "", preceedingIndex = null, exceedingName = "", exceedingIndex = null }
  ) => {
    let config = this.getSubform(subFormKey);

    let { middlewares } = config;

    const checkUniqueness = () => {};

    const setPreceedingIndex = (preceedingIndex) => {
      let firstChunk = middlewares.splice(0, preceedingIndex + 1);
      middlewares = [...firstChunk, { [functionName]: middlewareFn }, ...middlewares];
    };

    const setExceedingIndex = (exceedingIndex) => {
      let firstChunk = middlewares.splice(0, exceedingIndex);
      middlewares = [...firstChunk, { [functionName]: middlewareFn }, ...middlewares];
    };

    if (preceedingIndex) setPreceedingIndex(preceedingIndex);
    else if (exceedingIndex) setExceedingIndex(exceedingIndex);
    else if (preceedingName) {
      let element = middlewares.filter((e) => Object.keys(e)[0] === preceedingName)[0] || null;
      if (!element) console.error(`no middleware with ${preceedingName} found in ${key} subForm `);
    } else if (exceedingName) {
    }
  };
}

const middleWare_1 = async (data, _break, _next) => {
  data.a = "a";
  return await _next(data);
};

const middleWare_2 = async (data, _break, _next) => {
  data.b = "b";
  // _break();
  return await _next(data);
};

const middleWare_3 = async (data, _break, _next) => {
  data.c = "c";
  if (data.b === "b") {
    try {
      const res = await window.fetch(`https://ifsc.razorpay.com/hdfc0000090`);
      console.log(res.ok);
      if (res.ok) {
        const { BANK, BRANCH } = await res.json();
        data.BANKFROMMiddleWare = BANK;
      } else alert("Wrong IFSC Code");
    } catch (er) {
      console.log(er);
      alert("Something Went Wrong !");
    }
  }
  return await _next(data);
};

const asyncData = {
  a: ["1", "2", "3"],
  b: ["4", "5", "6"],
  c: ["7", "8", "9"],
};

const useSubform = (props) => {
  const { t } = useTranslation();
  const subFormReg = new SubformRegistry({
    testForm: {
      addedFields: [],
      middlewares: [{ middleWare_1 }, { middleWare_2 }, { middleWare_3 }],
      state: { firstDDoptions: ["a", "b", "c"], secondDDoptions: asyncData.a, thirdDDoptions: ["d", "e", "f"] },
      fields: [
        {
          label: "first",
          name: "pehla",
          defaultValue: "b",
          customProps: (state) => ({ t, isMendatory: true, option: state.firstDDoptions }),
          component: (props, customProps) => (
            <Dropdown
              select={(d) => {
                props.setState({ secondDDoptions: asyncData[d] });
                props.setValue("doosra", "");
                props.onChange(d);
              }}
              selected={props.value}
              {...customProps}
            />
          ),
          validations: {},
        },
        {
          label: "second",
          name: "doosra",
          customProps: (state) => ({ t, isMendatory: true, option: state.secondDDoptions }),
          defaultValue: (state) => state.secondDDoptions[1],
          component: (props, customProps) => (
            <Dropdown
              select={(d) => {
                props.onChange(d);
              }}
              selected={props.value}
              {...customProps}
            />
          ),
        },
        {
          label: "third",
          name: "teesra",
          customProps: (state) => ({ t, isMendatory: true, option: state.thirdDDoptions }),
          defaultValue: "d",
          component: (props, customProps) => (
            <Dropdown
              select={(d) => {
                props.onChange(d);
              }}
              selected={props.value}
              {...customProps}
            />
          ),
        },
        {
          label: "IFSC",
          name: "ifsc",
          customProps: {
            t,
            isMendatory: true,
            setBankDetailsFromIFSC: async (props) => {
              try {
                const res = await window.fetch(`https://ifsc.razorpay.com/${props.getValues("ifsc")}`);
                console.log(res.ok);
                if (res.ok) {
                  const { BANK, BRANCH } = await res.json();
                  props.setValue("bank", BANK);
                  props.setValue("branch", BRANCH);
                } else alert("Wrong IFSC Code");
              } catch (er) {
                console.log(er);
                alert("Something Went Wrong !");
              }
            },
          },
          defaultValue: "",
          component: (props, customProps) => (
            <div style={{ border: "2px solid #0b0c0c", borderRadius: "2px", display: "flex", alignItems: "center", marginBottom: "24px" }}>
              <input
                style={{
                  border: "0px",
                  background: "transparent",
                  outline: "none",
                  width: "100%",
                  textIndent: "5px",
                  padding: "6px 0px",
                }}
                value={props.value}
                type="text"
                onChange={(e) => {
                  props.setState({ ifsc: e.target.value });
                  props.onChange(e.target.value);
                }}
              />
              <button
                type="button"
                style={{ border: "0px", background: "transparent", outline: "none", textIndent: "2px" }}
                onClick={() => {
                  customProps.setBankDetailsFromIFSC(props);
                }}
              >
                <SearchIconSvg />
              </button>
            </div>
          ),
        },
        {
          label: "Bank",
          name: "bank",
          customProps: (state) => ({ t, isMendatory: true }),
          defaultValue: "d",
          component: (props, customProps) => <input readOnly value={props.value}></input>,
        },
        {
          label: "Branch",
          name: "branch",
          customProps: (state) => ({ t, isMendatory: true }),
          defaultValue: "d",
          component: (props, customProps) => <input readOnly value={props.value}></input>,
        },
      ],
    },
  });
  return subFormReg;
};

class FormRegistry {
  constructor(registry = {}) {
    this._registry = registry;
  }
}

export const SubformComposer = ({ _key, ...props }) => {
  debugger;
  const { setValue, setError, control, watch, getValues } = useForm({ shouldFocusError: true });
  const subFormReg = useSubform();
  const config = useMemo(() => subFormReg.getSubform(_key), []);
  const [state, setState] = useState(config.state);
  const _setState = useCallback((obj) => {
    setState((oldState) => ({ ...oldState, ...obj }));
  }, []);
  const clearState = useCallback(() => {
    setState(config.state);
  });

  const formData = watch();
  useEffect(async () => {
    props.getSubFormValue(await callMiddlewares(formData));
  }, [formData]);

  const callMiddlewares = useCallback(async (data) => {
    let applyBreak = false;
    let itr = -1;
    let _break = () => (applyBreak = true);
    let _next = async (data) => {
      if (!applyBreak && ++itr < config.middlewares.length) {
        let key = Object.keys(config.middlewares[itr])[0];
        let nextMiddleware = config.middlewares[itr][key];
        let isAsync = nextMiddleware.constructor.name === "AsyncFunction";
        if (isAsync) return await nextMiddleware(data, _break, _next);
        else return nextMiddleware(data, _break, _next);
      } else return data;
    };
    let ret = await _next(data);
    return ret;
  }, []);

  const allFields = useMemo(() => [...config.fields, ...config.addedFields], []);

  return (
    <React.Fragment>
      <form>
        <Card>
          <CardHeader>{_key}</CardHeader>
          {allFields.map(({ label, component, customProps, defaultValue, name }, index) => {
            let _customProps = typeof customProps === "function" ? customProps(state, _setState) : customProps;
            let _defaultValue = typeof defaultValue === "function" ? defaultValue(state, _setState) : defaultValue;
            return (
              <div key={index} style={{ display: "flex" }}>
                {label && <div style={{ width: "50%" }}>{label}</div>}
                <div style={label && { width: "50%" }}>
                  <Controller
                    defaultValue={_defaultValue}
                    name={name}
                    control={control}
                    render={(props) => component({ ...props, setState: _setState, setValue, setError, state, getValues }, _customProps)}
                  />
                </div>
              </div>
            );
          })}
        </Card>
      </form>
    </React.Fragment>
  );
};
