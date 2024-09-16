import { UserTicket } from "@/utils/customTypes";

interface AddToCalendarProps {
  event: UserTicket;
}

const AddToCalendar: React.FC<AddToCalendarProps> = ({ event }) => {
  const handleAddToGoogleCalendar = () => {
    if (event) {
      const formattedEvent = {
        summary: event.event_name,
        description: (event.event_description),
        location: event.event_location,
        startDate: event.event_date,
        endDate: event.event_end_date,
        timeZone: "Europe/London",
      };
      const formattedStartDate = formattedEvent.startDate.replace(/-|:|\.\d\d\d/g, '');
      const formattedEndDate = formattedEvent.endDate.replace(/-|:|\.\d\d\d/g, '');


      const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        formattedEvent.summary
      )}&details=${encodeURIComponent(
        formattedEvent.description
      )}&location=${encodeURIComponent(formattedEvent.location || "")}&dates=${
        formattedStartDate
      }/${formattedEndDate}&ctz=${formattedEvent.timeZone}`;

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
