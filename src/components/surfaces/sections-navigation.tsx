"use client";

import { useState } from "react";
import { Bell, ChevronRight, Gift } from "lucide-react";

import { Viewport } from "../workbench/viewport";
import { Group, Spec, SpecGrid } from "../workbench/shell";
import {
  Accordion,
  AppBar,
  BottomNav,
  Card,
  Divider,
  IconButton,
  Row,
  SectionHead,
  type NavTab,
} from "../ui";

function LiveNav() {
  const [tab, setTab] = useState<NavTab>("home");
  return <BottomNav active={tab} badge={27} onChange={setTab} />;
}

export function NavigationSection() {
  return (
    <>
      <Group
        title="Screen chrome"
        hint="AppBar · BottomNav"
        note="Three destinations. The badge sits on Phần thưởng because it is the only tab whose contents expire."
      >
        <SpecGrid>
          <Spec label="App bar" source="AppBar" wide stretch>
            <AppBar title="Chi tiết voucher" onBack={() => {}} />
          </Spec>
          <Spec
            label="App bar with action"
            source="AppBar action"
            wide
            stretch
          >
            <AppBar
              title="Phần thưởng"
              action={
                <IconButton label="Thông báo">
                  <Bell size={20} />
                </IconButton>
              }
            />
          </Spec>
          <Spec
            label="Bottom navigation — in context"
            source="BottomNav"
            note="A tab bar only means anything against a bottom edge."
            wide
          >
            <Viewport height={170} label="390pt viewport.">
              <div style={{ flex: 1 }} />
              <LiveNav />
            </Viewport>
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Lists and disclosure"
        hint="Row · SectionHead · Divider · Accordion"
        note="Type-led, with a hairline between. The subtitle turns purple when it carries earned value or an expiry."
      >
        <SpecGrid>
          <Spec label="Section head" source="SectionHead" wide stretch>
            <SectionHead
              icon={<Gift size={18} />}
              title="Đổi nhanh"
              action="Xem tất cả"
            />
          </Spec>

          <Spec label="Row" source="Row" wide stretch>
            <Card>
              <Row
                title="Voucher trị giá 200.000 VNĐ"
                sub="HSD: 25/11/2026"
                subTone="brand"
              />
              <Divider />
              <Row
                title="Lịch sử đơn hàng"
                sub="1 đơn hàng"
              />
              <Divider />
              <Row
                title="Cài đặt"
                sub="Chính sách, liên hệ"
              />
            </Card>
          </Spec>

          <Spec
            label="Row with a value instead of a chevron"
            source="Row trailing"
            wide
            stretch
          >
            <Card>
              <Row
                title="Về ứng dụng"
                trailing={
                  <span style={{ font: "var(--eh-text-caption)", color: "var(--eh-text-secondary)" }}>
                    Phiên bản 1.0.7
                  </span>
                }
              />
            </Card>
          </Spec>

          <Spec
            label="Accordion"
            source="Accordion"
            note="Terms live here, not on their own screen — they matter at redemption."
            wide
            stretch
          >
            <Accordion title="Điều khoản áp dụng" defaultOpen>
              Voucher giảm trực tiếp 200.000 VNĐ trên tổng hóa đơn. Không áp dụng đồng thời với
              các chương trình khuyến mãi khác. Không quy đổi thành tiền mặt.
            </Accordion>
          </Spec>

          <Spec label="Chevron" source="lucide ChevronRight" note="The only affordance for “this opens something”.">
            <ChevronRight size={20} style={{ color: "var(--eh-text-disabled)" }} />
          </Spec>
        </SpecGrid>
      </Group>
    </>
  );
}
