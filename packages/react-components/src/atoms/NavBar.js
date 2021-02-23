import React, { useRef } from "react";

const MenuItem = ({ item }) => {
  let itemComponent;
  if (item.type === "component") {
    itemComponent = item.action;
  } else {
    itemComponent = item.text;
  }
  return (
    <span className="menu-item" {...item.populators}>
      {item?.icon && item.icon}
      <div className="menu-label">{itemComponent}</div>
    </span>
  );
};

const NavBar = ({ open, profileItem, menuItems, onClose }) => {
  const node = useRef();
  Digit.Hooks.useClickOutside(node, open ? onClose : null);
  const isDesktop = window.innerWidth >= 780;

  return (
    <React.Fragment>
      <div>
        <div
          ref={node}
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "56px",
            height: "calc(100vh - 56px)",
            position: "fixed",
            top: 0,
            left: 0,
            transition: "transform 0.3s ease-in-out",
            background: "#fff",
            zIndex: "1999",
            width: isDesktop ? "300px" : "100%",
            transform: `${open ? "translateX(0)" : "translateX(-450px)"}`,
          }}
        >
          {profileItem}
          <div className="drawer-list">
            {menuItems.map((item, index) => (
              <div
                key={index}
                // style={{
                //   marginLeft: 0,
                //   padding: 0,
                //   position: "relative",
                //   display: "flex",
                //   alignItems: "center",
                //   justifyContent: "flex-start"
                // }}
              >
                {item.type === "external-link" ? (
                  <a href={item.link}>
                    <MenuItem item={item} />
                  </a>
                ) : (
                  <MenuItem item={item} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
