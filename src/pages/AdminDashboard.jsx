import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updatingBookingId, setUpdatingBookingId] = useState("");

  /* =========================================================
     ADMIN PROTECTION
     ========================================================= */

  useEffect(() => {
    const loggedIn = localStorage.getItem("ikorAdminLoggedIn");

    if (loggedIn !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  /* =========================================================
     LOAD BOOKINGS
     ========================================================= */

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("https://ikor-paradise.onrender.com/api/bookings");
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load bookings.");
      }

      setBookings(data.bookings || []);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to load bookings. Please check the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  /* =========================================================
     CLOSE MODAL WITH ESCAPE
     ========================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedBooking(null);
      }
    };

    if (selectedBooking) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedBooking]);

  /* =========================================================
     LOGOUT
     ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem("ikorAdminLoggedIn");
    navigate("/admin-login");
  };

  /* =========================================================
     STATUS UPDATE
     ========================================================= */

  const handleStatusChange = async (bookingId, newStatus) => {
    if (!bookingId || !newStatus) return;

    try {
      setUpdatingBookingId(bookingId);
      setError("");

      const response = await fetch(
        `https://ikor-paradise.onrender.com/api/bookings/${bookingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update booking status."
        );
      }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking.bookingId === bookingId
            ? {
                ...booking,
                status: newStatus,
              }
            : booking
        )
      );

      setSelectedBooking((previousBooking) =>
        previousBooking?.bookingId === bookingId
          ? {
              ...previousBooking,
              status: newStatus,
            }
          : previousBooking
      );
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Unable to update booking status."
      );
    } finally {
      setUpdatingBookingId("");
    }
  };

  /* =========================================================
     FILTER BOOKINGS
     ========================================================= */

  const filteredBookings = bookings.filter((booking) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      booking.bookingId?.toLowerCase().includes(searchText) ||
      booking.name?.toLowerCase().includes(searchText) ||
      booking.phone?.includes(searchText) ||
      booking.roomType?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* =========================================================
     DASHBOARD STATISTICS
     ========================================================= */

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const totalRevenue = bookings.reduce(
    (total, booking) =>
      total + Number(booking.totalAmount || 0),
    0
  );

  /* =========================================================
     DATE FORMAT
     ========================================================= */

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /* =========================================================
     STATUS COLORS
     ========================================================= */

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return {
          color: "#16733b",
          background: "#e7f7ed",
          borderColor: "#b9e4c8",
        };

      case "Cancelled":
        return {
          color: "#b42318",
          background: "#fdeceb",
          borderColor: "#f3c2bd",
        };

      case "Completed":
        return {
          color: "#245ea8",
          background: "#eaf2ff",
          borderColor: "#c6dcf7",
        };

      default:
        return {
          color: "#9a6700",
          background: "#fff5d6",
          borderColor: "#ead59b",
        };
    }
  };

  return (
    <div className="admin-dashboard">

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside className="admin-sidebar">

        <div className="admin-sidebar-brand">
          <div className="sidebar-logo">IK</div>

          <div>
            <h2>IKOR</h2>
            <span>PARADISE</span>
          </div>
        </div>

        <div className="sidebar-divider"></div>

        <nav className="admin-navigation">

          <button className="admin-nav-item active">
            <span>▦</span>
            Dashboard
          </button>

          <button
            className="admin-nav-item"
            onClick={() => {
              document
                .getElementById("bookings-section")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            <span>▤</span>
            Bookings
          </button>

          <button
            className="admin-nav-item"
            onClick={() => navigate("/")}
          >
            <span>⌂</span>
            Website
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="admin-user">
            <div className="admin-user-avatar">A</div>

            <div>
              <strong>Administrator</strong>
              <small>Hotel Management</small>
            </div>
          </div>

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* =====================================================
          MAIN AREA
          ===================================================== */}

      <main className="admin-main">

        {/* TOP BAR */}

        <header className="admin-topbar">

          <div>
            <p className="admin-overline">
              IKOR PARADISE • MANAGEMENT
            </p>

            <h1>Dashboard</h1>

            <p className="admin-welcome">
              Welcome back, Administrator. Here's today's overview.
            </p>
          </div>

          <div className="admin-top-actions">

            <button
              className="refresh-button"
              onClick={loadBookings}
              title="Refresh bookings"
            >
              ↻
            </button>

            <button
              className="view-site-button"
              onClick={() => navigate("/")}
            >
              View Website
              <span>↗</span>
            </button>

          </div>

        </header>

        {/* =====================================================
            STAT CARDS
            ===================================================== */}

        <section className="admin-stats">

          <div className="admin-stat-card">

            <div className="stat-icon gold">▤</div>

            <div>
              <span>Total Bookings</span>
              <strong>{totalBookings}</strong>
              <small>All booking requests</small>
            </div>

          </div>

          <div className="admin-stat-card">

            <div className="stat-icon orange">◷</div>

            <div>
              <span>Pending</span>
              <strong>{pendingBookings}</strong>
              <small>Awaiting confirmation</small>
            </div>

          </div>

          <div className="admin-stat-card">

            <div className="stat-icon green">✓</div>

            <div>
              <span>Confirmed</span>
              <strong>{confirmedBookings}</strong>
              <small>Confirmed reservations</small>
            </div>

          </div>

          <div className="admin-stat-card">

            <div className="stat-icon blue">₹</div>

            <div>
              <span>Booking Value</span>

              <strong>
                ₹{totalRevenue.toLocaleString("en-IN")}
              </strong>

              <small>Total booking amount</small>
            </div>

          </div>

        </section>

        {/* =====================================================
            QUICK INFORMATION
            ===================================================== */}

        <section className="admin-welcome-panel">

          <div>

            <span className="panel-label">
              HOTEL OPERATIONS
            </span>

            <h2>Reservation Management</h2>

            <p>
              Manage guest reservations and keep track of your
              hotel's booking activity from one place.
            </p>

          </div>

          <div className="panel-badge">
            <span className="live-dot"></span>
            System Online
          </div>

        </section>

        {/* =====================================================
            BOOKINGS
            ===================================================== */}

        <section
          className="admin-bookings-section"
          id="bookings-section"
        >

          <div className="section-heading">

            <div>

              <span className="panel-label">
                RESERVATIONS
              </span>

              <h2>Recent Bookings</h2>

            </div>

            <button
              className="refresh-text-button"
              onClick={loadBookings}
            >
              ↻ Refresh
            </button>

          </div>

          {/* FILTER BAR */}

          <div className="booking-toolbar">

            <div className="booking-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search booking, guest, phone or room..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="status-filter"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>

          </div>

          {/* ERROR */}

          {error && (
            <div className="admin-error">
              ⚠️ {error}
            </div>
          )}

          {/* LOADING */}

          {loading ? (

            <div className="admin-empty">

              <div className="loading-spinner"></div>

              <p>Loading bookings...</p>

            </div>

          ) : filteredBookings.length === 0 ? (

            <div className="admin-empty">

              <div className="empty-icon">▤</div>

              <h3>No bookings found</h3>

              <p>
                New reservations will appear here automatically.
              </p>

            </div>

          ) : (

            <div className="booking-table-wrapper">

              <table className="booking-table">

                <thead>

                  <tr>
                    <th>BOOKING</th>
                    <th>GUEST</th>
                    <th>ROOM</th>
                    <th>STAY</th>
                    <th>GUESTS</th>
                    <th>MEAL PLAN</th>
                    <th>AMOUNT</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredBookings.map((booking) => {

                    const currentStatus =
                      booking.status || "Pending";

                    const statusStyle =
                      getStatusStyle(currentStatus);

                    const isUpdating =
                      updatingBookingId ===
                      booking.bookingId;

                    return (

                      <tr
                        key={
                          booking._id ||
                          booking.bookingId
                        }
                      >

                        {/* BOOKING */}

                        <td>

                          <div className="booking-id">
                            {booking.bookingId}
                          </div>

                          <small>
                            {formatDate(booking.createdAt)}
                          </small>

                        </td>

                        {/* GUEST */}

                        <td>

                          <div className="guest-name">
                            {booking.name}
                          </div>

                          <small>
                            {booking.phone}
                          </small>

                        </td>

                        {/* ROOM */}

                        <td>

                          <strong className="room-name">
                            {booking.roomType}
                          </strong>

                          <small>
                            {booking.occupancy}
                          </small>

                        </td>

                        {/* STAY */}

                        <td>

                          <div className="stay-date">
                            {formatDate(
                              booking.checkIn
                            )}
                          </div>

                          <span className="stay-arrow">
                            ↓
                          </span>

                          <div className="stay-date">
                            {formatDate(
                              booking.checkOut
                            )}
                          </div>

                          <small>
                            {booking.nights} night
                            {Number(booking.nights) !== 1
                              ? "s"
                              : ""}
                          </small>

                        </td>

                        {/* GUESTS */}

                        <td>

                          <div className="guest-count">
                            {booking.adults} Adult
                            {Number(booking.adults) !== 1
                              ? "s"
                              : ""}
                          </div>

                          <small>
                            {booking.children} Child
                            {Number(booking.children) !== 1
                              ? "ren"
                              : ""}
                          </small>

                        </td>

                        {/* MEAL PLAN */}

                        <td>

                          <span className="meal-plan">
                            {booking.mealPlan}
                          </span>

                        </td>

                        {/* AMOUNT */}

                        <td>

                          <strong className="booking-amount">
                            ₹
                            {Number(
                              booking.totalAmount || 0
                            ).toLocaleString("en-IN")}
                          </strong>

                        </td>

                        {/* STATUS */}

                        <td>

                          <select
                            value={currentStatus}
                            disabled={isUpdating}
                            onChange={(e) =>
                              handleStatusChange(
                                booking.bookingId,
                                e.target.value
                              )
                            }
                            title="Change booking status"
                            style={{
                              minWidth: "125px",
                              padding: "7px 28px 7px 10px",
                              borderRadius: "999px",
                              border: `1px solid ${statusStyle.borderColor}`,
                              background:
                                statusStyle.background,
                              color: statusStyle.color,
                              fontSize: "11px",
                              fontWeight: "700",
                              cursor: isUpdating
                                ? "wait"
                                : "pointer",
                              outline: "none",
                              appearance: "auto",
                              opacity: isUpdating
                                ? 0.65
                                : 1,
                            }}
                          >

                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Confirmed">
                              Confirmed
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>

                            <option value="Completed">
                              Completed
                            </option>

                          </select>

                        </td>

                        {/* VIEW DETAILS */}

                        <td>

                          <button
                            className="view-details-button"
                            onClick={() =>
                              setSelectedBooking(
                                booking
                              )
                            }
                          >
                            View Details
                          </button>

                        </td>

                      </tr>

                    );
                  })}

                </tbody>

              </table>

            </div>

          )}

        </section>

        {/* =====================================================
            FOOTER
            ===================================================== */}

        <footer className="admin-dashboard-footer">

          <span>IKOR PARADISE</span>

          <span>
            Hotel • Banquet • Restaurant
          </span>

          <span>
            Admin Management Panel
          </span>

        </footer>

      </main>

      {/* =====================================================
          BOOKING DETAILS MODAL
          ===================================================== */}

      {selectedBooking && (

        <div
          className="booking-modal-overlay"
          onClick={() =>
            setSelectedBooking(null)
          }
        >

          <div
            className="booking-details-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="booking-modal-header">

              <div className="booking-modal-title">

                <span>
                  RESERVATION DETAILS
                </span>

                <h3>
                  Booking Information
                </h3>

              </div>

              <button
                className="booking-modal-close"
                onClick={() =>
                  setSelectedBooking(null)
                }
                aria-label="Close"
              >
                ×
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="booking-modal-body">

              {/* SUMMARY */}

              <div className="booking-modal-summary">

                <div className="booking-modal-id">

                  <span>
                    BOOKING ID
                  </span>

                  <strong>
                    {selectedBooking.bookingId ||
                      "-"}
                  </strong>

                </div>

                <div
                  className={`booking-modal-status ${String(
                    selectedBooking.status ||
                      "Pending"
                  ).toLowerCase()}`}
                >

                  <span className="status-dot"></span>

                  {selectedBooking.status ||
                    "Pending"}

                </div>

              </div>

              {/* DETAILS */}

              <div className="booking-details-grid">

                <div className="booking-detail-card">

                  <span>
                    GUEST NAME
                  </span>

                  <strong>
                    {selectedBooking.name || "-"}
                  </strong>

                </div>

                <div className="booking-detail-card">

                  <span>
                    PHONE
                  </span>

                  <strong>
                    {selectedBooking.phone || "-"}
                  </strong>

                </div>

                <div className="booking-detail-card">

                  <span>
                    EMAIL
                  </span>

                  <strong>
                    {selectedBooking.email || "-"}
                  </strong>

                </div>

                <div className="booking-detail-card">

                  <span>
                    ROOM
                  </span>

                  <strong>
                    {selectedBooking.roomType || "-"}
                  </strong>

                </div>

                <div className="booking-detail-card">

                  <span>
                    OCCUPANCY
                  </span>

                  <strong>
                    {selectedBooking.occupancy || "-"}
                  </strong>

                </div>

                <div className="booking-detail-card">

                  <span>
                    ADULTS
                  </span>

                  <strong>
                    {selectedBooking.adults ?? "-"}
                  </strong>

                </div>

                <div className="booking-detail-card">

                  <span>
                    CHILDREN
                  </span>

                  <strong>
                    {selectedBooking.children ?? 0}
                  </strong>

                </div>

                <div className="booking-detail-card">

                  <span>
                    MEAL PLAN
                  </span>

                  <strong>
                    {selectedBooking.mealPlan || "-"}
                  </strong>

                </div>

                <div className="booking-detail-card">

                  <span>
                    CHECK-IN
                  </span>

                  <strong>
                    {formatDate(
                      selectedBooking.checkIn
                    )}
                  </strong>

                </div>

                <div className="booking-detail-card">

                  <span>
                    CHECK-OUT
                  </span>

                  <strong>
                    {formatDate(
                      selectedBooking.checkOut
                    )}
                  </strong>

                </div>

                <div className="booking-detail-card">

                  <span>
                    NIGHTS
                  </span>

                  <strong>
                    {selectedBooking.nights || 0}
                  </strong>

                </div>

                <div className="booking-detail-card">

                  <span>
                    PRICE / NIGHT
                  </span>

                  <strong>
                    ₹
                    {Number(
                      selectedBooking.pricePerNight ||
                        0
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>

                <div className="booking-detail-card full-width">

                  <span>
                    BOOKING RECEIVED
                  </span>

                  <strong>
                    {formatDateTime(
                      selectedBooking.createdAt
                    )}
                  </strong>

                </div>

              </div>

              {/* SPECIAL REQUEST */}

              <div className="booking-special-request">

                <span>
                  SPECIAL REQUEST
                </span>

                <p>
                  {selectedBooking.specialRequest?.trim()
                    ? selectedBooking.specialRequest
                    : "No special request provided."}
                </p>

              </div>

              {/* TOTAL */}

              <div className="booking-total-card">

                <span>
                  TOTAL BOOKING VALUE
                </span>

                <strong>
                  ₹
                  {Number(
                    selectedBooking.totalAmount ||
                      0
                  ).toLocaleString("en-IN")}
                </strong>

              </div>

            </div>

            {/* FOOTER */}

            <div className="booking-modal-footer">

              <button
                onClick={() =>
                  setSelectedBooking(null)
                }
              >
                Close Details
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminDashboard;
