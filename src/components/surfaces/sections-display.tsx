"use client";


import { Group, Spec, SpecGrid } from "../workbench/shell";
import {
  Avatar,
  CampaignBanner,
  Card,
  CountBadge,
  MarkTile,
  OrderCard,
  StatGroup,
  StatusPill,
  StoreCard,
  Timeline,
  TimelineItem,
} from "../ui";
import { ORDER_STATES, STAMP_ACTIVITY } from "../specimen-data";

export function DisplaySection() {
  return (
    <>
      <Group
        title="Identity and counts"
        hint="Avatar · CountBadge · StatGroup"
        note="Kept as one group: points alone say nothing about whether a free coffee is close."
      >
        <SpecGrid>
          <Spec label="Avatar" source="Avatar">
            <Avatar initials="KH" />
            <Avatar initials="KH" ring />
          </Spec>
          <Spec label="Count badge" source="CountBadge">
            <CountBadge>27</CountBadge>
            <CountBadge>3</CountBadge>
          </Spec>
          <Spec label="Brand mark" source="MarkTile" note="The lockup itself, used where a benefit needs brand weight.">
            <MarkTile />
          </Spec>

          <Spec label="Stat group" source="StatGroup" wide stretch>
            <StatGroup
              stats={[
                { value: "6.728", label: "điểm đổi quà", tone: "brand" },
                { value: "19", label: "tem khả dụng", tone: "gold" },
                { value: "27", label: "voucher khả dụng", tone: "success" },
              ]}
            />
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="State"
        hint="StatusPill"
        note="A word first, a colour second. Two waiting states, two terminal."
      >
        <SpecGrid>
          <Spec label="Order states" source="StatusPill tone" wide>
            {ORDER_STATES.map((state) => (
              <StatusPill key={state.id} tone={state.tone}>
                {state.label}
              </StatusPill>
            ))}
          </Spec>
          <Spec label="Other states" source="StatusPill tone" wide>
            <StatusPill tone="success">Đang mở</StatusPill>
            <StatusPill tone="neutral">Đã đóng</StatusPill>
            <StatusPill tone="gold">Còn 34 ngày</StatusPill>
            <StatusPill tone="warning">Sắp hết hạn</StatusPill>
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="History"
        hint="OrderCard · Timeline"
        note="Each entry names the drink that earned it."
      >
        <SpecGrid>
          <Spec label="Order card" source="OrderCard" wide stretch>
            <OrderCard
              code="EH_152280_4166"
              item="Thức uống (Melon Matcha Latte) x1"
              date="08/09/2026"
              total="81.000đ"
              status="Hoàn thành"
              tone="success"
              store="EHB - Centec Tower"
            />
          </Spec>
          <Spec label="Order card — cancelled" source="OrderCard" wide stretch>
            <OrderCard
              code="EH_152280_4170"
              item="Thức uống (Creamy Cloud Matcha) x1"
              date="09/09/2026"
              total="0đ"
              status="Đã hủy"
              tone="danger"
              store="EHB - Hưng Gia"
            />
          </Spec>
          <Spec label="Stamp activity" source="Timeline · TimelineItem" wide stretch>
            <Timeline>
              {STAMP_ACTIVITY.map((entry, index) => (
                <TimelineItem
                  key={index}
                  amount={entry.amount}
                  title={entry.title}
                  sub={entry.sub}
                  meta={`${entry.date} · +1 tem vào bộ sưu tập`}
                />
              ))}
            </Timeline>
          </Spec>
          <Spec label="Order progress" source="TimelineItem state" wide stretch>
            <Timeline>
              <TimelineItem state="done" title="Đã nhận đơn" sub="15:06" />
              <TimelineItem state="earned" title="Pha chế" sub="Quán đang chuẩn bị đơn của bạn." />
              <TimelineItem state="pending" title="Chờ lấy đơn" sub="Chúng mình sẽ báo bạn." />
            </Timeline>
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Content surfaces"
        hint="Card · StoreCard · CampaignBanner"
        note="The banner is the one colour outside the palette — deliberately loud, so it is never mistaken for a control."
      >
        <SpecGrid>
          <Spec label="Store card" source="StoreCard" stretch>
            <StoreCard
              name="EHB - Nam Phúc"
              distance="290 m"
              open
              variant={0}
            />
          </Spec>
          <Spec label="Card" source="Card" stretch>
            <Card style={{ padding: 16 }}>
              <p style={{ margin: 0, font: "var(--eh-text-body)", letterSpacing: "normal" }}>
                The base surface: 16px radius, one soft shadow, no border.
              </p>
            </Card>
          </Spec>
          <Spec label="Campaign banner" source="CampaignBanner" wide stretch>
            <CampaignBanner title="newcrop 2026" note="Mùa vụ của sự trưởng thành" />
          </Spec>
        </SpecGrid>
      </Group>
    </>
  );
}
