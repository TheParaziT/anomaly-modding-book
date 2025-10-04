---
title: Trader Profile
---

# Trader Profile

___

<Authors
  authors={["saloeater"]}
  size="medium"
  showTitle={true}
  showDescription={true}
/>

## 0. Overview

Let's explore abstract simplified trader profile `trade_bandit.ltx`:

```ini title="..\configs\items\trade\trade_bandit.ltx"
#include "presets\trade_discounts.ltx"
#include "presets\trade_presets.ltx"

[trader]
buy_condition = {=actor_goodwill_ge(bandit:400)} trade_generic_buy_everything, trade_generic_buy
sell_condition = {=actor_goodwill_ge(bandit:400)} trade_generic_sell_everything, trade_generic_sell
buy_supplies = {=actor_goodwill_ge(bandit:400)} supplies_2,  supplies_1
buy_item_condition_factor = 0.40
buy_item_exponent = 2.25
sell_item_exponent = 0.75

discounts = discount_trasher

[trade_generic_buy]
jgut = 0.1
toolkit_r5

[trade_generic_buy_everything]

[trade_generic_sell]
toolkit_r5

[trade_generic_sell_everything]
toolkit_r5 = 0.5

[supplies_1]
toolkit_r5 = 2, 0.1

[supplies_2]:supplies_1
toolkit_r5 = 3, 1
```

## 1. buy_condition

Defines list of items trader won't buy or price modifier of those he buys

Accept a [condlist](../../../../tutorials/configs/condlists.md) of [sections](../../structure-of-files.md) of items. Those items should follow one these rules:

1. `jgut = 0.1` means trader will buy `jgut` item for 10% of it's price. Related [script](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/scripts/utils_item.script#L983)
2. `toolkit_r5` means trader won't buy that item at all

To conclude, this:

```ini
buy_condition = {=actor_goodwill_ge(bandit:400)} trade_generic_buy_everything, trade_generic_buy
[trade_generic_buy]
jgut = 0.1
toolkit_r5

[trade_generic_buy_everything]
```

means trader will

1) if `goodwill >= 400` buy all items at 100%
2) if `goodwill < 400`
   3) buy `jgut` for 10% of its price
   4) won't buy `toolkit_r5` at all

## 2. sell_condition

Same as [1. buy_condition](#1-buy_condition) but for selling items to actor

## 3. buy_supplies

Defines what items trader have in stock

Accept a [section](../../structure-of-files.md) of items.
Those items follow simple rule:

```ini
[supplies_1]
toolkit_r5 = 2, 0.1

[supplies_2]:supplies_1
toolkit_r5 = 3, 1
```

Trader have `10%` chance to add `2` `toolkit_r5` to his stock.
If count > 1 then chance is calculated for each item separately

:::note[Author note]
It's important to distinct `sell_condition` from `buy_supplies`:

- `sell_condition` - define at what condition which items trader will sell to actor

- `buy_supplies` - define what items trader have in stock

So you can combine these options to create complex trader profiles.
:::

## 4. buy_item_condition_factor

Trader will buy items that have condition greater or equal to `buy_item_condition_factor`

## 5. buy_item_exponent, sell_item_exponent

Defines how steeply the item's price drops with condition loss
Anomaly uses this in its [formula](https://github.com/Tosox/STALKER-Anomaly-gamedata/blob/v1.5.2/gamedata/scripts/utils_item.script#L1011) to decide final price for an item:

`cost * discount * math.pow((cond * 0.9 + 0.1), exponent > 0 and exponent or 0.75`

Basically, the higher value, the lower the final price for items with condition < 1

## 6. discounts

Defines buy/sell discounts for trader

Accepts section with specific properties:

```ini
[discount_barman_special]
buy                                      = 0.2
sell                                     = 0.7
```

This means trader will buy items for 20% of their price and sell for 70% of their price
Common discounts are defined in `presets\trade_discounts.ltx`
