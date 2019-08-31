import React from "react";
import styled from "styled-components";

const Notification = props => {
  const { className, notification, dismiss } = props;

  return (
    <div onClick={() => dismiss(notification.id)} className={className}>
      {notification.message}
    </div>
  );
};

export default styled(Notification)`
  background-color: rgb(33, 33, 33);
  color: rgb(222, 222, 222);
  padding: 1em;
  cursor: pointer;
`;
