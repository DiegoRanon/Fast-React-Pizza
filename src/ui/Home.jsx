import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
import { useEffect, useState } from "react";
import { clearSessionOrders, getSessionOrders } from "../utils/sessionOrders";
import LinkButton from "./LinkButton";
import { formatCurrency, formatDate } from "../utils/helpers";

function Home() {
  const username = useSelector((state) => state.user.username);
  const [sessionOrders, setSessionOrders] = useState([]);

  useEffect(function () {
    setSessionOrders(getSessionOrders());
  }, []);

  function handleClearSessionOrders() {
    clearSessionOrders();
    setSessionOrders([]);
  }

  return (
    <div className="my-10 sm:my-16  text-center px-4">
      <h1 className="text-xl font-semibold text-center mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-400">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <div className="space-y-8">
          <Button to="/menu" type="primary">
            Continue ordering, {username}
          </Button>

          {sessionOrders.length > 0 && (
            <div className="mx-auto max-w-xl rounded-lg border border-stone-200 bg-stone-50 p-4 text-left">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-stone-800">
                    Your recent orders (this session)
                  </p>
                </div>
                <Button type="secondary" onClick={handleClearSessionOrders}>
                  Clear
                </Button>
              </div>

              <ul className="mt-4 divide-y divide-stone-200">
                {sessionOrders.map((o) => {
                  const total =
                    (typeof o?.orderPrice === "number" ? o.orderPrice : 0) +
                    (typeof o?.priorityPrice === "number"
                      ? o.priorityPrice
                      : 0);

                  return (
                    <li key={o.id} className="py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-stone-800">
                            Order #{o.id}{" "}
                            <span className="text-stone-500">
                              ({o.status ?? "unknown"})
                            </span>
                          </p>
                          {(o.createdAt || o.estimatedDelivery) && (
                            <p className="text-sm text-stone-500">
                              {o.createdAt
                                ? `Placed: ${formatDate(o.createdAt)}`
                                : `ETA: ${formatDate(o.estimatedDelivery)}`}
                            </p>
                          )}
                          <p className="text-sm text-stone-600">
                            Total: {formatCurrency(total)}
                            {o.priority ? " (priority)" : ""}
                          </p>
                        </div>
                        <LinkButton to={`/order/${o.id}`}>View</LinkButton>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
