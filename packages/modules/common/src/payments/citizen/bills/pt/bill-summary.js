import React from "react";

const BillSumary = ({ billAccountDetails }) => {
  const total = billAccountDetails.reduce((total, tax) => total + tax.amount, 0);

  return (
    <React.Fragment>
      <div
        style={{
          border: "#e8e7e6 solid 1px",
          backgroundColor: "#fafafa",
          width: "99%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "16px",
        }}
      >
        {billAccountDetails.map((amountDetails, index) => {
          return (
            <div key={index} style={{ padding: "5px", display: "flex", marginBottom: "16px" }}>
              <div style={{ width: "50%", fontWeight: "bold" }}>{amountDetails.taxHeadCode}</div>
              <div style={{ width: "50%", textAlign: "right" }}>{amountDetails.amount?.toFixed(2)}</div>
            </div>
          );
        })}

        <hr style={{ borderColor: "#e7e6e6", width: "90%", marginRight: "auto", marginLeft: "auto" }} />
        <div style={{ padding: "5px", display: "flex", marginBottom: "16px", alignItems: "center" }}>
          <div style={{ width: "50%", fontWeight: "bold" }}>Total Amount</div>
          <div style={{ width: "50%", textAlign: "right", fontWeight: "bold", fontSize: "18px" }}>₹ {total.toFixed(2)}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BillSumary;
