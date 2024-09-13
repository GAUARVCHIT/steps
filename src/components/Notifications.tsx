import React from "react"

const Notifications = ({ notifications }) => {
  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
        </div>
      ))}
    </div>
  )
}

export default Notifications
