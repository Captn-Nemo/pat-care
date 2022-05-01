import * as React from "react";
import { withStyles } from "@material-ui/core/styles";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { FormatListBulleted, ExitToApp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Row, Col } from "react-bootstrap";
import "./style.css";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    // width: 200,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const CustomMenu = ({
  roomData,
  patientData = null,
  onClickConcern,
  onCheckout,
  isRoomAvail,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant={isRoomAvail ? "success" : "info"}
        disableElevation
        size="lg"
        onClick={handleClick}
        className="btn-success m-2 p-2 menu-button"
      >
        {roomData.Name}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {patientData != null && (
          <>
            <Row className="mx-2">
              <Col>{patientData[0]}</Col>
            </Row>
            <Row className="mx-2">
              <Col>{patientData[1]}</Col>
            </Row>
            <Row className="mx-2">
              <Col>{patientData[2]}</Col>
            </Row>
            <Row className="mx-2 mb-2">
              <Col>{patientData[3]}</Col>
            </Row>
          </>
        )}

        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={() => {
            handleClose();
            onClickConcern();
          }}
          disableRipple
        >
          <FormatListBulleted />
          View Concerns
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            onCheckout();
          }}
          disableRipple
        >
          <ExitToApp />
          Checkout
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default CustomMenu;
