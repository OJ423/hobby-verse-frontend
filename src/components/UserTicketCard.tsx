import { UserTicket } from "@/utils/customTypes";
import { dateConverter, dateToTimeConverter } from "@/utils/dateConverter";
import AddToCalendar from "./AddToCalendar";

interface UserTicketCardProps {
  userTicket: UserTicket
}

const UserTicketCard: React.FC<UserTicketCardProps> = ({userTicket}) => {
  return (
    <section className="flex flex-col gap-4 p-4 border-2 border-pink-200 rounded items-stretch justify-between">

    <section className="w-full flex gap-4 items-start">
      <div className="flex flex-col gap-4">
        <p className="uppercase text-sm text-gray-500">Event Info</p>
        <p className="font-medium">{userTicket.event_name}</p>
        <p className="text-xs">{userTicket.event_description}</p>
        <p className="text-xs">Location: {userTicket.event_location}</p>
        <p className="font-bold text-xs">{dateConverter(userTicket.event_date)} - {dateToTimeConverter(userTicket.event_end_date)}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="uppercase text-sm text-gray-500">Ticket Info</p>
        <div className="flex items-center gap-4 flex-wrap">
          <p className="font-medium">{userTicket.ticket_quantity} x</p>
          <div className="flex flex-col">
            <p className="font-medium">{userTicket.ticket_name}</p>
            <p className="text-xs">{userTicket.ticket_description}</p>
          </div>
          {userTicket.ticket_cost ?
            <p className="font-bold">£{userTicket.ticket_cost}</p>
            : null
          }
        </div>
      </div>
    </section>
      <div className="w-full flex justify-end">
        <AddToCalendar event={userTicket} />
      </div>
    </section>
  )
}

export default UserTicketCard