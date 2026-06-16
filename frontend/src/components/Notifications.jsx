import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/work-orders/notifications"
      );

      setNotifications(res.data);

    } catch (err) {
      console.log("Notification Error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="position-relative">

      {/* 🔔 Bell Button */}
      <button
        className="btn btn-light position-relative"
        onClick={() => setOpen(!open)}
      >
        🔔

        {/* Badge */}
        {notifications.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {notifications.length}
          </span>
        )}
      </button>

      {/* 📩 Dropdown */}
      {open && (
        <div
          className="card shadow position-absolute mt-2"
          style={{
            right: 0,
            width: "320px",
            maxHeight: "350px",
            overflowY: "auto",
            zIndex: 9999,
          }}
        >
          <div className="card-header bg-primary text-white">
            Notifications
          </div>

          <div className="card-body p-0">

            {notifications.length === 0 ? (
              <p className="p-3 mb-0 text-muted">
                No notifications
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="border-bottom p-2"
                >
                  <div className="fw-semibold">
                    {n.message}
                  </div>

                  <small className="text-muted">
                    {n.created_at}
                  </small>
                </div>
              ))
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default Notifications;