import { useEffect } from "react";

import Reservation from "../components/reservation/Reservation";

const ReservationsPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className="main-content page-content">
      <Reservation />
    </main>
  );
};

export default ReservationsPage;