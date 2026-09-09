# Every Half Mobile Design System

## Product point of view

This is a mobile-first loyalty and pickup system for a specialty coffee roaster, not a compressed ecommerce website. The experience should make three things immediate: **what I can enjoy now**, **how close I am to my next reward**, and **how quickly I can collect my coffee**.

The system combines Every Half's quiet, considered specialty-coffee character with the operational clarity that a loyalty app needs. It uses editorial moments sparingly: collection, origin, seasonal campaigns, tier status, and reward achievement. Ordering, payment, QR earning, vouchers, and order status remain deliberately plain and fast.

### System rules

1. One page has one primary action. The primary action is either Ink filled or, for navigational actions, Purple text - never both competing.
2. Purple means identity, navigation, links, selected states, and earned value. Ink means commitment: add to cart, pay, redeem, confirm.
3. A benefit must state its value and its constraint together: `Free coffee - valid to 25 Nov`, not a generic "Offer".
4. Never hide the active store, cart total, voucher effect, or order state. These are continuity data, not secondary UI.
5. Decorative loyalty graphics must never be the only way to explain progress. Always pair stamps with `9 / 10 stamps` and an explicit next reward.
6. Use cards to group decisions or information; avoid card-in-card layouts unless the inner unit is independently actionable.

## Foundation

`everyhalf-mobile-tokens.json` is the platform-neutral, source-of-truth token file. Map it to Figma variables, SwiftUI assets/styles, Android Compose theme values, or React Native tokens without renaming semantic roles.

### Color application

| Role | Token | Usage |
| --- | --- | --- |
| Commitment action | `color.surface.inverse` | Filled primary buttons, cart bar, confirm/redeem/payment actions |
| Brand/navigation | `brand.purple`, `color.text.brand` | Active tab, selected chip, price, non-destructive links, focus |
| Quiet canvas | `color.surface.canvas` | Page background; cards remain `surface.base` |
| Loyalty atmosphere | `color.surface.loyalty`, `status.gold` | Rewards hero, tier, achievement; never ordinary checkout |
| State | `color.status.*` | Status only - never use green/red/yellow to identify unrelated categories |

`brand.purpleSoft` and status soft colors are background-only; pair them with an Ink, Brand, or Status-dark foreground. Do not use Light Purple text on white.

### Layout and type

- Base spacing is 4 pt. Screen gutters are 16 pt (360-393 pt) and 20 pt (414-430 pt). Do not introduce one-off spacing values.
- Standard vertical section rhythm: 32 pt between major sections, 16 pt between related blocks, 8 pt inside a compact metadata group.
- Respect safe areas. A persistent bottom action sits above the home indicator; its content never underlaps the bottom nav.
- Default body copy is 16/22, medium weight. Use `title` for rows and cards, `headline` for page identity, and `display` only for rewards, points, and campaign numbers.
- Bricolage Grotesque carries product UI. Pitch Sans is an accent for a short origin label, campaign kicker, or coffee fact; it is not a body font and is not used in prices, errors, forms, or navigation.

### Interaction, motion, and accessibility

- All tappable controls have a 44 × 44 pt hit area. Icon-only controls require an accessible label and a visible pressed state.
- Use visible labels alongside non-universal icons. Never rely on color alone for status, selected state, or validation.
- Text must support Dynamic Type/font scaling; cards grow vertically rather than truncate critical benefit, price, or expiry information.
- All custom controls need default, pressed, focused, disabled, loading, and error/selected states when relevant. Use the `motion.standard` transition for feedback; respect Reduce Motion.
- Use haptics only for confirmations (add to cart, stamp earned, voucher redeemed, payment success) and pair them with visual feedback.
- Primary actions use verbs: `Add to cart`, `Choose store`, `Redeem reward`, `Pay 81,000₫`. A disabled action explains what is required directly above it.

## App shell

### `EHScreen`

**Slots:** safe-area header, scrollable body, optional sticky action, optional bottom navigation.

- `standard`: title plus back/close; 56 pt navigation bar beneath the system status area.
- `discovery`: no title bar until scroll; used only for Home/Rewards hero.
- `transaction`: back, concise task title, no bottom navigation during checkout.
- `fullscreen`: QR scanner, payment hand-off, maps; close action remains reachable.

### `EHBottomNav`

Three durable destinations: **Home**, **Pick up**, **Rewards**. Profile belongs in Home header/account, not a fourth tab. Each item has icon + text label; the active state uses Purple and a 2-4 pt indicator or color treatment. Badge count is limited to `99+` and is reserved for unclaimed rewards/important account tasks - never marketing notifications.

### `EHStickyActionBar`

Used for a cart summary, `Add to cart`, voucher redemption, and order confirmation.

- Height: content 56 pt; outer padding 16 pt plus safe-area inset.
- If there is a total, use a deliberate split (`Add to cart | 90,000₫`).
- Preserve cart quantity and total when navigating product detail ↔ menu.
- The action changes to a progress/loader state after tap and blocks duplicate submissions.

## Primitive component contracts

| Component | Variants | Required states | Implementation contract |
| --- | --- | --- | --- |
| `EHButton` | primary-ink, secondary-outline, tertiary-text, destructive, compact | default, pressed, disabled, loading | 52 pt standard height; label is always present; one primary per view |
| `EHIconButton` | ghost, outline, inverse | default, pressed, disabled | 44 pt hit target; `accessibilityLabel` required |
| `EHChip` | filter, choice, count, status | default, selected, disabled | Filter chips may multi-select; choice chips within one group must declare single/multi-select behavior |
| `EHSegmentedControl` | 2-4 options | default, selected, disabled | Use only for peer content views, never to represent a step in checkout |
| `EHTextField` | single-line, multiline note, search | rest, focused, filled, error, disabled | Label stays visible; helper/error text is reserved below the field; clear control has a label |
| `EHSelectRow` | disclosure, radio, payment | default, selected, disabled | Whole row is tappable; trailing value is not a separate target unless it triggers a distinct action |
| `EHQuantityStepper` | compact, inline | min, default, max, loading | Minus disabled at minimum; announces updated quantity |
| `EHDivider` | inset, full-bleed | n/a | 1 pt `border.subtle`; use structure, not decoration |
| `EHBadge` | neutral, purple, success, warning, error, gold | n/a | Includes an icon or text label; never communicates status by color alone |
| `EHInlineMessage` | info, success, warning, error | static, dismissible | State, reason, and next action are concise and visible |
| `EHToast` | success, error, undo | entering, visible, leaving | One action at most; not used for validation that needs persistent context |
| `EHBottomSheet` | action list, selector, confirmation, details | opening, open, drag, loading | Drag handle plus explicit close. Gesture never becomes the only dismissal method |
| `EHDialog` | destructive confirm, blocking error | default, loading | Reserve for consequential decisions; two actions max |
| `EHSkeleton` | product, card, list, hero | loading | Mirrors final hierarchy to avoid layout shift |
| `EHEmptyState` | wallet, orders, rewards, store, search | default | One warm illustration/icon, short reason, one recovery action |

## Domain components

### Commerce

| Component | Purpose and mandatory content | Variants |
| --- | --- | --- |
| `EHStoreSelector` | Current store, address/distance, open/closed state, prep time, change action | compact header, checkout card, full selector |
| `EHStoreCard` | Photo, name, location, distance, service availability, open state | map/list, selected, unavailable |
| `EHCategoryRail` | Horizontally scrollable filter chips with visible continuation affordance | standard, search active |
| `EHProductCard` | Image, product name, price, add button; add opens detail if configuration is required | grid, list, sold out, promotional |
| `EHProductDetail` | Hero image, name, price, quantity, modifier groups, note, sticky action | simple, configurable, unavailable |
| `EHModifierGroup` | Clear group title, `required`/`optional`, selection rule, validation error | single-select, multi-select, max-count |
| `EHCartSummary` | Item thumbnail/name/options, quantity, item price, edit/remove, subtotal | inline bar, checkout card |
| `EHPaymentMethodRow` | Brand mark, label, selected radio/check, change affordance | wallet, card, cash, unavailable |
| `EHPriceBreakdown` | subtotal, promotions, voucher, membership value, total, savings statement | checkout, receipt |
| `EHOrderStatus` | Order number, active state, selected store, promised/updated time, accessible time line | received, preparing, ready, completed, cancelled |

### Loyalty

| Component | Purpose and mandatory content | Variants |
| --- | --- | --- |
| `EHLoyaltyHero` | points balance, tier, scan/earn action, optional quiet ambient decoration | rewards landing, profile header |
| `EHStampBoard` | earned/total stamps, next reward, progress bar, explicit expiry, history/reward actions | home compact, rewards expanded, collecting-complete |
| `EHTierBadge` | tier name, icon, qualification/status; do not imply a tier without its rule | employee, member, future tiers |
| `EHQRPass` | dynamic QR/code, refresh status, last refresh, instructions for staff, brightness control | earn, pay, voucher redemption |
| `EHVoucherCard` | issuer/brand, reward title, expiry, eligibility summary, status, CTA/disclosure | wallet, picker, applied, expired, used |
| `EHVoucherTicket` | high-value voucher detail: title, code/QR/barcode, conditions, eligible stores, expiry, use-now action | ready, unavailable, redeemed |
| `EHRewardCard` | product/reward image, cost in points/stamps, availability and redeem CTA | quick redeem, catalogue, locked |
| `EHActivityTimeline` | date, event type, signed delta, source order, resulting benefit if relevant | earn, redeem, expiry, correction |
| `EHRewardProgress` | target, current balance, remaining amount, next meaningful action | points, stamps, campaign mission |

### Relationship and content

| Component | Purpose and mandatory content | Variants |
| --- | --- | --- |
| `EHMemberSummary` | avatar, name, tier, points, stamp/voucher count; each metric links to detail | home header, account |
| `EHActionCard` | Icon, title, one-line value, one destination | voucher, notification, location permission, profile task |
| `EHStoryCard` | Editorial image, campaign/coffee kicker, concise title, destination | standard, featured, horizontal |
| `EHOriginFact` | A calm editorial fact about variety, farm, process or roast | campaign, product education |
| `EHNotificationRow` | type icon, title, preview, time, unread state; no red dot without an accessible unread label | promotional, transactional, loyalty |

## Flow blueprint

### 1. Earn in store

`Home or Rewards → QR Pass → staff scans → Earning confirmation → updated points/stamps + reward progress`

The QR Pass must work on poor connectivity: show refresh time, a readable fallback code, and a clear retry state. If earning is pending, show `We’re confirming your stamp` rather than immediately changing the balance.

### 2. Pick up order

`Pick up → choose/confirm store → browse menu → product detail/modifiers → cart → voucher → payment → order tracking → ready-to-collect → receipt + earn summary`

Store choice happens before product configuration. At checkout, no price may move without a named line item. Auto-applying an eligible promotion is permitted, but show the applied benefit and allow the user to remove/change it.

### 3. Reward redemption

`Rewards → wallet or catalogue → reward/voucher detail → eligibility check → confirm redemption → QR/code / apply to cart → success receipt`

Distinguish **claiming** a reward from **using** it. Points/stamps are deducted only after the app explains the deduction and the resulting voucher state. Once a voucher is in the cart, show its applied amount, ineligible reason, and undo/change affordance.

### 4. Recovery paths (must be designed, not deferred)

- Out-of-stock configured item: retain choices, offer similar available items, never silently substitute.
- Store closes or changes availability: keep cart, explain the reason, offer another store.
- Payment uncertain: use a neutral `Checking payment` state and poll/retry safely; never invite a duplicate charge.
- Voucher ineligible: preserve selection, state the exact unmet condition, offer `Choose another voucher`.
- Order delayed: show the last known status/time, contact store/support action, and order reference.
- QR/scan failure: fallback code plus staff-readable identifier; retry must not create duplicate earn/redeem events.

## Data and implementation conventions

Each domain component should accept a display-ready view model plus a small, explicit state enum. Do not make UI infer business rules from a missing value.

```ts
type VoucherState = "available" | "applied" | "locked" | "expired" | "used";
type OrderState = "received" | "preparing" | "ready" | "completed" | "cancelled" | "payment_pending";
type ModifierSelection = { groupId: string; optionIds: string[]; isValid: boolean };

type VoucherVM = {
  id: string;
  state: VoucherState;
  title: string;
  expiryLabel: string;
  eligibilityLabel: string;
  valueLabel: string;
  ineligibleReason?: string;
  code?: string;
};
```

- Prices are stored as money/currency values and formatted locally; UI never parses display strings to calculate totals.
- Time-sensitive assets (QR, voucher, payment) expose `updatedAt`, `expiresAt`, and a server-confirmed status.
- Analytics tracks meaningful steps, not raw taps: store selected, item configured, cart viewed, voucher applied/rejected, payment started/resolved, order ready, reward claimed/used, QR earn resolved.
- Component names and prop names stay domain-neutral enough to support future delivery, subscription, and new membership tiers without cloning the component.

## What not to port from the web reference

Do not port the web system's dashboard blocks, dense tables, persistent desktop sidebar, menubar/context-menu patterns, chart library, or multi-pane workspace. Keep its **governance pattern** instead: one token source, named component variants, real component documentation, and a gallery of states.

## Build order

1. Tokens, typography, icons, app shell, navigation, button/input/selection/feedback primitives.
2. Store, menu, product, modifier, cart, checkout, payment, order status.
3. Points, stamp, QR, voucher, reward, activity timeline.
4. Editorial cards, notifications, profile/settings, edge states, localization and accessibility QA.

Every component should be documented with: anatomy, properties, state matrix, content limits, responsive behavior, accessibility behavior, analytics events, and a live example. This is the mobile equivalent of the referenced system's component-gallery approach.
