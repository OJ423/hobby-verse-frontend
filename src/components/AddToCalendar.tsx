import { Event, Order } from "@/utils/customTypes";

interface AddToCalendarProps {
  event: Order;
}

const AddToCalendar: React.FC<AddToCalendarProps> = ({ event }) => {
  const handleAddToGoogleCalendar = () => {
    if (event) {
      const formattedEvent = {
        summary: event.,
        description: (event.description = ""),
        location: event.location,
        startDate: event.date.replace(/-|:|\.\d\d\d/g, ""),
        timeZone: "Europe/London",
      };

      const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        formattedEvent.summary
      )}&details=${encodeURIComponent(
        formattedEvent.description
      )}&location=${encodeURIComponent(formattedEvent.location || "")}&dates=${
        formattedEvent.startDate
      }&ctz=${formattedEvent.timeZone}`;

      window.open(calendarUrl, "_blank");
    }
  };

  return (
    <button
      onClick={handleAddToGoogleCalendar}
      className="border-solid border-4 border-black py-3 px-6 inline-block rounded-xl proper font-semibold hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all duration-500 ease-out text-xs"
    >
      Add to Calendar
    </button>
  );
};

export default AddToCalendar;
