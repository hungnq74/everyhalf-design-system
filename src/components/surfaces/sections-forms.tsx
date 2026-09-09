"use client";

import { useState } from "react";

import { Group, Spec, SpecGrid } from "../workbench/shell";
import { CheckRow, CodeCells, Field, SearchField, Switch, TextInput } from "../ui";

function LiveSwitch() {
  const [on, setOn] = useState(true);
  return <Switch checked={on} label="Nhận thông báo" onChange={setOn} />;
}

function LiveChecks() {
  const [checked, setChecked] = useState(["oat"]);
  const options = [
    ["oat", "Sữa yến mạch"],
    ["less", "Ít đá"],
    ["shot", "Thêm 1 shot"],
  ];

  return (
    <div style={{ width: "100%" }}>
      {options.map(([id, label]) => (
        <CheckRow
          key={id}
          checked={checked.includes(id)}
          onChange={(next) =>
            setChecked((current) =>
              next ? [...current, id] : current.filter((item) => item !== id)
            )
          }
        >
          {label}
        </CheckRow>
      ))}
    </div>
  );
}

function LiveRadios() {
  const [value, setValue] = useState("cold");
  const options = [
    ["cold", "Lạnh / Cold"],
    ["hot", "Nóng / Hot"],
  ];

  return (
    <div style={{ width: "100%" }} role="radiogroup">
      {options.map(([id, label]) => (
        <CheckRow key={id} kind="radio" checked={value === id} onChange={() => setValue(id)}>
          {label}
        </CheckRow>
      ))}
    </div>
  );
}

function LiveSearch() {
  const [value, setValue] = useState("");
  return <SearchField placeholder="Tìm món, cửa hàng…" value={value} onChange={setValue} />;
}

export function FormsSection() {
  return (
    <>
      <Group
        title="Text entry"
        hint="TextInput · SearchField · Field"
        note="The note field is a textarea because baristas get freeform requests a single line would truncate."
      >
        <SpecGrid>
          <Spec label="Text input" source="TextInput" stretch>
            <TextInput placeholder="Tên người nhận" />
          </Spec>
          <Spec
            label="Invalid"
            source="TextInput invalid"
            note="aria-invalid travels with the red border — not colour-only."
            stretch
          >
            <TextInput placeholder="Số điện thoại" value="09" invalid />
          </Spec>
          <Spec label="Search" source="SearchField" stretch>
            <LiveSearch />
          </Spec>
          <Spec label="Note field" source="Field" wide stretch>
            <Field
              label="Ghi chú cho quán"
              optional="(Không bắt buộc)"
              placeholder="Vui lòng ghi chú tại đây nếu bạn có yêu cầu đặc biệt"
            />
          </Spec>
          <Spec label="Note field — error" source="Field error" wide stretch>
            <Field
              label="Ghi chú cho quán"
              placeholder="Vui lòng ghi chú tại đây"
              error="Ghi chú tối đa 200 ký tự."
            />
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Selection"
        hint="Switch · CheckRow"
        note="The box is 22px, well under the touch minimum, so the whole row is the target."
      >
        <SpecGrid>
          <Spec label="Switch" source="Switch" note="Applies immediately; no save button follows it.">
            <LiveSwitch />
          </Spec>
          <Spec label="Checkbox rows" source="CheckRow" note="Multi-select modifiers." stretch>
            <LiveChecks />
          </Spec>
          <Spec label="Radio rows" source="CheckRow kind=radio" note="One of a required set." stretch>
            <LiveRadios />
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Code entry"
        hint="CodeCells"
        note="Monospace and oversized: this gets read aloud across a busy counter."
      >
        <SpecGrid>
          <Spec label="Partially filled" source="CodeCells" wide>
            <CodeCells value="EHH8" length={6} />
          </Spec>
        </SpecGrid>
      </Group>
    </>
  );
}
