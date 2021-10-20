import React from "react";
import { Drawer } from "antd";
import { isMobile } from "react-device-detect";
import './styles.css';

const WrapperDrawer = ({ 
  visible = false, 
  title = '',
  className = '',
  width = isMobile ? '100%' : '70%',
  toggleDrawer,
  children, 
  ...props 
}) => {
  return (
    <Drawer   
      visible={visible}
      title={title}
      width={width}
      className={`wrapper-drawer ${className}`}
      bodyStyle={{}}
      headerStyle={{}}
      onClose={toggleDrawer}
      {...props}
    >
      {children}
    </Drawer>
  )
};

export default WrapperDrawer;