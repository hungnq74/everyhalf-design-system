"use client";

import { useState } from "react";
import { CalendarDays, Info, MapPin } from "lucide-react";

import { Group, Spec, SpecGrid } from "../workbench/shell";
import {
  Barcode,
  BenefitRow,
  LoyaltyHeader,
  Progress,
  QrPass,
  RewardCard,
  StampBoard,
  StatusPill,
  TierBadge,
  VoucherTicket,
} from "../ui";
import { EARN_CODE } from "../specimen-data";

/** Refresh rotates the code deterministically, so a specimen never desyncs. */
function LiveQrPass() {
  const [rotation, setRotation] = useState(0);
  return (
    <QrPass
      code={passCodeFor(rotation)}
      countdown="04:59"
      onRefresh={() => setRotation((value) => value + 1)}
    />
  );
}

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function passCodeFor(rotation: number) {
  if (rotation === 0) return EARN_CODE;
  let state = (rotation * 2654435761) % 4294967296;
  const block = (length: number) =>
    Array.from({ length }, () => {
      state = (state * 1664525 + 1013904223) % 4294967296;
      return CODE_ALPHABET[state % CODE_ALPHABET.length];
    }).join("");
  return `EH${block(2)}${block(4)}`;
}

export function LoyaltySection() {
  return (
    <>
      <Group
        title="Stamps"
        hint="StampBoard · Progress"
        note="The final slot is a dashed coupon, not an eleventh stamp, so the goal is legible before it is reached."
      >
        <SpecGrid>
          <Spec label="On a light surface" source="StampBoard" wide stretch>
            <StampBoard earned={9} />
          </Spec>
          <Spec label="On a loyalty surface" source="StampBoard tone=gold wide" wide stretch>
            <div style={{ background: "var(--eh-loyalty-base)", padding: 20, borderRadius: 16 }}>
              <StampBoard earned={9} tone="gold" wide />
            </div>
          </Spec>
          <Spec label="Empty" source="StampBoard earned=0" note="The reward slot is visible from the first visit." stretch>
            <StampBoard earned={0} />
          </Spec>
          <Spec label="Progress" source="Progress" stretch>
            <Progress value={9} max={10} />
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Member identity"
        hint="TierBadge · LoyaltyHeader"
        note="Tier and points answer the only two questions a member opens this tab to ask."
      >
        <SpecGrid>
          <Spec label="Tier badge" source="TierBadge">
            <TierBadge>Employee</TierBadge>
          </Spec>
          <Spec label="Expiry pill" source="StatusPill tone=gold">
            <StatusPill tone="gold">Còn 77 ngày</StatusPill>
          </Spec>
          <Spec label="Points header" source="LoyaltyHeader" wide stretch>
            <LoyaltyHeader
              eyebrow="ĐIỂM ĐỔI QUÀ"
              headline="6.728"
              trailing={<TierBadge>Employee</TierBadge>}
            />
          </Spec>
          <Spec label="Greeting header" source="LoyaltyHeader warm" wide stretch>
            <LoyaltyHeader eyebrow="XIN CHÀO" headline="Khánh Huyền" warm trailing={<TierBadge>Employee</TierBadge>} />
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Vouchers"
        hint="VoucherTicket · BenefitRow · Barcode"
        note="Eligibility, expiry and scope travel with the voucher. Limits a screen away fail at the counter."
      >
        <SpecGrid>
          <Spec
            label="Voucher"
            source="VoucherTicket"
            note="The perforation signals a detachable benefit rather than a notification."
            stretch
          >
            <VoucherTicket
              title="Voucher trị giá 200.000 VNĐ"
              kind="Voucher khuyến mãi"
              remaining="Còn 77 ngày"
              code="EHH8WHX2"
            />
          </Spec>
          <Spec label="Benefit facts" source="BenefitRow" stretch>
            <div style={{ display: "grid", gap: 8 }}>
              <BenefitRow icon={<Info size={18} />} label="Điều kiện" value="Không yêu cầu đơn tối thiểu" />
              <BenefitRow icon={<CalendarDays size={18} />} label="Hạn sử dụng" value="25/11/2026" />
              <BenefitRow icon={<MapPin size={18} />} label="Áp dụng tại" value="Tất cả cửa hàng" />
            </div>
          </Spec>
          <Spec
            label="Barcode"
            source="Barcode"
            note="A specimen, not real symbology — derived from the code, so it never changes between renders."
            wide
            stretch
          >
            <Barcode value="EHH8WHX2" />
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Earning and redeeming"
        hint="QrPass · RewardCard"
        note="The fallback code gets equal billing with the QR. Counters are busy and scanners fail."
      >
        <SpecGrid>
          <Spec
            label="In-store pass"
            source="QrPass"
            note="Press refresh to rotate the code. The countdown is a prop — the app owns the clock."
          >
            <LiveQrPass />
          </Spec>
          <Spec label="Reward cards" source="RewardCard" wide>
            <RewardCard name="1 ly Americano" cost="1.800 pt" note="Tặng bạn 1 ly Americano" />
            <RewardCard name="1 ly Fine Robusta" cost="2.700 pt" note="Tặng bạn 1 ly Fine Robusta Cư M'gar" />
          </Spec>
        </SpecGrid>
      </Group>
    </>
  );
}
