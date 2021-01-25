import React, { useState, useEffect } from "react";
import { TextInput, SearchIconSvg } from "@egovernments/digit-ui-react-components";

export const useChequeDetails = (props) => {
  const config = [
    {
      head: "Cheque Details",
      headId: "paymentInfo",
      body: [
        {
          withoutLabel: true,
          type: "custom",
          populators: {
            name: "chequeDetails",
            customProps: {},
            defaultValue: { chequeNo: "", chequeDate: "", ifsc: "", bankName: "", bankBranch: "" },
            component: (props, customProps) => <ChequeDetailsComponent onChange={props.onChange} chequeDetails={props.value} {...customProps} />,
          },
        },
      ],
    },
  ];

  return { chequeConfig: config };
};

// to be used in config

export const ChequeDetailsComponent = (props) => {
  const [chequeDate, setChequeDate] = useState(props.chequeDetails.chequeDate);
  const [chequeNo, setChequeNo] = useState(props.chequeDetails.chequeNo);
  const [ifsc, setIfsc] = useState(props.chequeDetails.ifsc);
  const [bankName, setBankName] = useState(props.chequeDetails.bankName);
  const [bankBranch, setBankBranch] = useState(props.chequeDetails.bankBranch);

  useEffect(() => {
    if (props.onChange) props.onChange({ chequeDate, chequeNo, ifsc, bankName, bankBranch });
  }, [bankName, bankBranch]);

  const setBankDetailsFromIFSC = async () => {
    try {
      const res = await window.fetch(`https://ifsc.razorpay.com/${ifsc}`);
      console.log(res.ok);
      if (res.ok) {
        const { BANK, BRANCH } = await res.json();
        setBankName(BANK);
        setBankBranch(BRANCH);
      } else alert("Wrong IFSC Code");
    } catch (er) {
      console.log(er);
      alert("Something Went Wrong !");
    }
  };

  return (
    <React.Fragment>
      <div className="label-field-pair">
        <h2 className="card-label">Cheque Number</h2>
        <div className="field">
          <div className="field-container">
            <input
              className="employee-card-input"
              value={chequeNo}
              type="text"
              className="employee-card-input"
              onChange={(e) => setChequeNo(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="label-field-pair">
        <h2 className="card-label">Cheque Date</h2>
        <div className="field">
          <div className="field-container">
            <input
              className="employee-card-input"
              value={chequeDate}
              type="date"
              className="employee-card-input"
              onChange={(e) => setChequeDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      {
        // chequeDate && chequeNo &&
        <React.Fragment>
          <div className="label-field-pair">
            <h2 className="card-label">IFSC Code</h2>
            <div className="field">
              <div className="field-container">
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
                    value={ifsc}
                    type="text"
                    onChange={(e) => setIfsc(e.target.value)}
                  />
                  <button
                    type="button"
                    style={{ border: "0px", background: "transparent", outline: "none", textIndent: "2px" }}
                    onClick={setBankDetailsFromIFSC}
                  >
                    <SearchIconSvg />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="label-field-pair">
            <h2 className="card-label">Bank Name</h2>
            <div className="field">
              <div className="field-container">
                <input
                  // style={{ border: "2px solid #0b0c0c", borderRadius: "2px" }}
                  className="employee-card-input"
                  value={bankName}
                  type="text"
                  className="employee-card-input"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="label-field-pair">
            <h2 className="card-label">Bank Branch</h2>
            <div className="field">
              <div className="field-container">
                <input className="employee-card-input" value={bankBranch} type="text" className="employee-card-input" readOnly />
              </div>
            </div>
          </div>
        </React.Fragment>
      }
    </React.Fragment>
  );
};
