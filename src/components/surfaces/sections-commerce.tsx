"use client";

import { Group, Spec, SpecGrid } from "../workbench/shell";
import {
  Bill,
  CartBar,
  PaymentRow,
  Price,
  ProductGrid,
  ProductRow,
  ProductTile,
  StoreBar,
} from "../ui";
import { PRODUCTS, STORE, TIER_DISCOUNT } from "../specimen-data";

export function CommerceSection() {
  return (
    <>
      <Group
        title="Store"
        hint="StoreBar"
        note="Chosen before the menu, because price and stock depend on it. Stays visible throughout."
      >
        <SpecGrid>
          <Spec label="Store bar" source="StoreBar" wide stretch>
            <StoreBar name={STORE.name} address={STORE.address} />
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Menu"
        hint="ProductTile · ProductGrid · ProductRow"
        note="Grid for browsing, row for a named list. The add button sits where the thumb already is."
      >
        <SpecGrid>
          <Spec label="Product tile" source="ProductTile">
            <div style={{ width: 176 }}>
              <ProductTile product={PRODUCTS[0]} />
            </div>
          </Spec>
          <Spec label="Product grid" source="ProductGrid" stretch>
            <ProductGrid>
              {PRODUCTS.slice(0, 2).map((product) => (
                <ProductTile key={product.id} product={product} />
              ))}
            </ProductGrid>
          </Spec>
          <Spec label="Product row" source="ProductRow" wide stretch>
            <ProductRow product={PRODUCTS[1]} />
            <ProductRow product={PRODUCTS[3]} />
          </Spec>
          <Spec
            label="Price"
            source="Price"
            note="The pre-discount figure is kept, so a member sees what their tier is doing."
          >
            <Price value="81.000đ" was="90.000đ" />
          </Spec>
        </SpecGrid>
      </Group>

      <Group
        title="Cart and bill"
        hint="CartBar · Bill · PaymentRow"
        note="Every reduction is named. A total that changes without a cause loses people at checkout."
      >
        <SpecGrid>
          <Spec label="Cart bar" source="CartBar" wide stretch>
            <CartBar count={1} total="81.000đ" original="90.000đ" />
          </Spec>
          <Spec label="Cart bar — no discount" source="CartBar" wide stretch>
            <CartBar count={2} total="155.000đ" />
          </Spec>
          <Spec label="Bill" source="Bill" stretch>
            <Bill
              rows={[
                { label: "Tạm tính", value: "90.000đ" },
                { label: TIER_DISCOUNT.label, value: TIER_DISCOUNT.value, discount: true },
              ]}
              total="81.000đ"
              saving={TIER_DISCOUNT.saving}
            />
          </Spec>
          <Spec label="Bill — voucher stacked" source="Bill" stretch>
            <Bill
              rows={[
                { label: "Tạm tính", value: "90.000đ" },
                { label: TIER_DISCOUNT.label, value: "-9.000đ", discount: true },
                { label: "Voucher", value: "-20.000đ", discount: true },
              ]}
              total="61.000đ"
              saving="Tiết kiệm 29.000đ với khuyến mãi"
            />
          </Spec>
          <Spec label="Payment method" source="PaymentRow" wide stretch>
            <PaymentRow name="MoMo" note="Phương thức thanh toán" />
          </Spec>
        </SpecGrid>
      </Group>
    </>
  );
}
