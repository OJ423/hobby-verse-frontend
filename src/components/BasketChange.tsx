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
  const [customPrice, setCustomPrice] = useState<number>(0); // New state for custom price

  useEffect(() => {
    if (basket) {
      basket.order_items.forEach((item) => {
        if (+item.event_ticket_id === +ticket.id) {
          setTicketQty(item.ticket_quantity);
          if(ticket.price === null) {
            setCustomPrice(item.ticket_price)
          }
        }
      });
    }
  }, []);

  const updateBasketWithCustomPrice = (price: number) => {
    if (!basket) return;

    const updatedOrderItems = basket.order_items.map((item) => {
      if (+item.event_ticket_id === +ticket.id) {
        return { ...item, ticket_price: price };
      }
      return item;
    });

    const updatedTotalAmount = updatedOrderItems.reduce(
      (total, item) => total + item.ticket_price * item.ticket_quantity,
      0
    );

    const updatedBasket: Basket = {
      ...basket,
      order: {
        ...basket.order,
        total_amount: updatedTotalAmount,
      },
      order_items: updatedOrderItems,
    };

    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
  };

  const handleCustomPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setCustomPrice(value);
      updateBasketWithCustomPrice(value);
    } else {
      setCustomPrice(0);
    }
  };


  const addToOrder = async () => {
    let basketUpdate: Basket | null = null;

    if (ticketQty === ticket.quantity) return;

    // Determine the price (if null, use custom price entered by the user)
    const ticketPrice = ticket.price !== null ? ticket.price : customPrice;

    if (!basket) {
      // Create a new basket if one doesn't exist
      basketUpdate = {
        order: {
          total_amount: ticketPrice,
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
            ticket_price: ticketPrice,
            heads_per_ticket: ticket.ticket_head_count,
          },
        ],
      };
    } else {
      const existingItemIndex = basket.order_items.findIndex(
        (item) => +item.event_ticket_id === +ticket.id
      );

      if (existingItemIndex >= 0) {
        const updatedOrderItems = [...basket.order_items];
        const existingItem = updatedOrderItems[existingItemIndex];

        updatedOrderItems[existingItemIndex] = {
          ...existingItem,
          ticket_quantity: +existingItem.ticket_quantity + 1,
        };

        basketUpdate = {
          ...basket,
          order: {
            ...basket.order,
          

              total_amount: +basket.order.total_amount + ticketPrice,
        
          },
          order_items: updatedOrderItems,
        };
      } else {
        basketUpdate = {
          ...basket,
          order: {
            ...basket.order,
            total_amount: +basket.order.total_amount + ticketPrice,
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
              ticket_price: ticketPrice,
              heads_per_ticket: ticket.ticket_head_count,
            },
          ],
        };
      }
    }

    setTicketQty((prevQty) => prevQty + 1);
    setBasket(basketUpdate);
    localStorage.setItem("basket", JSON.stringify(basketUpdate));
  };

  const removeFromOrder = () => {
    if (!basket) return;

    const existingItemIndex = basket.order_items.findIndex(
      (item) => +item.event_ticket_id === +ticket.id
    );

    if (existingItemIndex >= 0) {
      const existingItem = basket.order_items[existingItemIndex];

      let basketUpdate: Basket | null;

      if (existingItem.ticket_quantity > 1) {
        const updatedOrderItems = [...basket.order_items];
        updatedOrderItems[existingItemIndex] = {
          ...existingItem,
          ticket_quantity: +existingItem.ticket_quantity - 1,
        };

        basketUpdate = {
          ...basket,
          order: {
            ...basket.order,
            total_amount: +basket.order.total_amount - +existingItem.ticket_price,
          },
          order_items: updatedOrderItems,
        };
      } else {
        const updatedOrderItems = basket.order_items.filter(
          (item) => +item.event_ticket_id !== +ticket.id
        );

        basketUpdate = updatedOrderItems.length === 0 ? null : {
          ...basket,
          order: {
            ...basket.order,
            total_amount: +basket.order.total_amount - +existingItem.ticket_price,
          },
          order_items: updatedOrderItems,
        };
      }

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
            {ticket.price === null ? !ticket.is_free ? (
              <input
                type="number"
                placeholder="Enter amount"
                value={customPrice !== null ? customPrice : ""}
                onChange={handleCustomPriceChange}
                className="border-2 border-pink-200 p-2 rounded w-20 text-center"
              />
            ) : ticket.price : ticket.price}
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
