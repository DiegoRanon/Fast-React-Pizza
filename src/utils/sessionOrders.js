const SESSION_ORDERS_KEY = "fast-react-pizza:orders";

function safeParse(jsonString, fallback) {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function getSessionOrders() {
  if (typeof window === "undefined") return [];
  const raw = sessionStorage.getItem(SESSION_ORDERS_KEY);
  const parsed = raw ? safeParse(raw, []) : [];
  return Array.isArray(parsed) ? parsed : [];
}

function toSessionOrder(order) {
  return {
    id: order?.id,
    status: order?.status,
    priority: Boolean(order?.priority),
    orderPrice: order?.orderPrice,
    priorityPrice: order?.priorityPrice,
    estimatedDelivery: order?.estimatedDelivery,
    createdAt: order?.createdAt,
  };
}

export function addSessionOrder(order) {
  if (typeof window === "undefined") return;
  const next = toSessionOrder(order);
  if (!next?.id) return;

  const existing = getSessionOrders();
  const withoutDup = existing.filter((o) => o?.id !== next.id);
  // Most recent first
  const updated = [next, ...withoutDup];
  sessionStorage.setItem(SESSION_ORDERS_KEY, JSON.stringify(updated));
}

export function clearSessionOrders() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_ORDERS_KEY);
}


