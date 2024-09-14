import { Basket, Event, EventTickets } from "@/utils/customTypes";
import { useEffect, useState } from "react";
import { useAuth } from "./UserContext";

interface BasketProps {
  ticket: EventTickets;
  event: Event;
}

const BasketChange: React.FC<BasketProps> = ({ ticket, event }) => {
  const { basket, setBasket } = useAuth();
  const [ticketQty, setTicketQty] = useState<number>(0);

  useEffect(() => {
    if (basket) {
      basket.order_items.forEach((item) => {
        if (+item.event_ticket_id === +ticket.id) {
          setTicketQty(item.ticket_quantity);
        }
      });
    }
  }, []);

  const addToOrder = async () => {
    let basketUpdate: Basket | null = null;
    if (ticketQty === ticket.quantity) return;

    if (!basket) {
      // Create a new basket if one doesn't exist
      basketUpdate = {
        order: {
          total_amount: ticket.price,
          payment_status: "pending",
        },
        order_items: [
          {
            event_name: event.name,
            event_date: event.date,
            ticket_quantity: 1,
            event_ticket_id: +ticket.id,
            ticket_name: ticket.name,
            ticket_description: ticket.description,
            ticket_price: ticket.price,
            heads_per_ticket: ticket.ticket_head_count,
          },
        ],
      };
    } else {
      // If a basket exists, check if the ticket already exists in the order_items
      const existingItemIndex = basket.order_items.findIndex(
        (item) => +item.event_ticket_id === +ticket.id
      );

      if (existingItemIndex >= 0) {
        // If the ticket already exists, update the quantity and total_amount
        const updatedOrderItems = [...basket.order_items];
        const existingItem = updatedOrderItems[existingItemIndex];

        // Increase the ticket quantity
        updatedOrderItems[existingItemIndex] = {
          ...existingItem,
          ticket_quantity: +existingItem.ticket_quantity + 1,
        };

        // Update the basket with new quantity and total amount
        basketUpdate = {
          ...basket,
          order: {
            ...basket.order,
            total_amount: +basket.order.total_amount + +ticket.price,
          },
          order_items: updatedOrderItems,
        };
      } else {
        // If the ticket doesn't exist, add it to the order_items array
        basketUpdate = {
          ...basket,
          order: {
            ...basket.order,
            total_amount: +basket.order.total_amount + +ticket.price,
          },
          order_items: [
            ...basket.order_items,
            {
              event_name: event.name,
              event_date: event.date,
              ticket_quantity: 1,
              event_ticket_id: +ticket.id,
              ticket_name: ticket.name,
              ticket_description: ticket.description,
              ticket_price: ticket.price,
              heads_per_ticket: ticket.ticket_head_count,
            },
          ],
        };
      }
    }

    // Update the ticket quantity and basket state
    setTicketQty((prevQty) => prevQty + 1);
    setBasket(basketUpdate);
    localStorage.setItem("basket", JSON.stringify(basketUpdate));
  };

  const removeFromOrder = () => {
    if (!basket) return;

    // Find the ticket in the order_items array
    const existingItemIndex = basket.order_items.findIndex(
      (item) => +item.event_ticket_id === +ticket.id
    );

    if (existingItemIndex >= 0) {
      const existingItem = basket.order_items[existingItemIndex];

      let basketUpdate: Basket | null;

      if (existingItem.ticket_quantity > 1) {
        // If the ticket quantity is more than 1, decrease the quantity
        const updatedOrderItems = [...basket.order_items];
        updatedOrderItems[existingItemIndex] = {
          ...existingItem,
          ticket_quantity: +existingItem.ticket_quantity - 1,
        };

        // Update the basket with decreased quantity and total amount
        basketUpdate = {
          ...basket,
          order: {
            ...basket.order,
            total_amount: +basket.order.total_amount - +ticket.price,
          },
          order_items: updatedOrderItems,
        };
      } else {
        // If the ticket quantity is 1, remove the item from the order_items array
        const updatedOrderItems = basket.order_items.filter(
          (item) => +item.event_ticket_id !== +ticket.id
        );

        // If no more items in the basket, set the basket to null
        if (updatedOrderItems.length === 0) {
          basketUpdate = null;
        } else {
          // Otherwise, update the basket without the removed item
          basketUpdate = {
            ...basket,
            order: {
              ...basket.order,
              total_amount: +basket.order.total_amount - +ticket.price,
            },
            order_items: updatedOrderItems,
          };
        }
      }

      // Set States
      setTicketQty((prevQty) => (prevQty > 0 ? prevQty - 1 : 0));
      setBasket(basketUpdate);
      localStorage.setItem("basket", JSON.stringify(basketUpdate));
    }
  };

  return (
    <>
      <div className="col-span-1 flex items-center justify-end gap-2">
        {ticket.quantity === 0 ? (
          <p className="font-bold text-red-500 uppercase">Sold Out</p>
        ) : (
          <>
            <p
              onClick={removeFromOrder}
              aria-label="Remove 1 ticket"
              className="p-2 bg-white border-2 border-gray-900 rounded transition-all duration-500 hover:border-pink-500 cursor-pointer"
            >
              -
            </p>
            <p className="p-2 bg-white border-2 border-gray-900 rounded w-10 text-center">
              {ticketQty}
            </p>
            <p
              onClick={addToOrder}
              aria-label="Add 1 ticket"
              className="p-2 bg-white border-2 border-gray-900 rounded transition-all duration-500 hover:border-pink-500 cursor-pointer"
            >
              +
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default BasketChange;
