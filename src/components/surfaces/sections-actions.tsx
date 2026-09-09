"use client";

import { useState } from "react";
import { Bell, Plus, Share2, Trash2 } from "lucide-react";

import { Spec, SpecGrid } from "../workbench/shell";
import { Group } from "../workbench/shell";
import {
  ActionBar,
  Button,
  Chip,
  ChipRow,
  FilterChip,
  FilterRail,
  IconButton,
  SegmentedControl,
  Spinner,
  Stepper,
} from "../ui";

function LiveStepper() {
  const [value, setValue] = useState(1);
  return <Stepper value={value} onChange={setValue} />;
}

function LiveSegmented() {
  const [value, setValue] = useState("Tất cả");
  return (
    <SegmentedControl
      options={["Tất cả", "Cà phê", "Bánh"]}
      value={value}
      onChange={setValue}
    />
  );
}

/** Submitting an empty required group is reachable, not merely described. */
function LiveRequiredGroup() {
  const options = ["Có Đường", "Giảm ngọt", "Thêm ngọt", "Không đá", "Full Shot"];
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const invalid = submitted && !selected;

  return (
    <div style={{ width: "100%", display: "grid", gap: 12 }}>
      <ChipRow>
        {options.map((option) => (
          <Chip
            key={option}
            state={selected === option ? "selected" : invalid ? "error" : "default"}
            onClick={() => {
              setSelected(option);
              setSubmitted(false);
            }}
          >
            {option}
          </Chip>
        ))}
      </ChipRow>
      {invalid ? (
        <span style={{ font: "var(--eh-text-caption)", color: "var(--eh-on-danger)", fontWeight: 600 }}>
          Vui lòng chọn ít nhất một tùy chọn.
        </span>
      ) : null}
      <ActionBar onClick={() => setSubmitted(true)}>Thêm vào giỏ hàng</ActionBar>
    </div>
  );
}

function LiveFilters() {
  const [active, setActive] = useState("Tất cả");
  const filters: [string, number | undefined][] = [
    ["Tất cả", 27],
    ["Bundle", undefined],
    ["Đổi tem", undefined],
    ["Đổi điểm", undefined],
    ["Khuyến mãi", 3],
  ];
  return (
    <FilterRail>
      {filters.map(([label, count]) => (
        <FilterChip
          key={label}
          count={count}
          selected={active === label}
          onClick={() => setActive(label)}
        >
          {label}
        </FilterChip>
      ))}
    </FilterRail>
  );
}

export function ActionsSection() {
  return (
    <>
      <Group
        title="Buttons"
        hint="Button · variant"
        note="Filled black means the tap costs money, a stamp or a redemption. Tertiary is the only purple variant, because it never commits."
      >
        <SpecGrid>
          <Spec label="Primary" source="Button variant=primary" note="A commitment. One per screen.">
            <Button>Đặt hàng</Button>
          </Spec>
          <Spec label="Secondary" source="Button variant=secondary" note="Reversible, and never alone.">
            <Button variant="secondary">Đổi cửa hàng</Button>
          </Spec>
          <Spec label="Tertiary" source="Button variant=tertiary" note="Navigation and disclosure.">
            <Button variant="tertiary">Xem tất cả</Button>
          </Spec>
          <Spec label="Destructive" source="Button variant=danger" note="Always behind a confirm.">
            <Button variant="danger" icon={<Trash2 size={15} />}>
              Huỷ đơn
            </Button>
          </Spec>
          <Spec label="Loading" source="Button loading" note="Same width as its resting state, so nothing jumps.">
            <Button loading>Đang xử lý</Button>
          </Spec>
          <Spec label="Disabled" source="Button disabled">
            <Button disabled>Chọn món để tiếp tục</Button>
          </Spec>
          <Spec label="Small" source="Button small" note="For rows and cards, still 36px tall.">
            <Button small>Áp dụng</Button>
            <Button small variant="secondary">
              Gỡ
            </Button>
          </Spec>
          <Spec
            label="Icon button"
            source="IconButton"
            note="44pt target for a 20px glyph; the label lives in aria-label."
          >
            <IconButton label="Thông báo">
              <Bell size={20} />
            </IconButton>
            <IconButton label="Chia sẻ">
              <Share2 size={20} />
            </IconButton>
            <IconButton label="Thêm">
              <Plus size={20} />
            </IconButton>
          </Spec>
          <Spec label="Spinner" source="Spinner" note="Borrows the current text colour.">
            <Spinner />
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Commit bar"
        hint="ActionBar"
        note="Carries the amount next to the verb, so the price is never a screen away from the button that charges it."
      >
        <SpecGrid>
          <Spec label="With amount" source="ActionBar amount" wide stretch>
            <ActionBar amount="90.000đ">Thêm vào giỏ hàng</ActionBar>
          </Spec>
          <Spec label="Quiet" source="ActionBar quiet" note="Same footprint, no commitment." stretch>
            <ActionBar quiet>Không áp dụng voucher</ActionBar>
          </Spec>
          <Spec label="Disabled" source="ActionBar disabled" stretch>
            <ActionBar disabled amount="0đ">
              Chọn món để tiếp tục
            </ActionBar>
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Quantity and choice"
        hint="Stepper · Chip · SegmentedControl"
        note="Try submitting the required group empty — validation fires on submit, never on arrival."
      >
        <SpecGrid>
          <Spec label="Stepper" source="Stepper" note="Add is ink, remove is outlined.">
            <LiveStepper />
          </Spec>
          <Spec label="Segmented control" source="SegmentedControl" note="Two to four mutually exclusive views.">
            <LiveSegmented />
          </Spec>
          <Spec label="Chip states" source="Chip state" wide>
            <Chip>Mặc định</Chip>
            <Chip state="selected">Đã chọn</Chip>
            <Chip state="error">Bắt buộc</Chip>
            <Chip state="disabled">Hết hàng</Chip>
          </Spec>
          <Spec
            label="Required group — try submitting empty"
            source="Chip + ActionBar"
            note="A group that opens in red accuses the customer of a mistake they have not made."
            wide
            stretch
          >
            <LiveRequiredGroup />
          </Spec>
          <Spec label="Filter rail" source="FilterChip · FilterRail" wide stretch>
            <LiveFilters />
          </Spec>
        </SpecGrid>
      </Group>
    </>
  );
}
