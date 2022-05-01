import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import windowSize from "react-window-size";

import NavLogo from "./NavLogo";
import NavContent from "./NavContent";
import OutsideClick from "./OutsideClick";
import Aux from "./../../../../hoc/_Aux";
import * as actionTypes from "./../../../../store/actions";
import navigation from "../../../../menu-items";

import navImage1 from "../../../../assets/images/nav-bg/navbar-img-1.jpg";
import navImage2 from "../../../../assets/images/nav-bg/navbar-img-2.jpg";
import navImage3 from "../../../../assets/images/nav-bg/navbar-img-3.jpg";
import navImage4 from "../../../../assets/images/nav-bg/navbar-img-4.jpg";
import navImage5 from "../../../../assets/images/nav-bg/navbar-img-5.jpg";

class Navigation extends Component {
  resize = () => {
    const contentWidth = document.getElementById("root").clientWidth;

    if (this.props.layout === "horizontal" && contentWidth < 992) {
      this.props.onChangeLayout("vertical");
    }
  };

  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  render() {
    let navClass = ["pcoded-navbar"];
    let role = this.props.currentRole;
    let isAdmin = localStorage.getItem("isAdmin");
    let links =
      isAdmin || role === "ADMIN"
        ? navigation.AdminLinks
        : navigation.UserLinks;
    if (
      this.props.preLayout !== null &&
      this.props.preLayout !== "" &&
      this.props.preLayout !== "layout-6" &&
      this.props.preLayout !== "layout-8"
    ) {
      navClass = [...navClass, this.props.preLayout];
    } else {
      navClass = [
        ...navClass,
        this.props.layoutType,
        this.props.navBackColor,
        this.props.navBrandColor,
        "drp-icon-" + this.props.navDropdownIcon,
        "menu-item-icon-" + this.props.navListIcon,
        this.props.navActiveListColor,
        this.props.navListTitleColor,
      ];

      if (this.props.layout === "horizontal") {
        navClass = [...navClass, "theme-horizontal"];
      }

      if (this.props.navBackImage) {
        navClass = [...navClass, this.props.navBackImage];
      }

      if (this.props.navIconColor) {
        navClass = [...navClass, "icon-colored"];
      }

      if (!this.props.navFixedLayout) {
        navClass = [...navClass, "menupos-static"];
      }

      if (this.props.navListTitleHide) {
        navClass = [...navClass, "caption-hide"];
      }
    }

    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      navClass = [...navClass, "mob-open"];
    } else if (this.props.collapseMenu) {
      navClass = [...navClass, "navbar-collapsed"];
    }

    if (this.props.preLayout === "layout-6") {
      document.body.classList.add("layout-6");
      document.body.style.backgroundImage = this.props.layout6Background;
      document.body.style.backgroundSize = this.props.layout6BackSize;
    }

    if (this.props.preLayout === "layout-8") {
      document.body.classList.add("layout-8");
    }

    if (this.props.layoutType === "dark") {
      document.body.classList.add("datta-dark");
    } else {
      document.body.classList.remove("datta-dark");
    }

    if (this.props.rtlLayout) {
      document.body.classList.add("datta-rtl");
    } else {
      document.body.classList.remove("datta-rtl");
    }

    if (this.props.boxLayout) {
      document.body.classList.add("container");
      document.body.classList.add("box-layout");
    } else {
      document.body.classList.remove("container");
      document.body.classList.remove("box-layout");
    }

    let backImage, navStyle;
    if (this.props.navBackImage) {
      switch (this.props.navBackImage) {
        case "navbar-image-1":
          backImage = navImage1;
          break;
        case "navbar-image-2":
          backImage = navImage2;
          break;
        case "navbar-image-3":
          backImage = navImage3;
          break;
        case "navbar-image-4":
          backImage = navImage4;
          break;
        case "navbar-image-5":
          backImage = navImage5;
          break;
        default:
          backImage = "";
      }
      navStyle = {
        backgroundImage: `url(${backImage})`,
      };
    }

    let navContent = (
      <div className="navbar-wrapper">
        <NavLogo
          collapseMenu={this.props.collapseMenu}
          windowWidth={this.props.windowWidth}
          onToggleNavigation={this.props.onToggleNavigation}
        />
        <NavContent navigation={links} />
      </div>
    );
    if (this.props.windowWidth < 992) {
      navContent = (
        <OutsideClick>
          <div className="navbar-wrapper">
            <NavLogo
              collapseMenu={this.props.collapseMenu}
              windowWidth={this.props.windowWidth}
              onToggleNavigation={this.props.onToggleNavigation}
            />
            <NavContent navigation={links} />
          </div>
        </OutsideClick>
      );
    }

    return (
      <Aux>
        <nav className={navClass.join(" ")} style={navStyle}>
          {navContent}
        </nav>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layout: state.layout,
    preLayout: state.preLayout,
    collapseMenu: state.collapseMenu,
    layoutType: state.layoutType,
    navBackColor: state.navBackColor,
    navBackImage: state.navBackImage,
    navIconColor: state.navIconColor,
    navBrandColor: state.navBrandColor,
    layout6Background: state.layout6Background,
    layout6BackSize: state.layout6BackSize,
    rtlLayout: state.rtlLayout,
    navFixedLayout: state.navFixedLayout,
    boxLayout: state.boxLayout,
    navDropdownIcon: state.navDropdownIcon,
    navListIcon: state.navListIcon,
    navActiveListColor: state.navActiveListColor,
    navListTitleColor: state.navListTitleColor,
    navListTitleHide: state.navListTitleHide,
    currentRole: state.currentRole,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleNavigation: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
    onChangeLayout: (layout) =>
      dispatch({ type: actionTypes.CHANGE_LAYOUT, layout: layout }),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(windowSize(Navigation))
);
