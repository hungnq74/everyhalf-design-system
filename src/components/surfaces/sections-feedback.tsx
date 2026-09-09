"use client";

import { Coffee, Inbox, Ticket } from "lucide-react";

import { Viewport } from "../workbench/viewport";
import { Group, Spec, SpecGrid } from "../workbench/shell";
import {
  ActionBar,
  Chip,
  ChipRow,
  ConfirmDialog,
  EmptyState,
  InlineAlert,
  Progress,
  ProgressRing,
  Sheet,
  Skeleton,
  Toast,
} from "../ui";

export function FeedbackSection() {
  return (
    <>
      <Group
        title="Messages"
        hint="InlineAlert · Toast"
        note="A rule and a mono status label, not a coloured pill — so the body text stays ink and fully readable. Naming the status is a better non-colour signal than an icon: a word needs no interpreting."
      >
        <SpecGrid>
          <Spec label="Info" source="InlineAlert tone=info" wide stretch>
            <InlineAlert>Đơn của bạn sẽ sẵn sàng sau khoảng 5 phút.</InlineAlert>
          </Spec>
          <Spec label="Success" source="InlineAlert tone=success" wide stretch>
            <InlineAlert tone="success" title="Đã áp dụng voucher">
              Bạn tiết kiệm 20.000đ cho đơn này.
            </InlineAlert>
          </Spec>
          <Spec
            label="Warning"
            source="InlineAlert tone=warning"
            note="Expiry is a warning, not an error — nothing has gone wrong yet."
            wide
            stretch
          >
            <InlineAlert tone="warning" title="Sắp hết hạn">
              Bộ sưu tập tem của bạn hết hạn sau 34 ngày.
            </InlineAlert>
          </Spec>
          <Spec
            label="Danger"
            source="InlineAlert tone=danger"
            note="role=alert, so it is announced on appearance."
            wide
            stretch
          >
            <InlineAlert tone="danger" title="Không quét được mã">
              Nhờ nhân viên nhập mã dự phòng bên dưới.
            </InlineAlert>
          </Spec>
          <Spec label="Toast" source="Toast" wide stretch>
            <Toast action="Hoàn tác">Đã thêm 1 món vào giỏ hàng</Toast>
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Waiting"
        hint="Skeleton · Progress · ProgressRing"
        note="Shaped like the content they replace. Shimmer and spinner respect prefers-reduced-motion."
      >
        <SpecGrid>
          <Spec label="Skeleton — a product row" source="Skeleton" wide stretch>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Skeleton width={64} height={64} radius={12} />
              <span style={{ display: "grid", gap: 8, flex: 1 }}>
                <Skeleton width="70%" height={14} />
                <Skeleton width="30%" height={14} />
              </span>
            </div>
          </Spec>
          <Spec label="Progress bar" source="Progress" note="Stamps toward a free cup." stretch>
            <Progress value={9} max={10} />
          </Spec>
          <Spec
            label="Progress ring"
            source="ProgressRing"
            note="Points read better as a ring: the number matters more than the distance."
          >
            <ProgressRing value={6728} max={10000} />
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Empty states"
        hint="EmptyState"
        note="Each one names the next move."
      >
        <SpecGrid>
          <Spec label="No vouchers" source="EmptyState" stretch>
            <EmptyState
              icon={<Ticket size={26} />}
              title="Chưa có voucher"
              action="Khám phá ưu đãi"
            >
              Tích tem hoặc đổi điểm để nhận voucher đầu tiên của bạn.
            </EmptyState>
          </Spec>
          <Spec label="No orders" source="EmptyState" stretch>
            <EmptyState icon={<Coffee size={26} />} title="Chưa có đơn nào" action="Đặt món">
              Đơn hàng đã đặt sẽ xuất hiện ở đây.
            </EmptyState>
          </Spec>
          <Spec label="No notifications" source="EmptyState" stretch>
            <EmptyState icon={<Inbox size={26} />} title="Không có thông báo">
              Chúng mình sẽ báo khi có ưu đãi mới dành riêng cho bạn.
            </EmptyState>
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Layers"
        hint="Sheet · ConfirmDialog"
        note="Sheets ask for something extra. Dialogs are reserved for destructive confirmation."
      >
        <SpecGrid>
          <Spec label="Bottom sheet" source="Sheet" note="Keeps a grabber: no visible way out traps people." wide>
            <Viewport height={340}>
              <div style={{ flex: 1 }} />
              <Sheet title="Chọn cách nhận hàng">
                <ChipRow>
                  <Chip state="selected">Đến lấy</Chip>
                  <Chip>Giao hàng</Chip>
                </ChipRow>
                <div style={{ marginTop: 16 }}>
                  <ActionBar>Xác nhận</ActionBar>
                </div>
              </Sheet>
            </Viewport>
          </Spec>
          <Spec label="Destructive confirm" source="ConfirmDialog" wide>
            <Viewport height={340}>
              <ConfirmDialog title="Huỷ đơn hàng?" confirm="Huỷ đơn">
                Đơn EH_152280_4166 sẽ bị huỷ. Tiền được hoàn trong 24 giờ.
              </ConfirmDialog>
            </Viewport>
          </Spec>
        </SpecGrid>
      </Group>
    </>
  );
}
