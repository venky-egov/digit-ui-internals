import React from "react";

const BillSumary = () => {
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
        <div style={{ padding: "5px", display: "flex", marginBottom: "16px" }}>
          <div style={{ width: "50%", fontWeight: "bold" }}>Property Tax</div>
          <div style={{ width: "50%", textAlign: "right" }}>₹ 1500</div>
        </div>
        <div style={{ padding: "5px", display: "flex", marginBottom: "16px" }}>
          <div style={{ width: "50%", fontWeight: "bold" }}>Penalty</div>
          <div style={{ width: "50%", textAlign: "right" }}>₹ 1500</div>
        </div>
        <div style={{ padding: "5px", display: "flex", marginBottom: "16px" }}>
          <div style={{ width: "50%", fontWeight: "bold" }}>Rebate</div>
          <div style={{ width: "50%", textAlign: "right" }}>₹ 1500</div>
        </div>
        <div style={{ padding: "5px", display: "flex", marginBottom: "16px" }}>
          <div style={{ width: "50%", fontWeight: "bold" }}>Libarary Cess</div>
          <div style={{ width: "50%", textAlign: "right" }}>₹ 1500</div>
        </div>
        <hr style={{ borderColor: "#e7e6e6", width: "90%", marginRight: "auto", marginLeft: "auto" }} />
        <div style={{ padding: "5px", display: "flex", marginBottom: "16px", alignItems: "center" }}>
          <div style={{ width: "50%", fontWeight: "bold" }}>Total Amount</div>
          <div style={{ width: "50%", textAlign: "right", fontWeight: "bold", fontSize: "18px" }}>₹ 6000</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BillSumary;
