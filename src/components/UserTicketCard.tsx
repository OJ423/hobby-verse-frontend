import { UserTicket } from "@/utils/customTypes";
import { dateConverter } from "@/utils/dateConverter";
import AddToCalendar from "./AddToCalendar";

interface UserTicketCardProps {
  userTicket: UserTicket
}

const UserTicketCard: React.FC<UserTicketCardProps> = ({userTicket}) => {
  return (
    <section className="w-full flex gap-4 items-start p-4 border-2 border-pink-100 rounded">
      <div className="flex flex-col gap-4">
        <p className="uppercase text-sm text-gray-500">Event Info</p>
        <p className="font-medium">{userTicket.event_name}</p>
        <p className="text-xs">{userTicket.event_description}</p>
        <p className="font-bold">{dateConverter(userTicket.event_date)}</p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="uppercase text-sm text-gray-500">Ticket Info</p>
        <div className="flex items-center gap-4 flex-wrap">
          <p className="font-medium">{userTicket.ticket_quantity}</p>
          <div className="flex flex-col">
            <p className="font-medium">{userTicket.ticket_name}</p>
            <p className="text-xs">{userTicket.ticket_description}</p>
          </div>
          <p className="font-bold">{userTicket.ticket_cost}</p>
        </div>
      </div>
      <div className="w-full flex items-end">
        {/* <AddToCalendar event={userTicket} /> */}
      </div>
    </section>
  )
}

export default UserTicketCard