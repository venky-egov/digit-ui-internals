import React from "react";
const Breadcrumb = (props) =>{

    function isLast(index) {
      return index === props.crumbs.length - 1;
    }
  
    return (
      <ol className="bread-crumb">
      {
        props.crumbs.map((crumb, ci) => {
          const disabled = isLast(ci) ? 'last' : '';
          
          return (
            <li
              key={ ci }
              className="bread-crumb--item "
            >
              <button className={ ` ${ disabled }` } onClick={ () => window.location.pathname=crumb.path }>
                { crumb.content }
              </button>
            </li>
          );
        })
      }
    </ol>
    );
  }
  Breadcrumb.propTypes = {
    crumbs: PropTypes.array
  };
  
  Breadcrumb.defaultProps = {
    successful: true,
  };
export default Breadcrumb;
