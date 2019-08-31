import React from "react";
import styled from "styled-components";
import Notification from "./Notification";

const Notifications = props => {
  const { className, notifications, dismissNotification } = props;

  return (
    <div className={className}>
      {notifications
        .map(n => (
          <Notification
            key={n.id}
            dismiss={dismissNotification}
            notification={n}
          />
        ))
        .toList()
        .reverse()}
    </div>
  );
};

export default styled(Notifications)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`;
