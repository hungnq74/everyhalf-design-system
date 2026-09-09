/**
 * Local mock data for the prototype. Vietnamese, because the product is.
 * Prices, store names, order codes and voucher terms follow the shipping app's
 * own conventions so the flows read as the real thing rather than as lorem.
 */

import type { Product } from "./ui";

export const PRODUCTS: Product[] = [
  {
    id: "matcha",
    name: "Thức uống (Creamy Cloud Matcha)",
    price: "90.000đ",
    art: 0,
  },
  {
    id: "robusta",
    name: "Thức uống (Creamy Cloud Fine Robusta Sữa Đá)",
    price: "65.000đ",
    art: 1,
  },
  {
    id: "caramelting",
    name: "Thức uống (Creamy Cloud Cara-Melting)",
    price: "80.000đ",
    art: 3,
  },
  {
    id: "bun",
    name: "Bánh Cream Cheese Garlic Bun",
    price: "55.000đ",
    art: 2,
  },
];

export const STORE = {
  name: "EHB - Hưng Gia",
  address: "Số 48 Đường nội khu Hưng Gia II, Khu phố Mỹ",
  ready: "~5 phút",
};

export const MEMBER = {
  name: "Khánh Huyền",
  tier: "Employee",
  points: "6.728",
  stamps: 9,
  stampTotal: 10,
  vouchers: 27,
};

/** The member tier discount the checkout applies — 10%, named rather than silent. */
export const TIER_DISCOUNT = {
  label: "Giảm giá hạng thành viên",
  value: "-9.000đ",
  saving: "Tiết kiệm 9.000đ với khuyến mãi",
};

export const MODIFIERS = {
  label: "Hot/Cold",
  required: "(Bắt buộc)",
  options: [
    "Có Đường",
    "Giảm ngọt",
    "Thêm ngọt",
    "Không ngọt",
    "Không đá",
    "Ít đá",
    "Full Shot",
    "Đá Riêng",
    "Nóng/Hot",
    "Lạnh/Cold",
  ],
  error: "Vui lòng chọn ít nhất một tùy chọn.",
};

export const VOUCHERS = [
  { id: "v1", title: "Voucher trị giá 200.000 VNĐ", expiry: "25/11/2026", code: "EHH8WHX2" },
  { id: "v2", title: "1 ly Latte", expiry: "25/11/2026", code: "EHL4TT01" },
  { id: "v3", title: "1 ly Bạc Xỉu", expiry: "25/11/2026", code: "EHBX2M09" },
  { id: "v4", title: "Tặng voucher giảm 30% các món đồ uống", expiry: "30/09/2026", code: "EH30PCT4" },
];

/**
 * The order state machine the app exposes. `pha-che` and `cho-lay-don` are the
 * only two states a customer waits in; the rest are terminal.
 */
export const ORDER_STATES = [
  { id: "pha-che", label: "Pha chế", tone: "neutral" as const, note: "Quán đang chuẩn bị đơn của bạn." },
  { id: "cho-lay-don", label: "Chờ lấy đơn", tone: "warning" as const, note: "Đơn đã sẵn sàng tại quầy." },
  { id: "hoan-thanh", label: "Hoàn thành", tone: "success" as const, note: "Đã nhận. Tem được cộng sau khi hoàn thành." },
  { id: "da-huy", label: "Đã hủy", tone: "danger" as const, note: "Đơn bị hủy. Hoàn tiền trong 24 giờ." },
];

export const STAMP_ACTIVITY = [
  { amount: "+1", title: "Stamps", sub: "1x Thức uống (Matcha Latte_Oat Milk)", date: "06/09/2026" },
  { amount: "+1", title: "Stamps", sub: "1x Cà Phê (Cara-Melting_Oat Milk)", date: "06/09/2026" },
  { amount: "+1", title: "Stamps", sub: "1x Cà Phê Sữa", date: "06/09/2026" },
];

export const EARN_CODE = "EHH8WHX2";
